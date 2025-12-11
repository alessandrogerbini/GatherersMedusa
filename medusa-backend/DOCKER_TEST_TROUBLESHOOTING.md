# Docker Test Troubleshooting Status

## ✅ What's Working

1. **PostgreSQL Container**: ✅ Running and healthy
2. **Network Connectivity**: ✅ Verified - can connect from other containers
3. **Direct Connection Test**: ✅ Works with explicit DATABASE_URL
4. **Test Runner Image**: ✅ Built and ready

## ❌ Current Issue

**Problem**: Test runner fails to connect to database during test initialization

**Error**: 
```
"Error initializing database: "
"internalConnectMultiple" (Node.js network error)
```

**Attempted Solutions**:
1. ✅ Updated DATABASE_URL in docker-compose (passwordless)
2. ✅ Updated test file to explicitly pass DATABASE_URL in `env` object
3. ✅ Verified connection works with explicit `-e DATABASE_URL` flag
4. ✅ Verified network connectivity between containers

## 🔍 Observations

1. **Direct connection test works**: When we test with `node test-db-connection.js`, connection succeeds
2. **Test runner fails**: The `medusaIntegrationTestRunner` fails during database initialization
3. **Error timing**: Fails when trying to create test database `medusa-*-integration-1`

## 💡 Possible Causes

1. **Test runner constructs its own connection string**: May be ignoring DATABASE_URL from env
2. **Timing issue**: Test runner connects before database is fully ready
3. **Connection method**: Test runner uses different connection method than direct pg.Client
4. **Environment variable not accessible**: DATABASE_URL not available when test runner initializes

## 🔧 Next Steps to Try

### Option 1: Set DATABASE_URL in Dockerfile
Add to `Dockerfile.test`:
```dockerfile
ENV DATABASE_URL=postgres://postgres@postgres-test:5432/postgres
```

### Option 2: Check Medusa Test Runner Source
Investigate how `medusaIntegrationTestRunner` handles DATABASE_URL:
- Does it read from `process.env.DATABASE_URL`?
- Does it construct its own connection string?
- Does it use the `env` parameter from the test configuration?

### Option 3: Use Different Connection Method
Try using a connection pool or different PostgreSQL client

### Option 4: Check PostgreSQL Logs
```powershell
docker logs medusa-test-postgres --tail 50
```

### Option 5: Add Debug Logging
Add console.log in test file to verify DATABASE_URL is available:
```typescript
console.log('DATABASE_URL:', process.env.DATABASE_URL);
```

## 📝 Current Configuration

**docker-compose.test.yml**:
```yaml
environment:
  DATABASE_URL: postgres://postgres@postgres-test:5432/postgres
```

**health.spec.ts**:
```typescript
env: {
  DATABASE_URL: process.env.DATABASE_URL || "postgres://postgres@postgres-test:5432/postgres"
}
```

## 🎯 Immediate Action

Run with debug output:
```powershell
docker-compose -f docker-compose.test.yml run --rm -e DATABASE_URL="postgres://postgres@postgres-test:5432/postgres" test-runner sh -c "echo DATABASE_URL=\$DATABASE_URL && npx jest --runInBand --forceExit integration-tests/http/health.spec.ts" 2>&1 | Tee-Object -FilePath docker-test-debug.log
```

