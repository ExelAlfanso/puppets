param(
    [string]$OutputPath
)

$ErrorActionPreference = 'Stop'
$workspaceRoot = Split-Path -Parent $PSScriptRoot
if (-not $OutputPath) {
    $OutputPath = Join-Path $workspaceRoot 'dist/puppets-orchestration.zip'
}
$archivePath = [IO.Path]::GetFullPath($OutputPath)
if ([IO.Path]::GetExtension($archivePath) -ne '.zip') {
    throw 'OutputPath must end in .zip.'
}
if (Test-Path -LiteralPath $archivePath) {
    throw "Archive already exists. Choose another OutputPath: $archivePath"
}
New-Item -ItemType Directory -Path (Split-Path -Parent $archivePath) -Force | Out-Null
Add-Type -AssemblyName System.IO.Compression

$archiveStream = [IO.File]::Open($archivePath, [IO.FileMode]::CreateNew)
$archive = [IO.Compression.ZipArchive]::new($archiveStream, [IO.Compression.ZipArchiveMode]::Create)
$entryNames = [Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$prefix = 'puppets-orchestration/'

function Add-ArchiveFile([string]$SourcePath, [string]$RelativePath) {
    $entryName = $prefix + $RelativePath.Replace('\', '/')
    if (-not $entryNames.Add($entryName)) { throw "Duplicate archive path: $entryName" }
    $entry = $archive.CreateEntry($entryName, [IO.Compression.CompressionLevel]::Optimal)
    $entryStream = $entry.Open()
    $sourceStream = [IO.File]::OpenRead($SourcePath)
    try { $sourceStream.CopyTo($entryStream) }
    finally { $sourceStream.Dispose(); $entryStream.Dispose() }
}

try {
    foreach ($relativeFile in @('README.md', 'AGENTS.md', '.gitignore', 'skills-lock.json', '.agents/worker-skills.md', 'scripts/build-package.ps1', '.orchestration/README.md', '.orchestration/tasks/README.md', '.orchestration/runs/README.md')) {
        Add-ArchiveFile (Join-Path $workspaceRoot $relativeFile) $relativeFile
    }
    foreach ($directory in @('docs', 'skills')) {
        foreach ($file in Get-ChildItem (Join-Path $workspaceRoot $directory) -Recurse -File | Sort-Object FullName) {
            Add-ArchiveFile $file.FullName $file.FullName.Substring($workspaceRoot.Length + 1)
        }
    }
    foreach ($role in @('orchestrator', 'architect', 'backend', 'frontend', 'explorer', 'debugger', 'reviewer', 'tester')) {
        $relativeRole = '.agents/' + $role + '.md'
        Add-ArchiveFile (Join-Path $workspaceRoot $relativeRole) $relativeRole
    }
    # Generate discoverable copies from the categorized skills, without exporting local agent state.
    foreach ($category in Get-ChildItem (Join-Path $workspaceRoot 'skills') -Directory) {
        if ($category.Name -eq 'worker') { continue }
        foreach ($skill in Get-ChildItem $category.FullName -Directory) {
            if (-not (Test-Path (Join-Path $skill.FullName 'SKILL.md'))) { throw "Missing SKILL.md: $($skill.FullName)" }
            foreach ($file in Get-ChildItem $skill.FullName -Recurse -File) {
                Add-ArchiveFile $file.FullName ('.agents/skills/' + $skill.Name + '/' + $file.FullName.Substring($skill.FullName.Length + 1))
            }
        }
    }
    $state = $archive.CreateEntry($prefix + '.orchestration/state.md')
    $writer = [IO.StreamWriter]::new($state.Open(), [Text.UTF8Encoding]::new($false))
    try {
        $writer.Write("# Project State`n`n## Current Phase`nReady for project selection.`n`n## Active Tasks`nNone.`n`n## Goal`nTBD - set from the user's instructions.`n`n## Blockers`nNone identified.`n")
    } finally { $writer.Dispose() }
} finally {
    $archive.Dispose()
    $archiveStream.Dispose()
}
Write-Output "Created $archivePath"
