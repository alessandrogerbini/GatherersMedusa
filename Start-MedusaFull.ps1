# Medusa V2 Full Stack Startup Script
# Starts both Backend and Storefront

Write-Host "🚀 Starting Medusa V2 Full Stack..." -ForegroundColor Cyan
Write-Host ""

# Check PostgreSQL Service
Write-Host "📊 Checking PostgreSQL..." -ForegroundColor Yellow
$pgService = Get-Service postgresql-x64-17 -ErrorAction SilentlyContinue

if ($pgService.Status -ne 'Running') {
    Write-Host "⚠️  PostgreSQL is not running. Starting..." -ForegroundColor Yellow
    try {
        Start-Service postgresql-x64-17
        Start-Sleep -Seconds 3
        Write-Host "✅ PostgreSQL started successfully!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to start PostgreSQL. Please start it manually." -ForegroundColor Red
        Write-Host "   Run: Start-Service postgresql-x64-17" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
} else {
    Write-Host "✅ PostgreSQL is already running!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔧 Starting Medusa Backend..." -ForegroundColor Yellow
Write-Host "   Backend API:  http://localhost:9000" -ForegroundColor Gray
Write-Host "   Admin:        http://localhost:9000/app" -ForegroundColor Gray
Write-Host ""

# Start Backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", @"
Write-Host '=== BACKEND STARTING ===' -ForegroundColor Cyan; 
Write-Host 'Backend API: http://localhost:9000' -ForegroundColor Gray;
Write-Host 'Admin: http://localhost:9000/app' -ForegroundColor Gray;
Write-Host ''; 
cd 'G:\FastGrams program files\GG Medusa V2 website\medusa-backend'; 
npm run dev
"@

Write-Host "✅ Backend starting in separate window..." -ForegroundColor Green
Write-Host ""
Write-Host "⏳ Waiting for backend to fully initialize (up to 40 seconds)..." -ForegroundColor Yellow
Write-Host "   (Backend needs time to compile and connect to database)" -ForegroundColor Gray
Write-Host ""

# Wait and verify backend is ready
$maxWait = 40
$checkInterval = 10
$ready = $false

for ($i = $checkInterval; $i -le $maxWait; $i += $checkInterval) {
    Start-Sleep -Seconds $checkInterval
    Write-Host "   Checking backend at ${i}s..." -ForegroundColor Gray
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:9000/app" -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "   ✅ Backend is READY! (at ${i} seconds)" -ForegroundColor Green
            $ready = $true
            break
        }
    } catch {
        # Backend not ready yet, continue waiting
    }
}

if (-not $ready) {
    Write-Host "   ⚠️  Backend taking longer than expected, but proceeding..." -ForegroundColor Yellow
}

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "🛍️  Starting Storefront..." -ForegroundColor Yellow
Write-Host "   Storefront:   http://localhost:8000" -ForegroundColor Gray
Write-Host ""

# Start Storefront in new window (backend is confirmed ready)
Start-Process powershell -ArgumentList "-NoExit", "-Command", @"
Write-Host '=== STOREFRONT STARTING ===' -ForegroundColor Cyan; 
Write-Host 'Storefront: http://localhost:8000' -ForegroundColor Gray;
Write-Host 'Backend confirmed ready at: http://localhost:9000' -ForegroundColor Gray;
Write-Host ''; 
cd 'G:\FastGrams program files\GG Medusa V2 website\medusa-storefront'; 
npm run dev
"@

Write-Host "✅ Storefront starting in separate window..." -ForegroundColor Green
Write-Host ""
Write-Host "⏳ Waiting for storefront to compile (30 seconds)..." -ForegroundColor Yellow
Write-Host "   (Next.js needs time to compile on first start)" -ForegroundColor Gray
Start-Sleep -Seconds 30

Write-Host ""
Write-Host "🌐 Opening Admin Dashboard and Storefront..." -ForegroundColor Yellow
Start-Process "http://localhost:9000/app"
Start-Sleep -Seconds 3
Start-Process "http://localhost:8000"

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "✅ Medusa V2 Full Stack is Running!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Access Points:" -ForegroundColor Cyan
Write-Host "   Backend API:  http://localhost:9000" -ForegroundColor White
Write-Host "   Admin:        http://localhost:9000/app" -ForegroundColor White
Write-Host "   Storefront:   http://localhost:8000" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Admin Login:" -ForegroundColor Cyan
Write-Host "   Email:    admin@medusa.com" -ForegroundColor White
Write-Host "   Password: supersecret" -ForegroundColor White
Write-Host ""
Write-Host "⏱️  Total startup time: ~70-90 seconds" -ForegroundColor Gray
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Yellow
Write-Host "   • Keep both terminal windows open while working" -ForegroundColor Gray
Write-Host "   • Press Ctrl+C in terminal windows to stop servers" -ForegroundColor Gray
Write-Host "   • Backend MUST be ready before storefront (this script handles it)" -ForegroundColor Gray
Write-Host ""
Write-Host "⚠️  If storefront shows errors:" -ForegroundColor Yellow
Write-Host "   • Wait a bit longer - may still be compiling" -ForegroundColor Gray
Write-Host "   • Check backend terminal - must show 'Server is ready'" -ForegroundColor Gray
Write-Host "   • Refresh browser after 10-15 seconds" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Enter to close this window..." -ForegroundColor Gray
Read-Host



