param([switch]$Start)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw "Install Node.js 24 or newer from https://nodejs.org/ and reopen PowerShell."
}
$timelessNodeMajor = [int]((& node -p "process.versions.node.split('.')[0]").Trim())
if ($timelessNodeMajor -lt 24) { throw "This project uses Node.js 24 or newer." }

if (Test-Path "package-lock.json") { & npm.cmd ci } else { & npm.cmd install }
if ($LASTEXITCODE -ne 0) { throw "Dependency installation failed. Check the npm output above." }

if ($Start) {
    & npm.cmd run dev
    exit $LASTEXITCODE
}
Write-Host "Timeless is ready. Run npm run dev, then open http://localhost:3000."
