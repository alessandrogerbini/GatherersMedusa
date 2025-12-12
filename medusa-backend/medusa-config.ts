import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// Parse DATABASE_URL into individual connection parameters
// This approach is more explicit and harder for Medusa to override
function parseDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set')
  }

  try {
    // Parse the URL
    const url = new URL(databaseUrl)
    
    // Extract connection parameters
    const config: any = {
      host: url.hostname,
      port: parseInt(url.port || '5432', 10),
      database: url.pathname.slice(1), // Remove leading '/'
      user: url.username,
      password: url.password,
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false,
      } : false,
      // Explicit connection timeout (in milliseconds) - 2 minutes
      connectionTimeoutMillis: 120000,
    }

    return config
  } catch (error) {
    // Fallback: if URL parsing fails, use connectionString
    console.warn('Failed to parse DATABASE_URL, using connectionString fallback:', error)
    return {
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false,
      } : false,
      connectionTimeoutMillis: 120000,
    }
  }
}

const dbConnectionConfig = parseDatabaseUrl()

module.exports = defineConfig({
  projectConfig: {
    // Provide databaseUrl for Medusa
    databaseUrl: process.env.DATABASE_URL,
    // Configure Knex with explicit timeout settings using individual parameters
    // This approach is more explicit and harder for Medusa to override
    databaseDriverOptions: {
      client: 'pg',
      // Reduced pool size to prevent exhaustion (max: 2)
      // Failed connections won't fill up the pool as quickly
      pool: {
        min: 0,
        max: 2, // Reduced from 10 to prevent pool exhaustion
        idleTimeoutMillis: 30000,
        acquireTimeoutMillis: 120000, // 2 minutes - CRITICAL
        createTimeoutMillis: 120000, // 2 minutes - CRITICAL
      },
      // Use individual connection parameters instead of connectionString
      // This is more explicit and harder for Medusa to override
      connection: dbConnectionConfig,
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
