# Docker Testing - Quick Start Guide

## ✅ Setup Complete

- Test runner image built ✅
- PostgreSQL container configured ✅
- All test files updated for Docker ✅

## 🚀 Run Tests

### Option 1: Use the Script (Recommended)
```powershell
# Single test
.\scripts\run-docker-tests.ps1 integration-tests/http/health.spec.ts

# Full suite
.\scripts\run-docker-tests.ps1
```

### Option 2: Manual Command
```powershell
# Start PostgreSQL
docker-compose -f docker-compose.test.yml up -d postgres-test

# Run tests (save output for Cursor to read)
docker-compose -f docker-compose.test.yml run --rm test-runner npm run test:integration:http 2>&1 | Tee-Object -FilePath docker-test-output.log
```

## 📋 Workflow for Long Commands

Since Cursor times out on commands >10 minutes:

1. **You run the command** with `Tee-Object -FilePath filename.log`
2. **Wait for completion**
3. **Tell me**: "Command done, check filename.log"
4. **I'll read the file** and provide next steps

## 🔍 Files Created

- `docker-test-output.log` - Test execution output
- `docker-test-errors.log` - Errors only (if script used)
- `DOCKER_COMMANDS_WORKFLOW.md` - Detailed workflow guide
- `DOCKER_TEST_NEXT_STEPS.md` - Next steps after setup

## ⚠️ Important

- **Inside Docker**: Use `postgres-test:5432` (service name)
- **From Host**: Use `localhost:5434` (mapped port)
- **Tests run inside Docker**, so they use service name

