# Run unit tests (no database required)
# These tests should work immediately

Write-Host "Running unit tests..." -ForegroundColor Green
Write-Host ""

$env:TEST_TYPE = "unit"
$env:NODE_OPTIONS = "--experimental-vm-modules"

npx jest --testPathPattern="__tests__|\.test\." --runInBand --forceExit --silent

