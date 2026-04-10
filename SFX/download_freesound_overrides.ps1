$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'freesound_common.ps1')

$outDir = Join-Path $PSScriptRoot 'freesound_previews'
$manifestPath = Join-Path $outDir 'manifest.csv'
$promptsPath = Join-Path $PSScriptRoot 'PROMPTS.md'

if (-not (Test-Path $manifestPath)) {
    throw "Manifest not found at $manifestPath"
}

$overrides = @{
    'sfx_classroom_murmur_lockers' = 'https://freesound.org/people/okieactor/sounds/417041/'
    'sfx_chair_slide_floor' = 'https://freesound.org/people/frederickls/sounds/441695/'
    'sfx_shoulder_smack' = 'https://freesound.org/people/nahmandub/sounds/131358/'
    'sfx_cloth_rustle_soft' = 'https://freesound.org/people/WasabiWielder/sounds/334219/'
    'sfx_library_pages_pencil' = 'https://freesound.org/people/InspectorJ/sounds/398271/'
    'sfx_teacup_drop_carpet' = 'https://freesound.org/people/andre.nascimento/sounds/50118/'
    'sfx_football_field_ambience' = 'https://freesound.org/people/Sandermotions/sounds/494362/'
    'sfx_footsteps_gravel_heavy' = 'https://freesound.org/people/bevangoldswain/sounds/54778/'
    'sfx_football_thwack_cannon' = 'https://freesound.org/people/dersuperanton/sounds/433722/'
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
$rows = Import-Csv $manifestPath
$promptEntries = Get-FreesoundPromptEntries $promptsPath
$promptLookup = @{}
foreach ($entry in $promptEntries) {
    $promptLookup[$entry.AssetId] = $entry
}

foreach ($row in $rows) {
    if (-not $overrides.ContainsKey($row.AssetId)) {
        continue
    }

    $currentPenalty = if ($row.DurationPenaltySeconds) { [double]$row.DurationPenaltySeconds } else { [double]::PositiveInfinity }
    $currentDownloaded = ($row.Status -eq 'downloaded')

    $soundUrl = $overrides[$row.AssetId]
    $soundHtml = (Invoke-WebRequest -UseBasicParsing $soundUrl -Headers $Script:FreesoundHeaders).Content
    $info = Get-FreesoundPageInfo $soundHtml

    if ([string]::IsNullOrWhiteSpace($info.PreviewUrl)) {
        continue
    }

    $entry = $promptLookup[$row.AssetId]
    $durationPenalty = Get-FreesoundDurationPenalty $info.DurationSeconds $entry.ExpectedMinSeconds $entry.ExpectedMaxSeconds
    if ($currentDownloaded -and $durationPenalty -gt $currentPenalty) {
        continue
    }

    $extension = [System.IO.Path]::GetExtension($info.PreviewUrl)
    if ([string]::IsNullOrWhiteSpace($extension)) {
        $extension = '.mp3'
    }

    Get-ChildItem -Path $outDir -Filter ($row.AssetId + '.*') -File -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
    $outFile = Join-Path $outDir ($row.AssetId + $extension)
    Invoke-WebRequest -UseBasicParsing $info.PreviewUrl -Headers $Script:FreesoundHeaders -OutFile $outFile

    $row.MatchTitle = $info.MatchTitle
    $row.SoundUrl = $soundUrl
    $row.PreviewUrl = $info.PreviewUrl
    $row.License = $info.License
    $row.Downloads = $info.Downloads
    $row.MatchedDurationSeconds = $info.DurationSeconds
    $row.ExpectedMinSeconds = $entry.ExpectedMinSeconds
    $row.ExpectedMaxSeconds = $entry.ExpectedMaxSeconds
    $row.TargetDurationSeconds = $entry.TargetDurationSeconds
    $row.DurationPenaltySeconds = [Math]::Round($durationPenalty, 3)
    $row.DurationInRange = ($durationPenalty -eq 0.0)
    $row.DownloadedFile = $outFile
    $row.Status = 'downloaded'
}

$rows | Export-Csv -NoTypeInformation -Encoding UTF8 -Path $manifestPath

$downloaded = ($rows | Where-Object Status -eq 'downloaded').Count
$inRange = ($rows | Where-Object { $_.Status -eq 'downloaded' -and $_.DurationInRange -eq 'True' }).Count
$failed = ($rows | Where-Object Status -ne 'downloaded').Count

Write-Output "Downloaded: $downloaded"
Write-Output "InRange: $inRange"
Write-Output "NotDownloaded: $failed"
Write-Output "Manifest: $manifestPath"