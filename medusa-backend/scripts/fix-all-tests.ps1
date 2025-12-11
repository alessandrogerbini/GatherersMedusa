# Script to add publishable API key setup to all test files
# This ensures all tests can run and produce results

Write-Host "Adding publishable API key setup to all test files..." -ForegroundColor Green

$testFiles = @(
    "integration-tests/http/cart.spec.ts",
    "integration-tests/http/checkout.spec.ts",
    "integration-tests/http/customers.spec.ts",
    "integration-tests/http/custom-routes.spec.ts",
    "integration-tests/http/regions.spec.ts",
    "integration-tests/http/new-client-promotions.spec.ts",
    "integration-tests/http/nybs-products-seed.spec.ts"
)

foreach ($file in $testFiles) {
    if (Test-Path $file) {
        Write-Host "Processing: $file" -ForegroundColor Cyan
        # The actual replacement will be done manually for each file
    }
}

Write-Host "Done!" -ForegroundColor Green







