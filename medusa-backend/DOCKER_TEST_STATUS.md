# Docker Test Status - Current Issue

## Summary

Tests are failing because the Medusa test runner cannot connect to PostgreSQL, even though:
- ✅ PostgreSQL container is running and healthy
- ✅ Network connectivity works (verified with direct connection test)
- ✅ DATABASE_URL is set correctly

## Error Details

```
"Error initializing database: "
"internalConnectMultiple" (Node.js network connection error)
```

The test runner tries to create a database like `medusa-*-integration-1` but fails during connection.

## What We've Tried

1. ✅ Updated docker-compose DATABASE_URL (passwordless)
2. ✅ Updated test file to pass DATABASE_URL in env object
3. ✅ Verified connection works with direct Node.js test
4. ✅ Verified network connectivity
5. ✅ Set DATABASE_URL in Dockerfile (just now)

## Next Steps

**Rebuild the test runner image** to include DATABASE_URL in the image:
```powershell
docker-compose -f docker-compose.test.yml build test-runner 2>&1 | Tee-Object -FilePath docker-build-output.log
```

Then run the test again:
```powershell
docker-compose -f docker-compose.test.yml run --rm test-runner npx jest --runInBand --forceExit integration-tests/http/health.spec.ts 2>&1 | Tee-Object -FilePath docker-test-output.log
```

## Alternative: Investigate Medusa Test Runner

The test runner might be constructing its own connection string. We may need to:
1. Check Medusa test utils source code
2. See how it handles DATABASE_URL
3. Find if there's a different way to configure it

