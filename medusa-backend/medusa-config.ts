import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    // Use connection object instead of URL for better control
    databaseDriverOptions: {
      client: 'pg',
      connection: process.env.DATABASE_URL ? undefined : {
        host: process.env.DB_HOST || 'dpg-d4tgtpemcj7s73bsdaig-a',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'medusabackend',
        user: process.env.DB_USER || 'medusabackend_user',
        password: process.env.DB_PASSWORD,
        ssl: process.env.NODE_ENV === 'production' ? {
          rejectUnauthorized: false,
        } : false,
      },
      // Pool settings at root level (not in connection)
      pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 30000,
        acquireTimeoutMillis: 120000, // 2 minutes for Render
        createTimeoutMillis: 120000, // 2 minutes for initial connection
      },
      // Connection timeout
      connectionTimeoutMillis: 120000, // 2 minutes
    },
    // Still provide databaseUrl for Medusa to parse
    databaseUrl: process.env.DATABASE_URL,
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
