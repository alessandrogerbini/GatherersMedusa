# GG Medusa V2 Website

**Full-stack e-commerce platform powered by Medusa V2**

---

## 🚀 Quick Start

### Full Stack Startup (Backend + Storefront)

⚠️ **CRITICAL**: Backend must be fully ready before storefront starts!  
**⏱️ Total startup time**: 70-90 seconds (patience required!)

**🎯 One-Click Options:**

1. **Double-click**: `Start-MedusaFull.ps1`

2. **From terminal** (any directory):
```powershell
& "G:\FastGrams program files\GG Medusa V2 website\Start-MedusaFull.ps1"
```

3. **Short version** (from project directory):
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website"
.\start.ps1
```

**This will:**
- ✅ Check and start PostgreSQL
- ✅ Start Medusa Backend (API + Admin) + **wait 40s & verify**
- ✅ Start Next.js Storefront (only after backend ready) + **wait 30s**
- ✅ Open both admin and storefront in browser

**Manual Start** (Sequential - NOT parallel):
```powershell
# Step 1: Terminal 1 - Backend FIRST
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
npm run dev
# WAIT 40 seconds and verify: Invoke-WebRequest http://localhost:9000/app

# Step 2: Terminal 2 - Storefront AFTER backend ready
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-storefront"
npm run dev
# WAIT 30 seconds for Next.js to compile
```

**⚠️ Important**: Don't start both at once - storefront needs backend API ready!

---

### Backend Only

Double-click: **`Start-Medusa.ps1`** or run:
```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
npm run dev
```

---

## 🌐 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Admin Dashboard** | http://localhost:9000/app | Manage products, orders, customers |
| **Backend API** | http://localhost:9000 | REST API for backend operations |
| **Storefront** | http://localhost:8000 | Customer-facing e-commerce site |

---

## 🔐 Access Credentials

### Admin Dashboard
**URL**: http://localhost:9000/app

**Credentials**:
- **Email**: `admin@medusa.com`
- **Password**: `supersecret`

### Storefront
**URL**: http://localhost:8000

No login required for browsing. Customers can create accounts for checkout.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **`STARTUP_GUIDE.md`** ⭐ | Quick startup instructions (backend + storefront) |
| **`STARTUP_ISSUE_REPORT.md`** 🔍 | Analysis of timing issues & solutions |
| **`RESTORE_INSTRUCTIONS.md`** 🆘 | Quick restore after PC restart |
| **`STOREFRONT_SETUP.md`** 🛍️ | Storefront configuration and features |
| **`INSTALLATION_COMPLETE.md`** | Complete backend installation summary |
| **`QUICK_REFERENCE.md`** | Quick command reference |
| **`KNOWN_ISSUES_AND_SOLUTIONS.md`** | Troubleshooting guide |
| **`POSTGRESQL_VERIFICATION.md`** | Database verification details |
| **`PREREQUISITES_SETUP.md`** | Prerequisites documentation |
| **`INSTALLATION_RECOMMENDATION.md`** | Installation method comparison |
| **`WORKING_STATE_SNAPSHOT.md`** 📸 | Full system configuration snapshot |
| **`CONNECTION_VERIFIED.md`** | Backend-frontend connection proof |

---

## 🗂️ Project Structure

```
GG Medusa V2 website/
├── medusa-backend/              ← Medusa Backend
│   ├── src/
│   │   ├── admin/              ← Admin customizations
│   │   ├── api/                ← Custom API routes
│   │   ├── jobs/               ← Scheduled jobs
│   │   ├── modules/            ← Custom modules
│   │   └── workflows/          ← Custom workflows
│   ├── medusa-config.ts        ← Backend configuration
│   └── .env                    ← Backend environment variables
│
├── medusa-storefront/           ← Next.js Storefront
│   ├── src/
│   │   ├── app/                ← Next.js pages (App Router)
│   │   ├── modules/            ← Storefront components
│   │   ├── lib/                ← Utilities and data fetching
│   │   └── styles/             ← Styling
│   ├── next.config.js          ← Next.js configuration
│   └── .env.local              ← Storefront environment variables
│
├── Start-Medusa.ps1            ← Backend-only startup script
├── Start-MedusaFull.ps1        ← Full stack startup script
├── STARTUP_GUIDE.md            ← Daily startup guide
├── STOREFRONT_SETUP.md         ← Storefront documentation
└── [Other documentation files...]
```

---

## 🛠️ Common Commands

### Start/Stop Server
```powershell
# Start development server
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
npm run dev

# Stop server: Press Ctrl+C
```

### Database Management
```powershell
# Run migrations
npx medusa db:migrate

# Seed with demo data
npx medusa exec ./src/scripts/seed.ts

# Create admin user
npx medusa user -e email@example.com -p password
```

### PostgreSQL Management
```powershell
# Check status
Get-Service postgresql-x64-17

# Start service
Start-Service postgresql-x64-17

# Stop service
Stop-Service postgresql-x64-17
```

---

## 🔍 Important URLs

| Service | URL |
|---------|-----|
| **Admin Dashboard** | http://localhost:9000/app |
| **Backend API** | http://localhost:9000 |
| **Health Check** | http://localhost:9000/health |
| **Store API** | http://localhost:9000/store |

---

## ⚙️ System Information

### PostgreSQL Configuration
- **Host**: localhost
- **Port**: 5433 ⚠️ (NOT 5432!)
- **Database**: medusa-backend
- **Service**: postgresql-x64-17

### Node.js
- **Version**: v22.19.0
- **Location**: `G:\FastGrams program files\Node js\`

### Medusa
- **Version**: v2 (Latest)
- **Port**: 9000

---

## 🆘 Troubleshooting

### Server won't start?
1. Check PostgreSQL is running: `Get-Service postgresql-x64-17`
2. Check port 9000 is available: `netstat -ano | Select-String "9000"`
3. See **`KNOWN_ISSUES_AND_SOLUTIONS.md`** for detailed troubleshooting

### Can't access admin?
1. Verify server is running (should see "Server is ready on port: 9000")
2. Open http://localhost:9000/app in your browser
3. Try creating a new admin user: `npx medusa user -e test@test.com -p test123`

### Database issues?
1. Restart PostgreSQL: `Restart-Service postgresql-x64-17`
2. Test connection: See `POSTGRESQL_VERIFICATION.md`

---

## 🔗 Official Resources

- [Medusa Documentation](https://docs.medusajs.com/)
- [Medusa GitHub](https://github.com/medusajs/medusa)
- [Medusa Discord Community](https://discord.gg/medusajs)

---

## 📝 Installation Details

- **Installed**: Thursday, October 23, 2025
- **Method**: Standard Installation (Non-Docker)
- **Status**: ✅ Fully operational

---

## ⚠️ Important Notes

- PostgreSQL runs on **port 5433** (not the default 5432)
- Port 5432 is used by Odoo PostgreSQL 12
- Change admin password before production deployment
- Redis is using in-memory fake instance (install Redis for production)

---

**Need help?** Check the documentation files or see `STARTUP_GUIDE.md` for daily startup instructions.

