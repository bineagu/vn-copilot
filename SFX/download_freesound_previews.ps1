$ErrorActionPreference = 'Continue'

. (Join-Path $PSScriptRoot 'freesound_common.ps1')

$promptsPath = Join-Path $PSScriptRoot 'PROMPTS.md'
$outDir = Join-Path $PSScriptRoot 'freesound_previews'
$manifestPath = Join-Path $outDir 'manifest.csv'

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$entries = Get-FreesoundPromptEntries $promptsPath
$results = @()

foreach ($entry in $entries) {
    $query = Get-FreesoundSearchQuery $entry.AssetId $entry.Title
    $searchUrl = 'https://freesound.org/search/?q=' + [uri]::EscapeDataString($query) + '&s=' + $Script:FreesoundSearchSort

    try {
        $searchHtml = (Invoke-WebRequest -UseBasicParsing $searchUrl -Headers $Script:FreesoundHeaders).Content
    } catch {
        $results += [pscustomobject]@{
            AssetId = $entry.AssetId
            Title = $entry.Title
            SuggestedLength = $entry.SuggestedLength
            SearchQuery = $query
            SearchSort = $Script:FreesoundSearchSort
            MatchTitle = ''
            SoundUrl = ''
            PreviewUrl = ''
            License = ''
            Downloads = 0
            MatchedDurationSeconds = 0.0
            ExpectedMinSeconds = $entry.ExpectedMinSeconds
            ExpectedMaxSeconds = $entry.ExpectedMaxSeconds
            TargetDurationSeconds = $entry.TargetDurationSeconds
            DurationPenaltySeconds = ''
            DurationInRange = $false
            DownloadedFile = ''
            Status = 'search_failed'
        }
        continue
    }

    $candidates = @(Get-FreesoundSearchCandidates $searchHtml 15)
    $selectedCandidate = Select-FreesoundBestCandidate $candidates $entry
    if ($null -eq $selectedCandidate) {
        $results += [pscustomobject]@{
            AssetId = $entry.AssetId
            Title = $entry.Title
            SuggestedLength = $entry.SuggestedLength
            SearchQuery = $query
            SearchSort = $Script:FreesoundSearchSort
            MatchTitle = ''
            SoundUrl = ''
            PreviewUrl = ''
            License = ''
            Downloads = 0
            MatchedDurationSeconds = 0.0
            ExpectedMinSeconds = $entry.ExpectedMinSeconds
            ExpectedMaxSeconds = $entry.ExpectedMaxSeconds
            TargetDurationSeconds = $entry.TargetDurationSeconds
            DurationPenaltySeconds = ''
            DurationInRange = $false
            DownloadedFile = ''
            Status = 'no_match'
        }
        continue
    }

    $pageInfo = $null
    try {
        $soundHtml = (Invoke-WebRequest -UseBasicParsing $selectedCandidate.SoundUrl -Headers $Script:FreesoundHeaders).Content
        $pageInfo = Get-FreesoundPageInfo $soundHtml
    } catch {
        $pageInfo = $null
    }

    $matchTitle = if ($pageInfo -and $pageInfo.MatchTitle) { $pageInfo.MatchTitle } else { $selectedCandidate.Title }
    $previewUrl = if ($pageInfo -and $pageInfo.PreviewUrl) { $pageInfo.PreviewUrl } else { $selectedCandidate.PreviewUrl }
    $license = if ($pageInfo) { $pageInfo.License } else { '' }
    $matchedDuration = if ($pageInfo -and $pageInfo.DurationSeconds -gt 0) { $pageInfo.DurationSeconds } else { $selectedCandidate.DurationSeconds }
    $downloads = if ($pageInfo -and $pageInfo.Downloads -gt 0) { $pageInfo.Downloads } else { $selectedCandidate.Downloads }
    $durationPenalty = Get-FreesoundDurationPenalty $matchedDuration $entry.ExpectedMinSeconds $entry.ExpectedMaxSeconds
    $durationInRange = ($durationPenalty -eq 0.0)

    if ([string]::IsNullOrWhiteSpace($previewUrl)) {
        $results += [pscustomobject]@{
            AssetId = $entry.AssetId
            Title = $entry.Title
            SuggestedLength = $entry.SuggestedLength
            SearchQuery = $query
            SearchSort = $Script:FreesoundSearchSort
            MatchTitle = $matchTitle
            SoundUrl = $selectedCandidate.SoundUrl
            PreviewUrl = ''
            License = $license
            Downloads = $downloads
            MatchedDurationSeconds = $matchedDuration
            ExpectedMinSeconds = $entry.ExpectedMinSeconds
            ExpectedMaxSeconds = $entry.ExpectedMaxSeconds
            TargetDurationSeconds = $entry.TargetDurationSeconds
            DurationPenaltySeconds = [Math]::Round($durationPenalty, 3)
            DurationInRange = $durationInRange
            DownloadedFile = ''
            Status = 'no_preview'
        }
        continue
    }

    Get-ChildItem -Path $outDir -Filter ($entry.AssetId + '.*') -File -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
    $extension = [System.IO.Path]::GetExtension($previewUrl)
    if ([string]::IsNullOrWhiteSpace($extension)) {
        $extension = '.mp3'
    }

    $outFile = Join-Path $outDir ($entry.AssetId + $extension)
    try {
        Invoke-WebRequest -UseBasicParsing $previewUrl -Headers $Script:FreesoundHeaders -OutFile $outFile
        $status = 'downloaded'
    } catch {
        $status = 'download_failed'
        $outFile = ''
    }

    $results += [pscustomobject]@{
        AssetId = $entry.AssetId
        Title = $entry.Title
        SuggestedLength = $entry.SuggestedLength
        SearchQuery = $query
        SearchSort = $Script:FreesoundSearchSort
        MatchTitle = $matchTitle
        SoundUrl = $selectedCandidate.SoundUrl
        PreviewUrl = $previewUrl
        License = $license
        Downloads = $downloads
        MatchedDurationSeconds = $matchedDuration
        ExpectedMinSeconds = $entry.ExpectedMinSeconds
        ExpectedMaxSeconds = $entry.ExpectedMaxSeconds
        TargetDurationSeconds = $entry.TargetDurationSeconds
        DurationPenaltySeconds = [Math]::Round($durationPenalty, 3)
        DurationInRange = $durationInRange
        DownloadedFile = $outFile
        Status = $status
    }
}

$results | Export-Csv -NoTypeInformation -Encoding UTF8 -Path $manifestPath

$downloaded = ($results | Where-Object Status -eq 'downloaded').Count
$inRange = ($results | Where-Object { $_.Status -eq 'downloaded' -and $_.DurationInRange -eq 'True' }).Count
$failed = ($results | Where-Object Status -ne 'downloaded').Count

Write-Output "Entries: $($results.Count)"
Write-Output "Downloaded: $downloaded"
Write-Output "InRange: $inRange"
Write-Output "NotDownloaded: $failed"
Write-Output "Manifest: $manifestPath"