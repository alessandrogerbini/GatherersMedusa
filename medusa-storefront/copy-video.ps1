# Script to copy video file to public directory
$source = "G:\FastGrams program files\GG Medusa V2 website\Brand Assets\Gatherer's Granola\Coman Video\granola movie.mov"
$destDir = "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront\public\videos"
$dest = "$destDir\granola-manufacturing.mov"

Write-Host "=== Copying Video File ===" -ForegroundColor Cyan

if (-not (Test-Path $source)) {
    Write-Host "ERROR: Source file not found: $source" -ForegroundColor Red
    exit 1
}

Write-Host "Source file found: $source" -ForegroundColor Green

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    Write-Host "Created directory: $destDir" -ForegroundColor Yellow
} else {
    Write-Host "Directory exists: $destDir" -ForegroundColor Green
}

Copy-Item $source -Destination $dest -Force

if (Test-Path $dest) {
    $file = Get-Item $dest
    Write-Host "SUCCESS: File copied!" -ForegroundColor Green
    Write-Host "  Location: $dest" -ForegroundColor White
    Write-Host "  Size: $([math]::Round($file.Length/1MB, 2)) MB" -ForegroundColor White
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Restart your Next.js dev server" -ForegroundColor Yellow
    Write-Host "2. Refresh the test page" -ForegroundColor Yellow
    Write-Host "3. Note: .mov files only work in Safari. For Chrome/Firefox/Edge, convert to MP4." -ForegroundColor Yellow
} else {
    Write-Host "ERROR: File copy failed!" -ForegroundColor Red
    exit 1
}










