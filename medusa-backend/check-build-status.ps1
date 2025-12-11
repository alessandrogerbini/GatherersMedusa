# Quick script to check if Docker build completed

Write-Host "=== Docker Build Status Check ===" -ForegroundColor Cyan
Write-Host ""

# Check log file
if (Test-Path "docker-build-output.log") {
    $log = Get-Item "docker-build-output.log"
    $age = (Get-Date) - $log.LastWriteTime
    Write-Host "Log file last updated: $($log.LastWriteTime)" -ForegroundColor Yellow
    Write-Host "Age: $([math]::Floor($age.TotalMinutes)) minutes ago" -ForegroundColor $(if ($age.TotalMinutes -gt 20) { "Red" } else { "Green" })
    
    $lastLine = Get-Content "docker-build-output.log" -Tail 1
    Write-Host "Last log entry: $lastLine" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "No log file found" -ForegroundColor Red
}

# Check for test-runner image
Write-Host "Test Runner Images:" -ForegroundColor Cyan
docker images medusa-backend-test-runner --format "  {{.Repository}}:{{.Tag}} | {{.Size}} | Created: {{.CreatedAt}}" 2>&1

Write-Host ""
Write-Host "Docker Build Processes:" -ForegroundColor Cyan
$buildProcs = Get-Process | Where-Object {$_.ProcessName -like "*docker*" -or $_.ProcessName -like "*build*"}
if ($buildProcs) {
    $buildProcs | Select-Object ProcessName, Id, CPU | Format-Table
} else {
    Write-Host "  No active Docker build processes" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=== Recommendation ===" -ForegroundColor Cyan
if ($age.TotalMinutes -gt 20) {
    Write-Host "Build appears stalled. Try:" -ForegroundColor Yellow
    Write-Host "  1. Check Docker Desktop for build status" -ForegroundColor White
    Write-Host "  2. Restart the build: docker-compose -f docker-compose.test.yml build test-runner" -ForegroundColor White
} else {
    Write-Host "Build may still be running. Check Docker Desktop or wait a bit longer." -ForegroundColor Green
}
