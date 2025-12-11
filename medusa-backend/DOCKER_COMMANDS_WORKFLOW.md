# Docker Commands Workflow for Long-Running Operations

## Problem
Cursor's agent times out on long-running Docker commands (10+ minutes). We need a workflow where you run commands and save results to files.

## ✅ Solution: Use PowerShell Scripts

### Quick Test Run
```powershell
# Run single test file
.\scripts\run-docker-tests.ps1 integration-tests/http/health.spec.ts

# Run full test suite
.\scripts\run-docker-tests.ps1
```

The script will:
- Start PostgreSQL container
- Wait for it to be ready
- Run tests
- Save all output to `docker-test-output.log`
- Save errors to `docker-test-errors.log`

## Manual Command Workflow

### Step 1: Run Command and Save Output
```powershell
# Example: Build test runner
docker-compose -f docker-compose.test.yml build test-runner 2>&1 | Tee-Object -FilePath docker-build-output.log

# Example: Run tests
docker-compose -f docker-compose.test.yml run --rm test-runner npm run test:integration:http 2>&1 | Tee-Object -FilePath docker-test-output.log
```

### Step 2: Check Results
After the command completes, I can read:
- `docker-build-output.log` - Build output
- `docker-test-output.log` - Test output
- `docker-test-errors.log` - Any errors (if script created it)

### Step 3: Share Status
Just tell me: "Command completed, check [filename].log"

## Common Commands

### Build Test Runner (First Time - ~15 minutes)
```powershell
docker-compose -f docker-compose.test.yml build test-runner 2>&1 | Tee-Object -FilePath docker-build-output.log
```

### Run Single Test
```powershell
docker-compose -f docker-compose.test.yml up -d postgres-test
docker-compose -f docker-compose.test.yml run --rm test-runner npx jest --runInBand --forceExit integration-tests/http/health.spec.ts 2>&1 | Tee-Object -FilePath docker-test-output.log
```

### Run Full Test Suite
```powershell
docker-compose -f docker-compose.test.yml up -d postgres-test
docker-compose -f docker-compose.test.yml run --rm test-runner npm run test:integration:http 2>&1 | Tee-Object -FilePath docker-test-output.log
```

### Check Container Status
```powershell
docker ps -a | Select-String "medusa-test" | Out-File docker-containers.txt
```

### View PostgreSQL Logs
```powershell
docker logs medusa-test-postgres 2>&1 | Select-Object -Last 50 | Out-File postgres-logs.txt
```

## File Naming Convention

Use descriptive names:
- `docker-build-output.log` - Build operations
- `docker-test-output.log` - Test execution
- `docker-test-errors.log` - Test errors only
- `postgres-logs.txt` - PostgreSQL container logs
- `docker-containers.txt` - Container status

## Next Steps After Command Completes

1. **Tell me the command completed**
2. **Mention the output file name**
3. **I'll read the file and analyze results**
4. **We'll proceed based on the output**

## Example Workflow

**You**: "Running test build, will save to docker-build-output.log"
*[15 minutes later]*
**You**: "Build completed, check docker-build-output.log"
**Me**: *[reads file, analyzes, provides next steps]*

