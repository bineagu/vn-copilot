import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const outputsDir = path.join(
    projectRoot,
    'src-tauri',
    'gen',
    'android',
    'app',
    'build',
    'outputs',
    'bundle',
)
const localConfigPath = path.join(projectRoot, '.android-upload.local.json')

const requiredConfigKeys = [
    'ANDROID_UPLOAD_KEYSTORE',
    'ANDROID_UPLOAD_KEY_ALIAS',
    'ANDROID_UPLOAD_STORE_PASSWORD',
]

function fail(message) {
    console.error(message)
    process.exit(1)
}

function getSpawnCommand(command, args) {
    if (command === 'npm' && process.env.npm_execpath) {
        return {
            command: process.execPath,
            args: [process.env.npm_execpath, ...args],
        }
    }

    if (process.platform === 'win32' && command === 'npm') {
        return {
            command: 'npm.cmd',
            args,
        }
    }

    return { command, args }
}

function hasJavaCompiler(javaHome) {
    if (!javaHome) {
        return false
    }

    const executable = process.platform === 'win32' ? 'javac.exe' : 'javac'
    return existsSync(path.join(javaHome, 'bin', executable))
}

function resolveBuildJavaHome() {
    if (hasJavaCompiler(process.env.JAVA_HOME)) {
        return process.env.JAVA_HOME
    }

    const androidStudioJbr =
        process.platform === 'win32'
            ? 'C:\\Program Files\\Android\\Android Studio\\jbr'
            : '/Applications/Android Studio.app/Contents/jbr/Contents/Home'

    if (hasJavaCompiler(androidStudioJbr)) {
        return androidStudioJbr
    }

    return process.env.JAVA_HOME
}

function loadLocalConfig() {
    if (!existsSync(localConfigPath)) {
        return {}
    }

    try {
        const rawConfig = readFileSync(localConfigPath, 'utf8').replace(/^\uFEFF/, '')
        return JSON.parse(rawConfig)
    } catch (error) {
        fail(`Failed to parse ${localConfigPath}: ${error.message}`)
    }
}

function run(command, args, options = {}) {
    const spawnTarget = getSpawnCommand(command, args)
    const result = spawnSync(spawnTarget.command, spawnTarget.args, {
        cwd: projectRoot,
        stdio: 'inherit',
        shell: false,
        ...options,
    })

    if (result.error) {
        fail(`Failed to run ${command}: ${result.error.message}`)
    }

    if (result.status !== 0) {
        fail(`${command} exited with code ${result.status ?? 'unknown'}`)
    }
}

function walk(dirPath) {
    return readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
        const fullPath = path.join(dirPath, entry.name)
        return entry.isDirectory() ? walk(fullPath) : [fullPath]
    })
}

function findLatestReleaseBundle() {
    if (!existsSync(outputsDir)) {
        fail(`Bundle output directory does not exist: ${outputsDir}`)
    }

    const candidates = walk(outputsDir)
        .filter((filePath) => filePath.toLowerCase().endsWith('.aab'))
        .filter((filePath) => filePath.toLowerCase().includes('release'))
        .map((filePath) => ({ filePath, mtimeMs: statSync(filePath).mtimeMs }))
        .sort((left, right) => right.mtimeMs - left.mtimeMs)

    if (candidates.length === 0) {
        fail(`No release AAB found under ${outputsDir}`)
    }

    return candidates[0].filePath
}

function getConfigValue(name, localConfig) {
    const value = process.env[name] || localConfig[name]
    if (!value) {
        fail(`Missing required signing setting: ${name}`)
    }
    return value
}

function resolveJarSigner() {
    const javaHome = process.env.JAVA_HOME
    if (javaHome) {
        const executable = process.platform === 'win32' ? 'jarsigner.exe' : 'jarsigner'
        const candidate = path.join(javaHome, 'bin', executable)
        if (existsSync(candidate)) {
            return candidate
        }
    }

    return 'jarsigner'
}

const shouldBuild = process.argv.includes('--build')
const localConfig = loadLocalConfig()
const signingConfig = {}

for (const configKey of requiredConfigKeys) {
    signingConfig[configKey] = getConfigValue(configKey, localConfig)
}

signingConfig.ANDROID_UPLOAD_KEY_PASSWORD =
    process.env.ANDROID_UPLOAD_KEY_PASSWORD ||
    localConfig.ANDROID_UPLOAD_KEY_PASSWORD ||
    signingConfig.ANDROID_UPLOAD_STORE_PASSWORD

const keystorePath = path.resolve(projectRoot, signingConfig.ANDROID_UPLOAD_KEYSTORE)
if (!existsSync(keystorePath)) {
    fail(`Keystore file not found: ${keystorePath}`)
}

if (shouldBuild) {
    run('npm', ['run', 'tauri:android:build'], {
        env: {
            ...process.env,
            JAVA_HOME: resolveBuildJavaHome(),
        },
    })
}

const bundlePath = findLatestReleaseBundle()
const jarSigner = resolveJarSigner()
const keyPassword = signingConfig.ANDROID_UPLOAD_KEY_PASSWORD

run(jarSigner, [
    '-verbose',
    '-sigalg',
    'SHA256withRSA',
    '-digestalg',
    'SHA-256',
    '-keystore',
    keystorePath,
    '-storepass',
    signingConfig.ANDROID_UPLOAD_STORE_PASSWORD,
    '-keypass',
    keyPassword,
    bundlePath,
    signingConfig.ANDROID_UPLOAD_KEY_ALIAS,
])

run(jarSigner, [
    '-verify',
    '-verbose',
    '-certs',
    bundlePath,
])

console.log(`Signed release bundle: ${bundlePath}`)