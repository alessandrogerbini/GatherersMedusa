# Docker Test Solution - Final Approach

## ✅ You Are Correct

The Medusa test runner (`medusaIntegrationTestRunner`) **uses the system username** instead of respecting the `DATABASE_URL` parameter. Since your Windows username is "aless", the test runner tries to connect as user "aless" regardless of what we put in `DATABASE_URL`.

**We are 100% stuck with Docker** - this is the only way to control the environment.

## 🎯 Solution: Run Tests Inside Docker

Instead of running tests from the host and connecting to Docker PostgreSQL, we need to:
1. Run tests **inside** a Docker container
2. Control the system username inside Docker
3. Match that username to a PostgreSQL user in the Docker database

## 📋 Updated Docker Setup

### Strategy
1. **PostgreSQL Container**: Already running ✅
2. **Test Runner Container**: Build and run tests inside Docker
3. **System Username**: Set `USER=postgres` in Docker to match PostgreSQL user
4. **Connection**: Tests connect to `postgres-test` service (internal Docker network)

### Key Changes Made

1. **Dockerfile.test**: Added `ENV USER=postgres` to override system username
2. **docker-compose.test.yml**: Added `USER: postgres` environment variable
3. **PostgreSQL**: Already has `postgres` user with CREATEDB ✅

## 🚀 How to Run Tests

### Option 1: Run Full Test Suite in Docker
```powershell
# Build and run test container (will auto-run tests)
docker-compose -f docker-compose.test.yml up --build test-runner

# View logs
docker-compose -f docker-compose.test.yml logs test-runner

# Clean up
docker-compose -f docker-compose.test.yml down
```

### Option 2: Run Single Test File
```powershell
# Start PostgreSQL
docker-compose -f docker-compose.test.yml up -d postgres-test

# Run specific test inside Docker
docker-compose -f docker-compose.test.yml run --rm test-runner npx jest --runInBand --forceExit integration-tests/http/health.spec.ts
```

### Option 3: Interactive Shell for Debugging
```powershell
# Start PostgreSQL
docker-compose -f docker-compose.test.yml up -d postgres-test

# Get shell inside test container
docker-compose -f docker-compose.test.yml run --rm test-runner sh

# Inside container, run:
# npm run test:integration:http
# or
# npx jest integration-tests/http/health.spec.ts
```

## 🔍 Why This Works

1. **Inside Docker**: System username is controlled by `USER` environment variable
2. **PostgreSQL User**: `postgres` user exists with CREATEDB privileges
3. **Connection**: Uses Docker internal network (`postgres-test:5432` not `localhost:5434`)
4. **No Host Interference**: Windows username "aless" is irrelevant inside Docker

## ⚠️ Important Notes

1. **First Build**: The `npm ci` step will take ~7-8 minutes (normal)
2. **Subsequent Builds**: Much faster due to Docker layer caching
3. **Volume Mounts**: Code is mounted, so changes are reflected immediately
4. **node_modules**: Excluded from volume mount (uses container's node_modules)

## 🐛 Troubleshooting

### Issue: "password authentication failed"
**Check**: Verify `USER=postgres` is set in both Dockerfile and docker-compose
**Fix**: Rebuild containers: `docker-compose -f docker-compose.test.yml build --no-cache`

### Issue: "permission denied to create database"
**Check**: Verify postgres user has CREATEDB in Docker PostgreSQL
**Fix**: 
```sql
docker exec medusa-test-postgres psql -U postgres -c "ALTER USER postgres WITH CREATEDB;"
```

### Issue: Tests can't connect to database
**Check**: Verify both containers are on same network
**Fix**: Use `postgres-test:5432` (service name) not `localhost:5434`

## 📝 Next Steps

1. **Build test runner image** (first time will be slow):
   ```powershell
   docker-compose -f docker-compose.test.yml build test-runner
   ```

2. **Run a single test** to verify:
   ```powershell
   docker-compose -f docker-compose.test.yml up -d postgres-test
   docker-compose -f docker-compose.test.yml run --rm test-runner npx jest --runInBand --forceExit integration-tests/http/health.spec.ts
   ```

3. **If successful, run full suite**:
   ```powershell
   docker-compose -f docker-compose.test.yml up test-runner
   ```

