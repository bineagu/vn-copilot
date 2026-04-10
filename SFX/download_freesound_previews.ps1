$ErrorActionPreference = 'Continue'

$root = Split-Path -Parent $PSScriptRoot
$promptsPath = Join-Path $PSScriptRoot 'PROMPTS.md'
$outDir = Join-Path $PSScriptRoot 'freesound_previews'
$manifestPath = Join-Path $outDir 'manifest.csv'

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$lines = Get-Content $promptsPath
$entries = @()
$currentTitle = $null

foreach ($line in $lines) {
    if ($line -match '^\*\*(\d+)\.\s+(.+?)\*\*$') {
        $currentTitle = $matches[2].Trim()
        continue
    }

    if ($line -match '^\*\s+\*\*Asset ID:\*\*\s+`(.+?)`') {
        $entries += [pscustomobject]@{
            AssetId = $matches[1].Trim()
            Title = $currentTitle
        }
        $currentTitle = $null
    }
}

$overrides = @{
    'sfx_school_bell_muffled' = 'school bell classroom'
    'sfx_footsteps_tile_echo' = 'footsteps hallway tile'
    'sfx_computer_mouse_keyboard' = 'mouse keyboard typing'
    'sfx_leaves_crunch_outside' = 'leaves crunch footstep'
    'sfx_chair_squeak' = 'desk chair squeak'
    'sfx_window_slide_open' = 'window slide open'
    'sfx_running_footsteps_fade' = 'running footsteps pavement'
    'sfx_sd_insert_device_chime' = 'device chime computer'
    'sfx_mouse_click_single' = 'mouse click'
    'sfx_phone_buzz_desk' = 'phone vibration desk'
    'sfx_classroom_murmur_lockers' = 'classroom ambience lockers'
    'sfx_chair_slide_floor' = 'chair scrape floor'
    'sfx_shoulder_smack' = 'slap cloth impact'
    'sfx_cloth_rustle_soft' = 'cloth rustle'
    'sfx_library_pages_pencil' = 'library ambience pages'
    'sfx_library_doors_creak' = 'library door creak'
    'sfx_footsteps_carpet_slow' = 'slow footsteps carpet'
    'sfx_paper_crumple' = 'paper crumple'
    'sfx_hallway_locker_footsteps_distant' = 'school hallway ambience'
    'sfx_soft_giggle' = 'female giggle'
    'sfx_teacup_drop_carpet' = 'cup drop carpet'
    'sfx_football_field_ambience' = 'football field ambience'
    'sfx_footsteps_gravel_heavy' = 'heavy footsteps gravel'
    'sfx_football_thwack_cannon' = 'football impact'
    'sfx_crunch_sickening' = 'impact crunch'
    'sfx_dialup_screech_static' = 'dial up static'
    'sfx_system_boot_chime' = 'system boot chime'
    'sfx_school_bell_cheerful' = 'school bell'
    'sfx_server_hum_low' = 'server hum'
    'sfx_seagull_loop' = 'seagull'
    'sfx_waves_loop' = 'ocean waves'
    'sfx_foot_thud_solid_surface' = 'hard footstep thud'
    'sfx_plastic_bottle_squeeze' = 'plastic bottle squeeze'
    'sfx_gym_shoes_squeak' = 'shoe squeak gym'
    'sfx_whistle_sharp' = 'coach whistle'
    'sfx_digital_tearing' = 'glitch tearing'
    'sfx_buzzing_static_rise' = 'buzzing static'
    'sfx_gym_doors_hiss' = 'door hiss'
    'sfx_digital_ping_sharp' = 'ui ping'
    'sfx_school_bell_glitch_cutoff' = 'school bell'
    'sfx_error_tone_high' = 'error tone'
    'sfx_hallway_thud_echo' = 'hallway thud'
    'sfx_rushing_wind_purge' = 'whoosh wind'
    'sfx_air_conditioner_hum_loud' = 'air conditioner hum'
    'sfx_heavy_single_footstep' = 'heavy footstep'
    'sfx_white_flash_screech' = 'digital screech'
    'sfx_phone_ringtone_harsh' = 'phone ringtone'
    'sfx_static_breathing_comm' = 'static breathing'
    'sfx_muffled_bang_upstairs' = 'muffled bang door slam'
    'sfx_dialup_phone_burst' = 'dial up modem'
    'sfx_three_slow_knocks' = 'door knocks'
    'sfx_wooden_door_click_shut' = 'wooden door close'
    'sfx_soft_buzzing_device' = 'device buzz'
    'sfx_hesitant_footsteps' = 'hesitant footsteps'
    'sfx_static_burst_silence' = 'static burst'
    'sfx_door_unlock_click' = 'door unlock click'
    'sfx_door_burst_run' = 'door burst footsteps'
    'sfx_server_rack_boom' = 'server rack crash'
    'sfx_digital_glass_shatter' = 'digital glass shatter'
    'sfx_footsteps_wooden_stairs_above' = 'footsteps wooden stairs'
    'sfx_dialup_whine_build' = 'dial up tone'
    'sfx_static_explosion' = 'static explosion'
    'sfx_police_breach_basement' = 'police breach'
}

function Normalize-Query([string]$title) {
    $query = $title.ToLowerInvariant()
    $query = [regex]::Replace($query, '\(.*?\)', ' ')
    $query = [regex]::Replace($query, '[^a-z0-9 ]', ' ')
    $query = [regex]::Replace($query, '\b(loop|stinger|cue|variant|ambient|foley|ui|digital|real|world|with|and)\b', ' ')
    $query = [regex]::Replace($query, '\s+', ' ').Trim()
    return $query
}

function Get-SearchQuery([string]$assetId, [string]$title) {
    if ($overrides.ContainsKey($assetId)) {
        return $overrides[$assetId]
    }

    return Normalize-Query $title
}

function Get-SoundPageUrl([string]$searchHtml) {
    $match = [regex]::Match($searchHtml, 'href="(/people/[^"<>\s]+/sounds/\d+/)"')
    if ($match.Success) {
        return 'https://freesound.org' + $match.Groups[1].Value
    }

    return $null
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

$headers = @{ 'User-Agent' = 'Mozilla/5.0' }
$results = @()

foreach ($entry in $entries) {
    $query = Get-SearchQuery $entry.AssetId $entry.Title
    $searchUrl = 'https://freesound.org/search/?q=' + [uri]::EscapeDataString($query)

    try {
        $searchHtml = (Invoke-WebRequest -UseBasicParsing $searchUrl -Headers $headers).Content
    } catch {
        $results += [pscustomobject]@{
            AssetId = $entry.AssetId
            Title = $entry.Title
            Query = $query
            MatchTitle = ''
            SoundUrl = ''
            PreviewUrl = ''
            License = ''
            DownloadedFile = ''
            Status = 'search_failed'
        }
        continue
    }

    $soundUrl = Get-SoundPageUrl $searchHtml
    if (-not $soundUrl) {
        $results += [pscustomobject]@{
            AssetId = $entry.AssetId
            Title = $entry.Title
            Query = $query
            MatchTitle = ''
            SoundUrl = ''
            PreviewUrl = ''
            License = ''
            DownloadedFile = ''
            Status = 'no_match'
        }
        continue
    }

    try {
        $soundHtml = (Invoke-WebRequest -UseBasicParsing $soundUrl -Headers $headers).Content
    } catch {
        $results += [pscustomobject]@{
            AssetId = $entry.AssetId
            Title = $entry.Title
            Query = $query
            MatchTitle = ''
            SoundUrl = $soundUrl
            PreviewUrl = ''
            License = ''
            DownloadedFile = ''
            Status = 'sound_page_failed'
        }
        continue
    }

    $pageInfo = Get-SoundPageInfo $soundHtml
    if ([string]::IsNullOrWhiteSpace($pageInfo.PreviewUrl)) {
        $results += [pscustomobject]@{
            AssetId = $entry.AssetId
            Title = $entry.Title
            Query = $query
            MatchTitle = $pageInfo.MatchTitle
            SoundUrl = $soundUrl
            PreviewUrl = ''
            License = $pageInfo.License
            DownloadedFile = ''
            Status = 'no_preview'
        }
        continue
    }

    $extension = [System.IO.Path]::GetExtension($pageInfo.PreviewUrl)
    if ([string]::IsNullOrWhiteSpace($extension)) {
        $extension = '.mp3'
    }

    $outFile = Join-Path $outDir ($entry.AssetId + $extension)
    try {
        Invoke-WebRequest -UseBasicParsing $pageInfo.PreviewUrl -Headers $headers -OutFile $outFile
        $status = 'downloaded'
    } catch {
        $status = 'download_failed'
        $outFile = ''
    }

    $results += [pscustomobject]@{
        AssetId = $entry.AssetId
        Title = $entry.Title
        Query = $query
        MatchTitle = $pageInfo.MatchTitle
        SoundUrl = $soundUrl
        PreviewUrl = $pageInfo.PreviewUrl
        License = $pageInfo.License
        DownloadedFile = $outFile
        Status = $status
    }
}

$results | Export-Csv -NoTypeInformation -Encoding UTF8 -Path $manifestPath

$downloaded = ($results | Where-Object Status -eq 'downloaded').Count
$failed = ($results | Where-Object Status -ne 'downloaded').Count

Write-Output "Entries: $($results.Count)"
Write-Output "Downloaded: $downloaded"
Write-Output "NotDownloaded: $failed"
Write-Output "Manifest: $manifestPath"