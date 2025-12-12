import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    // Provide databaseUrl for Medusa
    databaseUrl: process.env.DATABASE_URL,
    // Configure Knex with explicit timeout settings (URL parameters don't work)
    databaseDriverOptions: {
      client: 'pg',
      // Pool settings with 2-minute timeouts
      pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 30000,
        acquireTimeoutMillis: 120000, // 2 minutes - CRITICAL
        createTimeoutMillis: 120000, // 2 minutes - CRITICAL
      },
      // Connection settings with explicit timeout
      connection: {
        // Use connectionString from DATABASE_URL
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? {
          rejectUnauthorized: false,
        } : false,
        // Explicit connection timeout (in milliseconds)
        connectionTimeoutMillis: 120000, // 2 minutes - CRITICAL
      },
    },
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
