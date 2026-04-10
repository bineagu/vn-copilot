$Script:FreesoundHeaders = @{ 'User-Agent' = 'Mozilla/5.0' }
$Script:FreesoundSearchSort = 'Downloads+(most+first)'
$Script:FreesoundSearchOverrides = @{
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
    'sfx_teacup_drop_carpet' = 'teacup drop carpet'
    'sfx_football_field_ambience' = 'football field ambience'
    'sfx_footsteps_gravel_heavy' = 'heavy footsteps gravel'
    'sfx_football_thwack_cannon' = 'football impact'
    'sfx_crunch_sickening' = 'impact crunch'
    'sfx_dialup_screech_static' = 'dial up static'
    'sfx_system_boot_chime' = 'startup chime'
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
    'sfx_door_burst_run' = 'door slam footsteps'
    'sfx_server_rack_boom' = 'metal crash boom'
    'sfx_digital_glass_shatter' = 'glass shatter'
    'sfx_footsteps_wooden_stairs_above' = 'footsteps wooden stairs'
    'sfx_dialup_whine_build' = 'dial up tone'
    'sfx_static_explosion' = 'static explosion'
    'sfx_police_breach_basement' = 'police shout door'
}

function Normalize-FreesoundQuery([string]$title) {
    $query = $title.ToLowerInvariant()
    $query = [regex]::Replace($query, '\(.*?\)', ' ')
    $query = [regex]::Replace($query, '[^a-z0-9 ]', ' ')
    $query = [regex]::Replace($query, '\b(loop|stinger|cue|variant|ambient|foley|ui|digital|real|world|with|and)\b', ' ')
    $query = [regex]::Replace($query, '\s+', ' ').Trim()
    return $query
}

function Get-FreesoundSearchQuery([string]$assetId, [string]$title) {
    if ($Script:FreesoundSearchOverrides.ContainsKey($assetId)) {
        return $Script:FreesoundSearchOverrides[$assetId]
    }

    return Normalize-FreesoundQuery $title
}

function ConvertFrom-SuggestedLength([string]$suggestedLength) {
    $text = $suggestedLength.Trim().ToLowerInvariant()

    if ($text -match 'under\s+(\d+(?:\.\d+)?)\s*sec') {
        $max = [double]$matches[1]
        return [pscustomobject]@{
            Min = 0.0
            Max = $max
            Target = $max * 0.75
        }
    }

    if ($text -match '(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*sec') {
        $min = [double]$matches[1]
        $max = [double]$matches[2]
        return [pscustomobject]@{
            Min = $min
            Max = $max
            Target = ($min + $max) / 2.0
        }
    }

    if ($text -match '(\d+(?:\.\d+)?)\s*sec') {
        $target = [double]$matches[1]
        $tolerance = [Math]::Max(0.25, $target * 0.25)
        return [pscustomobject]@{
            Min = [Math]::Max(0.0, $target - $tolerance)
            Max = $target + $tolerance
            Target = $target
        }
    }

    return [pscustomobject]@{
        Min = 0.0
        Max = [double]::PositiveInfinity
        Target = 0.0
    }
}

function Get-FreesoundPromptEntries([string]$promptsPath) {
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
                SuggestedLength = ''
                ExpectedMinSeconds = 0.0
                ExpectedMaxSeconds = [double]::PositiveInfinity
                TargetDurationSeconds = 0.0
            }
            continue
        }

        if ($line -match '^\*\s+\*\*Suggested Length:\*\*\s+(.+)$' -and $entries.Count -gt 0) {
            $durationPreference = ConvertFrom-SuggestedLength $matches[1].Trim()
            $entries[-1].SuggestedLength = $matches[1].Trim()
            $entries[-1].ExpectedMinSeconds = $durationPreference.Min
            $entries[-1].ExpectedMaxSeconds = $durationPreference.Max
            $entries[-1].TargetDurationSeconds = $durationPreference.Target
        }
    }

    return $entries
}

function Get-FreesoundAttributeValue([string]$rawAttributes, [string]$attributeName) {
    $match = [regex]::Match($rawAttributes, [regex]::Escape($attributeName) + '="([^"]+)"')
    if ($match.Success) {
        return [System.Net.WebUtility]::HtmlDecode($match.Groups[1].Value)
    }

    return ''
}

function ConvertTo-FreesoundSoundUrl([string]$similarUrl) {
    $match = [regex]::Match($similarUrl, '^(?<path>/people/[^"<>\s]+/sounds/\d+)/similar/\?ajax=1$')
    if ($match.Success) {
        return 'https://freesound.org' + $match.Groups['path'].Value + '/'
    }

    return ''
}

function Get-FreesoundSearchCandidates([string]$searchHtml, [int]$maxCandidates = 15) {
    $playerMatches = [regex]::Matches(
        $searchHtml,
        '<div\s+class="bw-player"(?<attributes>.*?)></div>',
        [System.Text.RegularExpressions.RegexOptions]::Singleline
    )

    $candidates = @()
    foreach ($match in $playerMatches) {
        $attributes = $match.Groups['attributes'].Value
        $soundUrl = ConvertTo-FreesoundSoundUrl (Get-FreesoundAttributeValue $attributes 'data-similar-sounds-modal-url')
        if ([string]::IsNullOrWhiteSpace($soundUrl)) {
            continue
        }

        $durationValue = Get-FreesoundAttributeValue $attributes 'data-duration'
        $downloadsValue = Get-FreesoundAttributeValue $attributes 'data-num-downloads'
        $previewUrl = Get-FreesoundAttributeValue $attributes 'data-mp3'
        if ([string]::IsNullOrWhiteSpace($previewUrl)) {
            $previewUrl = Get-FreesoundAttributeValue $attributes 'data-ogg'
        }

        $candidates += [pscustomobject]@{
            Title = Get-FreesoundAttributeValue $attributes 'data-title'
            DurationSeconds = if ($durationValue) { [double]$durationValue } else { 0.0 }
            Downloads = if ($downloadsValue) { [int]$downloadsValue } else { 0 }
            PreviewUrl = $previewUrl
            SoundUrl = $soundUrl
        }
    }

    return $candidates | Select-Object -First $maxCandidates
}

function Get-FreesoundDurationPenalty([double]$durationSeconds, [double]$minSeconds, [double]$maxSeconds) {
    if ($durationSeconds -lt $minSeconds) {
        return $minSeconds - $durationSeconds
    }

    if ($durationSeconds -gt $maxSeconds) {
        return $durationSeconds - $maxSeconds
    }

    return 0.0
}

function Select-FreesoundBestCandidate([object[]]$candidates, [object]$entry) {
    if (-not $candidates -or $candidates.Count -eq 0) {
        return $null
    }

    $inRange = $candidates | Where-Object {
        $_.DurationSeconds -ge $entry.ExpectedMinSeconds -and $_.DurationSeconds -le $entry.ExpectedMaxSeconds
    }

    if ($inRange) {
        return $inRange |
            Sort-Object @(
                @{ Expression = 'Downloads'; Descending = $true },
                @{ Expression = { [Math]::Abs($_.DurationSeconds - $entry.TargetDurationSeconds) }; Descending = $false }
            ) |
            Select-Object -First 1
    }

    return $candidates |
        Sort-Object @(
            @{ Expression = { Get-FreesoundDurationPenalty $_.DurationSeconds $entry.ExpectedMinSeconds $entry.ExpectedMaxSeconds }; Descending = $false },
            @{ Expression = 'Downloads'; Descending = $true }
        ) |
        Select-Object -First 1
}

function Get-FreesoundPageInfo([string]$soundHtml) {
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

    $playerMatch = [regex]::Match(
        $soundHtml,
        '<div\s+class="bw-player"(?<attributes>.*?)></div>',
        [System.Text.RegularExpressions.RegexOptions]::Singleline
    )
    $durationSeconds = 0.0
    $downloads = 0
    if ($playerMatch.Success) {
        $attributes = $playerMatch.Groups['attributes'].Value
        $durationValue = Get-FreesoundAttributeValue $attributes 'data-duration'
        $downloadsValue = Get-FreesoundAttributeValue $attributes 'data-num-downloads'
        if ($durationValue) {
            $durationSeconds = [double]$durationValue
        }
        if ($downloadsValue) {
            $downloads = [int]$downloadsValue
        }
        if ([string]::IsNullOrWhiteSpace($previewUrl)) {
            $previewUrl = Get-FreesoundAttributeValue $attributes 'data-mp3'
        }
    }

    return [pscustomobject]@{
        MatchTitle = $title
        PreviewUrl = $previewUrl
        License = $license
        DurationSeconds = $durationSeconds
        Downloads = $downloads
    }
}