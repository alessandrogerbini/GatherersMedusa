# Database Connection Fix - ECONNREFUSED Solution

## 🔍 Root Cause Identified

The error log shows:
```
"code":"ECONNREFUSED"
"internalConnectMultiple" (node:net:1122:18)
```

**Root Cause**: Node.js is trying to connect via both IPv4 and IPv6 addresses. The IPv6 connection is being refused, causing the `internalConnectMultiple` error.

## ✅ Solution Applied

### 1. Force IPv4 DNS Resolution

Added `--dns-result-order=ipv4first` to `NODE_OPTIONS` in:
- `docker-compose.test.yml`
- `Dockerfile.test`

This forces Node.js to prefer IPv4 addresses, avoiding the IPv6 connection attempt that's being refused.

### 2. Updated Files

**docker-compose.test.yml**:
```yaml
environment:
  NODE_OPTIONS: --experimental-vm-modules --dns-result-order=ipv4first
```

**Dockerfile.test**:
```dockerfile
ENV NODE_OPTIONS=--experimental-vm-modules --dns-result-order=ipv4first
```

## 🧪 Testing

After rebuilding the test runner image, run:

```powershell
docker-compose -f docker-compose.test.yml build test-runner
docker-compose -f docker-compose.test.yml run --rm test-runner npx jest --runInBand --forceExit integration-tests/http/health.spec.ts
```

## 📋 Why This Works

1. **IPv6 Issue**: Docker containers often resolve to both IPv4 and IPv6
2. **Connection Refusal**: PostgreSQL might not be listening on IPv6, or Docker network doesn't route IPv6
3. **Node.js Behavior**: `internalConnectMultiple` tries both addresses, fails if one is refused
4. **Fix**: Force IPv4-first resolution prevents IPv6 connection attempt

## 🔗 References

- [Node.js DNS Resolution](https://nodejs.org/api/cli.html#--dns-result-orderorder)
- [Docker Networking](https://docs.docker.com/network/)

