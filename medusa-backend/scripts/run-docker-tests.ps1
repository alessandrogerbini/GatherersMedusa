# PowerShell script to run Docker tests and save output
# Usage: .\scripts\run-docker-tests.ps1 [test-file]

param(
    [string]$TestFile = ""
)

$OutputFile = "docker-test-output.log"
$ErrorFile = "docker-test-errors.log"

Write-Host "Starting Docker test execution..." -ForegroundColor Green
Write-Host "Output will be saved to: $OutputFile" -ForegroundColor Yellow
Write-Host "Errors will be saved to: $ErrorFile" -ForegroundColor Yellow
Write-Host ""

# Ensure PostgreSQL is running
Write-Host "Starting PostgreSQL container..." -ForegroundColor Cyan
docker-compose -f docker-compose.test.yml up -d postgres-test 2>&1 | Tee-Object -FilePath $OutputFile -Append

# Wait for PostgreSQL to be ready
Write-Host "Waiting for PostgreSQL to be ready..." -ForegroundColor Cyan
Start-Sleep -Seconds 5
docker exec medusa-test-postgres pg_isready -U postgres 2>&1 | Tee-Object -FilePath $OutputFile -Append

if ($LASTEXITCODE -ne 0) {
    Write-Host "PostgreSQL is not ready. Check logs." -ForegroundColor Red
    exit 1
}

# Run tests
if ($TestFile -eq "") {
    Write-Host "Running full test suite..." -ForegroundColor Cyan
    docker-compose -f docker-compose.test.yml run --rm test-runner npm run test:integration:http 2>&1 | Tee-Object -FilePath $OutputFile -Append
} else {
    Write-Host "Running test file: $TestFile" -ForegroundColor Cyan
    docker-compose -f docker-compose.test.yml run --rm test-runner npx jest --runInBand --forceExit $TestFile 2>&1 | Tee-Object -FilePath $OutputFile -Append
}

$ExitCode = $LASTEXITCODE

# Capture any errors separately
if ($ExitCode -ne 0) {
    Get-Content $OutputFile | Select-String -Pattern "error|Error|ERROR|fail|Fail|FAIL" | Out-File -FilePath $ErrorFile
    Write-Host "Tests completed with errors. Check $ErrorFile" -ForegroundColor Red
} else {
    Write-Host "Tests completed successfully!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Full output saved to: $OutputFile" -ForegroundColor Yellow
if (Test-Path $ErrorFile) {
    Write-Host "Errors saved to: $ErrorFile" -ForegroundColor Yellow
}

exit $ExitCode

