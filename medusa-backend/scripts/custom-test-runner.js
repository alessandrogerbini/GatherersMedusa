/**
 * Custom test runner that properly handles database connections with passwords
 * This bypasses the @medusajs/test-utils database creation issue
 */

const { execSync } = require('child_process');
const pg = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:1401@localhost:5433/medusa-backend';
const TEST_DB_PREFIX = 'medusa-test-';

// Parse DATABASE_URL
function parseDatabaseUrl(url) {
  const parsed = new URL(url);
  return {
    user: parsed.username,
    password: parsed.password,
    host: parsed.hostname,
    port: parsed.port,
    database: parsed.pathname.slice(1),
    connectionString: url
  };
}

// Create test database
async function createTestDatabase() {
  const config = parseDatabaseUrl(DATABASE_URL);
  const testDbName = `${TEST_DB_PREFIX}${Date.now()}`;
  
  console.log(`Creating test database: ${testDbName}`);
  
  // Connect to postgres database to create test database
  const adminClient = new pg.Client({
    user: config.user,
    password: config.password,
    host: config.host,
    port: config.port,
    database: 'postgres'
  });
  
  try {
    await adminClient.connect();
    await adminClient.query(`CREATE DATABASE "${testDbName}"`);
    await adminClient.end();
    console.log(`Test database created: ${testDbName}`);
    return testDbName;
  } catch (error) {
    console.error('Error creating test database:', error.message);
    throw error;
  }
}

// Drop test database
async function dropTestDatabase(dbName) {
  const config = parseDatabaseUrl(DATABASE_URL);
  
  const adminClient = new pg.Client({
    user: config.user,
    password: config.password,
    host: config.host,
    port: config.port,
    database: 'postgres'
  });
  
  try {
    await adminClient.connect();
    await adminClient.query(`DROP DATABASE IF EXISTS "${dbName}"`);
    await adminClient.end();
    console.log(`Test database dropped: ${dbName}`);
  } catch (error) {
    console.error('Error dropping test database:', error.message);
  }
}

// Main execution
async function runTests() {
  let testDbName = null;
  
  try {
    // Create test database
    testDbName = await createTestDatabase();
    
    // Set environment variable for test database with password
    const testDbUrl = DATABASE_URL.replace(/\/[^\/]+$/, `/${testDbName}`);
    process.env.DATABASE_URL = testDbUrl;
    
    console.log(`Running tests with database: ${testDbName}`);
    console.log(`DATABASE_URL: ${testDbUrl}`);
    
    // Update all test files to use this database URL
    // For now, we'll pass it via environment and hope test runner uses it
    
    // Run jest with specific test file
    const testFile = process.argv[2] || 'integration-tests/http/health.spec.ts';
    execSync(`npx jest ${testFile} --runInBand --forceExit`, {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: testDbUrl,
        TEST_TYPE: process.env.TEST_TYPE || 'integration:http',
        NODE_OPTIONS: '--experimental-vm-modules'
      }
    });
    
  } catch (error) {
    console.error('Test execution failed:', error.message);
    process.exit(1);
  } finally {
    // Clean up test database
    if (testDbName) {
      await dropTestDatabase(testDbName);
    }
  }
}

runTests();

