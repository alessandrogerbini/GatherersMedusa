# Test Environment Validation Script
# Validates that the test environment is properly configured

$errors = @()
$warnings = @()

Write-Host "🔍 Validating Test Environment..." -ForegroundColor Cyan
Write-Host ""

# Check Node.js version
Write-Host "Checking Node.js version..." -NoNewline
try {
    $nodeVersion = node --version
    $nodeVersionNumber = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
    if ($nodeVersionNumber -ge 20) {
        Write-Host " ✅ $nodeVersion" -ForegroundColor Green
    } else {
        Write-Host " ❌ $nodeVersion (requires >= 20)" -ForegroundColor Red
        $errors += "Node.js version must be >= 20. Current: $nodeVersion"
    }
} catch {
    Write-Host " ❌ Node.js not found" -ForegroundColor Red
    $errors += "Node.js is not installed or not in PATH"
}

# Check npm
Write-Host "Checking npm..." -NoNewline
try {
    $npmVersion = npm --version
    Write-Host " ✅ $npmVersion" -ForegroundColor Green
} catch {
    Write-Host " ❌ npm not found" -ForegroundColor Red
    $errors += "npm is not installed or not in PATH"
}

# Check PostgreSQL (optional - tests may use in-memory DB)
Write-Host "Checking PostgreSQL..." -NoNewline
try {
    $pgVersion = psql --version 2>&1
    if ($pgVersion -match "psql") {
        Write-Host " ✅ Available" -ForegroundColor Green
    } else {
        Write-Host " ⚠️  Not found (tests may use in-memory DB)" -ForegroundColor Yellow
        $warnings += "PostgreSQL not found. Tests may use in-memory database."
    }
} catch {
    Write-Host " ⚠️  Not found (tests may use in-memory DB)" -ForegroundColor Yellow
    $warnings += "PostgreSQL not found. Tests may use in-memory database."
}

# Check if we're in the correct directory
Write-Host "Checking directory..." -NoNewline
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    if ($packageJson.name -eq "medusa-backend") {
        Write-Host " ✅ In medusa-backend directory" -ForegroundColor Green
    } else {
        Write-Host " ⚠️  Not in medusa-backend directory" -ForegroundColor Yellow
        $warnings += "Not in medusa-backend directory"
    }
} else {
    Write-Host " ❌ package.json not found" -ForegroundColor Red
    $errors += "Not in a Node.js project directory"
}

# Check if node_modules exists
Write-Host "Checking dependencies..." -NoNewline
if (Test-Path "node_modules") {
    Write-Host " ✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host " ❌ node_modules not found" -ForegroundColor Red
    $errors += "Dependencies not installed. Run 'npm install'"
}

# Check Jest
Write-Host "Checking Jest..." -NoNewline
if (Test-Path "node_modules/jest") {
    Write-Host " ✅ Jest installed" -ForegroundColor Green
} else {
    Write-Host " ❌ Jest not found" -ForegroundColor Red
    $errors += "Jest is not installed. Run 'npm install'"
}

# Check @medusajs/test-utils
Write-Host "Checking @medusajs/test-utils..." -NoNewline
if (Test-Path "node_modules/@medusajs/test-utils") {
    Write-Host " ✅ Test utils installed" -ForegroundColor Green
} else {
    Write-Host " ❌ Test utils not found" -ForegroundColor Red
    $errors += "@medusajs/test-utils is not installed. Run 'npm install'"
}

# Check test files
Write-Host "Checking test files..." -NoNewline
if (Test-Path "integration-tests/http") {
    $testFiles = Get-ChildItem "integration-tests/http/*.spec.ts" -ErrorAction SilentlyContinue
    if ($testFiles) {
        Write-Host " ✅ Found $($testFiles.Count) test file(s)" -ForegroundColor Green
    } else {
        Write-Host " ⚠️  No test files found" -ForegroundColor Yellow
        $warnings += "No test files found in integration-tests/http/"
    }
} else {
    Write-Host " ⚠️  integration-tests/http directory not found" -ForegroundColor Yellow
    $warnings += "integration-tests/http directory not found"
}

# Check jest.config.js
Write-Host "Checking Jest configuration..." -NoNewline
if (Test-Path "jest.config.js") {
    Write-Host " ✅ jest.config.js found" -ForegroundColor Green
} else {
    Write-Host " ❌ jest.config.js not found" -ForegroundColor Red
    $errors += "jest.config.js is missing"
}

Write-Host ""

# Summary
if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "✅ Environment validation passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now run tests using:" -ForegroundColor Cyan
    Write-Host "  npm run test:integration:http" -ForegroundColor White
    Write-Host "  npm run test:unit" -ForegroundColor White
    Write-Host "  npm run test:all" -ForegroundColor White
    exit 0
} else {
    if ($errors.Count -gt 0) {
        Write-Host "❌ Validation failed with $($errors.Count) error(s):" -ForegroundColor Red
        foreach ($error in $errors) {
            Write-Host "  - $error" -ForegroundColor Red
        }
        Write-Host ""
    }
    
    if ($warnings.Count -gt 0) {
        Write-Host "⚠️  $($warnings.Count) warning(s):" -ForegroundColor Yellow
        foreach ($warning in $warnings) {
            Write-Host "  - $warning" -ForegroundColor Yellow
        }
        Write-Host ""
    }
    
    if ($errors.Count -gt 0) {
        Write-Host "Please fix the errors above before running tests." -ForegroundColor Yellow
        exit 1
    } else {
        Write-Host "Environment has warnings but should work." -ForegroundColor Yellow
        exit 0
    }
}

