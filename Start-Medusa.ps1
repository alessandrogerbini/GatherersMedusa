# Medusa V2 Quick Start Script
# Double-click to start Medusa backend and open admin dashboard

Write-Host "🚀 Starting Medusa V2..." -ForegroundColor Cyan
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
Write-Host "🔧 Starting Medusa development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Admin Dashboard will open automatically in 15 seconds..." -ForegroundColor Cyan
Write-Host "Server URL: http://localhost:9000" -ForegroundColor Gray
Write-Host "Admin URL:  http://localhost:9000/app" -ForegroundColor Gray
Write-Host ""
Write-Host "Login Credentials:" -ForegroundColor Cyan
Write-Host "  Email:    admin@medusa.com" -ForegroundColor Gray
Write-Host "  Password: supersecret" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Change to medusa directory
Set-Location "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"

# Start browser after delay (in background job)
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 15
    Start-Process "http://localhost:9000/app"
} | Out-Null

# Start Medusa server
npm run dev




