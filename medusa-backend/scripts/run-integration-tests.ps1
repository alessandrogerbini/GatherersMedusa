# Run integration tests with proper environment variables
# The test runner uses DB_USERNAME and DB_PASSWORD, not DATABASE_URL!

Write-Host "Running integration tests..." -ForegroundColor Green
Write-Host ""

$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "1401"
$env:DB_HOST = "localhost"
$env:DB_PORT = "5433"
$env:TEST_TYPE = "integration:http"
$env:NODE_OPTIONS = "--experimental-vm-modules"

Write-Host "Environment variables set:" -ForegroundColor Cyan
Write-Host "  DB_USERNAME: $env:DB_USERNAME"
Write-Host "  DB_PASSWORD: $env:DB_PASSWORD"
Write-Host "  DB_HOST: $env:DB_HOST"
Write-Host "  DB_PORT: $env:DB_PORT"
Write-Host ""

npx jest --testPathPattern="integration-tests/http" --runInBand --forceExit







