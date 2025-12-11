import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: {
      connection: {
        ssl: process.env.NODE_ENV === 'production' ? {
          rejectUnauthorized: false,
        } : false,
        // Connection pool settings for Render
        pool: {
          min: 0,
          max: 10,
          idleTimeoutMillis: 30000,
          acquireTimeoutMillis: 60000, // Increase timeout for Render network
        },
        // Connection timeout
        connectionTimeoutMillis: 60000, // 60 seconds
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
