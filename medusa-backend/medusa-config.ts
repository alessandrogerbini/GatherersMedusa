import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// Get connection config
// Note: connect_timeout in URL applies to socket establishment, not pool acquisition
// The real fix is in pool.acquireTimeoutMillis (Tarn.js config)
function getConnectionConfig() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set')
  }

  console.log('[DB Config] Using connectionString (pool timeouts handled by Tarn.js config)')
  
  // Use connectionString - simple and preserves SSL settings
  return {
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false,
    } : false,
  }
}

const dbConnectionConfig = getConnectionConfig()

// Create databaseDriverOptions object
// CRITICAL UNDERSTANDING: Knex uses Tarn.js for pooling
// Tarn.js expects acquireTimeoutMillis in pool object (NOT acquireConnectionTimeout at root)
// The 60s default we're seeing is Tarn's default, not Knex's
// Root-level acquireConnectionTimeout doesn't map to Tarn unless Medusa explicitly maps it
const databaseDriverOptions: any = {
  client: 'pg',
  // TARN.JS POOL CONFIGURATION (this is what actually matters)
  // Tarn.js is what enforces the timeout, not Knex directly
  pool: {
    min: 2, // Keep minimum connections warm
    max: 10, // Increased from 2 to prevent pool exhaustion
    idleTimeoutMillis: 30000, // Close idle connections after 30s
    acquireTimeoutMillis: 120000, // ⭐ CRITICAL: Tarn's timeout for acquiring connection (2 minutes)
    // This is what actually controls the 60s → 120s change we need
    createTimeoutMillis: 120000, // ⭐ CRITICAL: Tarn's timeout for creating new connection (2 minutes)
  },
  // Root-level acquireConnectionTimeout is kept as backup
  // But we rely on pool-level acquireTimeoutMillis (Tarn's actual config)
  acquireConnectionTimeout: 120000, // Backup - may not be applied by Medusa
  // Use connectionString (individual params don't preserve URL parameters)
  connection: dbConnectionConfig,
}

// Log final database driver options (without sensitive data)
console.log('[DB Config] Database driver options configured:')
console.log('[DB Config] Pool max:', databaseDriverOptions.pool.max)
console.log('[DB Config] Pool min:', databaseDriverOptions.pool.min)
console.log('[DB Config] ⭐ Tarn.js acquireTimeoutMillis:', databaseDriverOptions.pool.acquireTimeoutMillis, 'ms (this is what matters)')
console.log('[DB Config] ⭐ Tarn.js createTimeoutMillis:', databaseDriverOptions.pool.createTimeoutMillis, 'ms')
console.log('[DB Config] Root acquireConnectionTimeout:', databaseDriverOptions.acquireConnectionTimeout, 'ms (backup only)')

// Enhanced logging: Show full Knex config structure (for debugging)
const knexConfigForLogging = {
  client: databaseDriverOptions.client,
  pool: databaseDriverOptions.pool,
  acquireConnectionTimeout: databaseDriverOptions.acquireConnectionTimeout,
  connection: {
    ...databaseDriverOptions.connection,
    password: '***', // Mask password
  }
}
console.log('[DB Config] Full Knex config structure being passed to Medusa:')
console.log(JSON.stringify(knexConfigForLogging, null, 2))

module.exports = defineConfig({
  admin: {
    disable: true, // Disable admin dashboard in production
  },
  projectConfig: {
    // Provide databaseUrl for Medusa
    databaseUrl: process.env.DATABASE_URL,
    // Configure Knex with explicit timeout settings using individual parameters
    // This approach is more explicit and harder for Medusa to override
    databaseDriverOptions: databaseDriverOptions,
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
