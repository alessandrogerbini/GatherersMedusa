# Custom integration test runner that properly handles database passwords
# This bypasses the @medusajs/test-utils connection string issue

Write-Host "Running integration tests with custom database handling..." -ForegroundColor Green
Write-Host ""

$env:DATABASE_URL = "postgres://postgres:1401@localhost:5433/medusa-backend"
$env:TEST_TYPE = "integration:http"
$env:NODE_OPTIONS = "--experimental-vm-modules"

node scripts/custom-test-runner.js





