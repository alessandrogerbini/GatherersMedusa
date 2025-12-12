import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    // Use only databaseUrl - timeout should be in URL query parameters
    // Format: postgresql://user:pass@host/db?sslmode=require&connect_timeout=120
    databaseUrl: process.env.DATABASE_URL,
    // Removed databaseDriverOptions - Medusa v2 might not use them properly
    // Timeout should be set via DATABASE_URL query parameter: &connect_timeout=120
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      resolve: "./src/modules/notification",
    },
    {
      resolve: "./src/modules/new-client-promotions",
    },
  ],
})
