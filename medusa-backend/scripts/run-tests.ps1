# Test Execution Script
# Runs the comprehensive test suite with proper environment setup

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("all", "unit", "integration:http", "integration:modules", "coverage")]
    [string]$TestType = "all"
)

Write-Host "🧪 Running Test Suite..." -ForegroundColor Cyan
Write-Host ""

# Set environment variables
$env:NODE_OPTIONS = "--experimental-vm-modules"

# Change to backend directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $scriptPath ".."
Set-Location $backendPath

# Run tests based on type
switch ($TestType) {
    "all" {
        Write-Host "Running all test suites..." -ForegroundColor Yellow
        Write-Host ""
        
        Write-Host "1️⃣  Running unit tests..." -ForegroundColor Cyan
        $env:TEST_TYPE = "unit"
        npm run test:unit
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Unit tests failed" -ForegroundColor Red
            exit 1
        }
        Write-Host ""
        
        Write-Host "2️⃣  Running integration module tests..." -ForegroundColor Cyan
        $env:TEST_TYPE = "integration:modules"
        npm run test:integration:modules
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Integration module tests failed" -ForegroundColor Red
            exit 1
        }
        Write-Host ""
        
        Write-Host "3️⃣  Running integration HTTP tests..." -ForegroundColor Cyan
        $env:TEST_TYPE = "integration:http"
        npm run test:integration:http
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Integration HTTP tests failed" -ForegroundColor Red
            exit 1
        }
        Write-Host ""
        
        Write-Host "✅ All tests passed!" -ForegroundColor Green
    }
    "unit" {
        Write-Host "Running unit tests..." -ForegroundColor Cyan
        $env:TEST_TYPE = "unit"
        npm run test:unit
    }
    "integration:http" {
        Write-Host "Running integration HTTP tests..." -ForegroundColor Cyan
        $env:TEST_TYPE = "integration:http"
        npm run test:integration:http
    }
    "integration:modules" {
        Write-Host "Running integration module tests..." -ForegroundColor Cyan
        $env:TEST_TYPE = "integration:modules"
        npm run test:integration:modules
    }
    "coverage" {
        Write-Host "Running tests with coverage..." -ForegroundColor Cyan
        $env:TEST_TYPE = "unit"
        npm run test:coverage
        Write-Host ""
        Write-Host "📊 Coverage report generated in coverage/ directory" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "✨ Test execution complete!" -ForegroundColor Green







