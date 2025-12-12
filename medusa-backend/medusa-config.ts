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
      password: url.password ? '***' : undefined, // Mask password in logs
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false,
      } : false,
      // Note: connectionTimeoutMillis removed - relying on createTimeoutMillis in pool config
    }

    // Log connection config (without password) for diagnostics
    console.log('[DB Config] Parsed DATABASE_URL successfully')
    console.log('[DB Config] Host:', config.host)
    console.log('[DB Config] Port:', config.port)
    console.log('[DB Config] Database:', config.database)
    console.log('[DB Config] User:', config.user)
    console.log('[DB Config] SSL:', config.ssl)
    console.log('[DB Config] Connection timeout handled by pool.createTimeoutMillis')

    return config
  } catch (error) {
    // Fallback: if URL parsing fails, use connectionString
    console.warn('[DB Config] Failed to parse DATABASE_URL, using connectionString fallback:', error)
    return {
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false,
      } : false,
      // Note: connectionTimeoutMillis removed - relying on createTimeoutMillis in pool config
    }
  }
}

const dbConnectionConfig = parseDatabaseUrl()

// Log final database driver options (without sensitive data)
console.log('[DB Config] Database driver options configured:')
console.log('[DB Config] Pool max:', 2)
console.log('[DB Config] Pool min:', 0)
console.log('[DB Config] Acquire timeout:', 120000, 'ms')
console.log('[DB Config] Create timeout:', 120000, 'ms')

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
