# Database Test Connection Issue - Comprehensive Analysis

## Problem Summary

The `medusaIntegrationTestRunner` fails to connect to PostgreSQL when running tests in Docker, with error:
```
"Error initializing database: "
"internalConnectMultiple" (Node.js network connection error)
```

## How Medusa Test Runner Works

Based on [Medusa Testing Documentation](https://docs.medusajs.com/learn/debugging-and-testing/testing-tools/modules-tests):

1. **Automatic Database Management**: The test runner:
   - Creates a database with a random name (e.g., `medusa-gg7v8f-integration-1`)
   - Runs tests against that database
   - Drops the database after tests complete

2. **Connection String Usage**: The test runner uses `DATABASE_URL` to:
   - Connect to the PostgreSQL server
   - Create the test database
   - Run migrations and tests

## Current Configuration

### Docker Compose (`docker-compose.test.yml`)
```yaml
environment:
  DATABASE_URL: postgres://postgres@postgres-test:5432/postgres
```

### Test File (`health.spec.ts`)
```typescript
medusaIntegrationTestRunner({
  inApp: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL || "postgres://postgres@postgres-test:5432/postgres"
  },
  testSuite: ({ api }) => { ... }
})
```

### Dockerfile (`Dockerfile.test`)
```dockerfile
ENV DATABASE_URL=postgres://postgres@postgres-test:5432/postgres
```

## What We've Verified

✅ **PostgreSQL Container**: Running and healthy  
✅ **Network Connectivity**: Can connect from other containers  
✅ **Direct Connection Test**: Works with `pg.Client`  
✅ **DNS Resolution**: `postgres-test` resolves correctly  
✅ **Authentication**: `POSTGRES_HOST_AUTH_METHOD: trust` enabled

## The Issue

The test runner is trying to create database `medusa-gg7v8f-integration-1` but fails during the initial connection. The error `internalConnectMultiple` suggests:

1. **Connection attempt is made** (not a DNS issue)
2. **Connection fails** at the network level
3. **Possible causes**:
   - Connection string parsing issue
   - Timing issue (connection attempted before PostgreSQL is ready)
   - Connection pool/retry logic issue
   - The test runner constructs its own connection string

## Key Insight from Documentation

From [Medusa Testing Tools](https://docs.medusajs.com/learn/debugging-and-testing/testing-tools/modules-tests):

> "The `moduleIntegrationTestRunner` function creates a database with a random name before running the tests. Then, it drops that database after all the tests end."

This applies to `medusaIntegrationTestRunner` as well - it needs to:
1. Connect to the PostgreSQL server using DATABASE_URL
2. Create a new database with a random name
3. Run migrations on that database
4. Execute tests
5. Drop the database

## Hypothesis

The test runner might be:
1. **Parsing DATABASE_URL incorrectly** - extracting parts and reconstructing
2. **Using a different connection method** - not using the connection string directly
3. **Requiring specific connection string format** - might need password even with trust auth
4. **Having timing issues** - trying to connect before network is fully ready

## Next Steps to Investigate

1. **Check test runner source code** - How does it parse and use DATABASE_URL?
2. **Try different connection string formats**:
   - With password: `postgres://postgres:postgres@postgres-test:5432/postgres`
   - With explicit schema: `postgresql://postgres@postgres-test:5432/postgres`
3. **Add connection retry logic** - Wait for PostgreSQL to be fully ready
4. **Check if test runner logs connection attempts** - Enable verbose logging
5. **Test with a simpler connection** - Use localhost instead of service name

## Production Implications

Before deploying to production, we must:
1. ✅ Understand how the test runner connects to databases
2. ✅ Verify tests can run in isolated environments (Docker)
3. ✅ Ensure database connection configuration is correct
4. ✅ Test database migrations work correctly
5. ✅ Verify cleanup (database dropping) works

## References

- [Medusa Testing Tools](https://docs.medusajs.com/learn/debugging-and-testing/testing-tools/modules-tests)
- [Medusa Deployment Guide](https://docs.medusajs.com/learn/deployment/general)
- [Medusa Worker Mode](https://docs.medusajs.com/learn/production/worker-mode)

