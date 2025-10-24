# Medusa V2 Installation - Quick Reference Card

**🚀 For PC startup guide, see**: `STARTUP_GUIDE.md`

---

## 🔑 Critical Information

### PostgreSQL Connection
```
Host:     localhost
Port:     5433  ⚠️ NOT 5432!
Username: postgres
Password: (empty/blank)
```

### Connection String
```
postgres://postgres:@localhost:5433/medusa-backend
```

### PostgreSQL Executable
```powershell
"G:\FastGrams program files\Postgresql 17\bin\psql.exe"
```

---

## 🚀 Installation Method

**RECOMMENDED**: ✅ **Standard Installation** (Non-Docker)  
**Reason**: All prerequisites verified, simpler setup, better for development

### Standard Installation Command
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website"
npx create-medusa-app@latest medusa-backend --db-url "postgres://postgres:@localhost:5433/medusa-backend" --no-browser --seed
```

### Docker Installation (Alternative)
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website"
# Create Dockerfile and docker-compose.yml first
docker compose up -d
```

**See**: `INSTALLATION_RECOMMENDATION.md` for detailed comparison

---

## 🔍 Quick Tests

### Test PostgreSQL
```powershell
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\psql.exe" -U postgres -h localhost -p 5433 -c "SELECT version();"
```

### Check Service
```powershell
Get-Service postgresql-x64-17
```

### Test Port
```powershell
netstat -ano | Select-String "5433"
```

---

## 🆘 Emergency Commands

### Restart PostgreSQL
```powershell
Restart-Service postgresql-x64-17
```

### Reset Database (DESTRUCTIVE)
```powershell
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\dropdb.exe" -U postgres -h localhost -p 5433 medusa-backend --if-exists
$env:PGPASSWORD=""; & "G:\FastGrams program files\Postgresql 17\bin\createdb.exe" -U postgres -h localhost -p 5433 medusa-backend
```

### Clean NPM Install
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
rm -r node_modules
npm cache clean --force
npm install
```

---

## 📂 Paths

| Component | Path |
|-----------|------|
| Workspace | `G:\FastGrams program files\GG Medusa V2 website` |
| PostgreSQL | `G:\FastGrams program files\Postgresql 17` |
| Node.js | `G:\FastGrams program files\Node js` |
| Git | `G:\Git` |

---

## 🌐 Default Ports

| Service | Port |
|---------|------|
| Medusa Backend | 9000 |
| Medusa Admin | 9000/app |
| Next.js Storefront | 8000 |
| PostgreSQL 17 | 5433 ⚠️ |
| PostgreSQL 12 (Odoo) | 5432 |

---

## ⚠️ Common Mistakes to Avoid

1. ❌ Using port 5432 (that's Odoo's PostgreSQL!)
2. ❌ Forgetting quotes around paths with spaces
3. ❌ Trying to use a password (it's blank!)
4. ❌ Running commands from wrong directory

---

## ✅ Pre-Installation Checklist

- [ ] PostgreSQL service running
- [ ] Node.js v20+ installed
- [ ] Terminal in correct directory
- [ ] Using port 5433
- [ ] Connection string ready

---

**Last Updated**: Thursday, October 23, 2025

