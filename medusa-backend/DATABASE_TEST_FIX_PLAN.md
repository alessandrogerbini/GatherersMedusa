# Database Test Connection Fix - Comprehensive Plan

## ✅ What We've Verified

1. **Network Connectivity**: ✅ DNS resolution works, port 5432 is open
2. **Direct Connection**: ✅ `pg.Client` can connect successfully
3. **Database Operations**: ✅ Can create, connect to, and drop test databases
4. **Connection String Format**: ✅ Both connection string and object format work
5. **Docker Setup**: ✅ PostgreSQL container is healthy and accessible

## 🔍 Root Cause Analysis

The error `internalConnectMultiple` occurs when the Medusa test runner tries to initialize the database. This Node.js error typically happens when:

1. **Multiple address resolution**: Node.js tries IPv4 and IPv6, one fails
2. **Connection pool initialization**: Multiple simultaneous connection attempts
3. **Timing issue**: Connection attempted before network is fully ready
4. **Connection string parsing**: Test runner might parse DATABASE_URL differently

## 💡 Hypothesis

Based on testing, the issue is **NOT** with:
- ❌ Network connectivity (verified working)
- ❌ Connection string format (verified working)
- ❌ Database permissions (verified working)
- ❌ Docker configuration (verified working)

The issue is likely:
- ✅ **Test runner initialization timing** - might need a delay
- ✅ **Connection pool configuration** - might need specific settings
- ✅ **IPv6/IPv4 dual-stack issue** - Node.js trying both addresses

## 🔧 Fix Strategies

### Strategy 1: Force IPv4 Connection

The `internalConnectMultiple` error often occurs with IPv6. Force IPv4:

```typescript
// In test file or test runner config
env: {
  DATABASE_URL: process.env.DATABASE_URL || "postgres://postgres@postgres-test:5432/postgres",
  // Force IPv4
  NODE_OPTIONS: "--dns-result-order=ipv4first"
}
```

### Strategy 2: Add Connection Retry Logic

The test runner might be connecting too quickly. Add retry:

```typescript
// Wait for PostgreSQL to be fully ready
await new Promise(resolve => setTimeout(resolve, 2000));
```

### Strategy 3: Use Connection Object Instead of String

Some connection libraries prefer object format:

```typescript
env: {
  DB_HOST: "postgres-test",
  DB_PORT: "5432",
  DB_USER: "postgres",
  DB_NAME: "postgres"
}
```

### Strategy 4: Check Test Runner Source Code

Investigate `node_modules/@medusajs/test-utils` to see:
- How it parses DATABASE_URL
- How it creates connections
- If there are specific requirements

### Strategy 5: Use Different Connection Method

Try using `postgresql://` instead of `postgres://`:

```typescript
DATABASE_URL: "postgresql://postgres@postgres-test:5432/postgres"
```

## 🎯 Immediate Next Steps

1. **Try IPv4 forcing** - Add `NODE_OPTIONS` to force IPv4
2. **Check test runner logs** - Enable verbose logging
3. **Review test runner source** - Understand connection logic
4. **Try alternative connection format** - Use `postgresql://` protocol
5. **Add connection delay** - Wait before test runner initializes

## 📋 Production Readiness Checklist

Before deploying to production, we must:

- [ ] ✅ Fix Docker test database connection
- [ ] ✅ Verify all integration tests pass in Docker
- [ ] ✅ Document database connection requirements
- [ ] ✅ Test database migrations in Docker
- [ ] ✅ Verify database cleanup (test database dropping)
- [ ] ✅ Test with production-like database configuration
- [ ] ✅ Document environment variable requirements

## 🔗 References

- [Medusa Testing Tools](https://docs.medusajs.com/learn/debugging-and-testing/testing-tools/modules-tests)
- [Medusa Deployment Guide](https://docs.medusajs.com/learn/deployment/general)
- [Node.js DNS Resolution](https://nodejs.org/api/dns.html)

