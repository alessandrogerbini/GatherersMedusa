import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    // Use connection object only - remove databaseUrl to avoid conflicts
    databaseDriverOptions: {
      client: 'pg',
      // Pool settings at root level for Knex (CRITICAL - must be at root)
      pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 30000,
        acquireTimeoutMillis: 120000, // 2 minutes for Render network latency
        createTimeoutMillis: 120000, // 2 minutes for initial connection
      },
      // Use connectionString - Medusa will use this instead of databaseUrl
      connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? {
          rejectUnauthorized: false,
        } : false,
        // Connection timeout (in milliseconds)
        connectionTimeoutMillis: 120000, // 2 minutes
      },
    },
    // REMOVED databaseUrl - let connection object handle it to ensure pool settings apply
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
