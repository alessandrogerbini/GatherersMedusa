# PowerShell script to run tests with postgres user
# This script sets the correct environment variables for test execution

$env:PGUSER = "postgres"
$env:PGPASSWORD = ""
$env:TEST_TYPE = "integration:http"
$env:NODE_OPTIONS = "--experimental-vm-modules"
$env:DATABASE_URL = "postgres://postgres@localhost:5433/medusa-backend"

Write-Host "Running tests with postgres user..." -ForegroundColor Green
Write-Host "PGUSER: $env:PGUSER" -ForegroundColor Cyan
Write-Host "DATABASE_URL: $env:DATABASE_URL" -ForegroundColor Cyan
Write-Host ""

npx jest --testPathPattern="integration-tests/http" --runInBand --forceExit







