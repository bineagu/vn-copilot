$ErrorActionPreference = 'Stop'

$outDir = Join-Path $PSScriptRoot 'freesound_previews'
$manifestPath = Join-Path $outDir 'manifest.csv'
$headers = @{ 'User-Agent' = 'Mozilla/5.0' }

if (-not (Test-Path $manifestPath)) {
    throw "Manifest not found at $manifestPath"
}

$overrides = @{
    'sfx_classroom_murmur_lockers' = 'https://freesound.org/people/okieactor/sounds/417041/'
    'sfx_chair_slide_floor' = 'https://freesound.org/people/frederickls/sounds/441695/'
    'sfx_shoulder_smack' = 'https://freesound.org/people/nahmandub/sounds/131358/'
    'sfx_teacup_drop_carpet' = 'https://freesound.org/people/andre.nascimento/sounds/50118/'
    'sfx_system_boot_chime' = 'https://freesound.org/people/marlonnnnnn/sounds/351880/'
    'sfx_school_bell_cheerful' = 'https://freesound.org/people/BennettFilmTeacher/sounds/403459/'
    'sfx_server_hum_low' = 'https://freesound.org/people/DeVern/sounds/610761/'
    'sfx_seagull_loop' = 'https://freesound.org/people/Carlos_Vaquero/sounds/153730/'
    'sfx_waves_loop' = 'https://freesound.org/people/Koops/sounds/586117/'
    'sfx_foot_thud_solid_surface' = 'https://freesound.org/people/atleastrelatively/sounds/816413/'
    'sfx_door_burst_run' = 'https://freesound.org/people/bevibeldesign/sounds/349903/'
    'sfx_server_rack_boom' = 'https://freesound.org/people/SamsterBirdies/sounds/587443/'
    'sfx_digital_glass_shatter' = 'https://freesound.org/people/bevibeldesign/sounds/349905/'
    'sfx_footsteps_wooden_stairs_above' = 'https://freesound.org/people/Sclolex/sounds/210573/'
    'sfx_police_breach_basement' = 'https://freesound.org/people/MarcelWagner/sounds/693846/'
}

function Get-SoundPageInfo([string]$soundHtml) {
    $titleMatch = [regex]::Match($soundHtml, '<title>Freesound - (.*?) by ')
    $title = if ($titleMatch.Success) { [System.Net.WebUtility]::HtmlDecode($titleMatch.Groups[1].Value) } else { '' }

    $previewMatch = [regex]::Match($soundHtml, 'https://cdn\.freesound\.org/previews/[^"'' ]+\.(mp3|ogg)')
    $previewUrl = if ($previewMatch.Success) { $previewMatch.Value } else { '' }

    $license = ''
    foreach ($pattern in @('Creative Commons 0', 'Attribution 4.0', 'Attribution NonCommercial 4.0', 'Sampling\+')) {
        $licenseMatch = [regex]::Match($soundHtml, $pattern)
        if ($licenseMatch.Success) {
            $license = $licenseMatch.Value
            break
        }
    }

    return [pscustomobject]@{
        MatchTitle = $title
        PreviewUrl = $previewUrl
        License = $license
    }
}

$rows = Import-Csv $manifestPath

foreach ($row in $rows) {
    if (-not $overrides.ContainsKey($row.AssetId)) {
        continue
    }

    $soundUrl = $overrides[$row.AssetId]
    $soundHtml = (Invoke-WebRequest -UseBasicParsing $soundUrl -Headers $headers).Content
    $info = Get-SoundPageInfo $soundHtml

    if ([string]::IsNullOrWhiteSpace($info.PreviewUrl)) {
        continue
    }

    $extension = [System.IO.Path]::GetExtension($info.PreviewUrl)
    if ([string]::IsNullOrWhiteSpace($extension)) {
        $extension = '.mp3'
    }

    $outFile = Join-Path $outDir ($row.AssetId + $extension)
    Invoke-WebRequest -UseBasicParsing $info.PreviewUrl -Headers $headers -OutFile $outFile

    $row.MatchTitle = $info.MatchTitle
    $row.SoundUrl = $soundUrl
    $row.PreviewUrl = $info.PreviewUrl
    $row.License = $info.License
    $row.DownloadedFile = $outFile
    $row.Status = 'downloaded'
}

$rows | Export-Csv -NoTypeInformation -Encoding UTF8 -Path $manifestPath

$downloaded = ($rows | Where-Object Status -eq 'downloaded').Count
$failed = ($rows | Where-Object Status -ne 'downloaded').Count

Write-Output "Downloaded: $downloaded"
Write-Output "NotDownloaded: $failed"
Write-Output "Manifest: $manifestPath"