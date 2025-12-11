// Diagnostic script to test how Medusa test runner might be connecting
const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres@postgres-test:5432/postgres';

console.log('=== Medusa Test Runner Diagnostic ===\n');
console.log('DATABASE_URL:', DATABASE_URL);
console.log('');

// Test 1: Parse connection string
const url = require('url');
const parsed = url.parse(DATABASE_URL);
console.log('Parsed URL:');
console.log('  Protocol:', parsed.protocol);
console.log('  Host:', parsed.host);
console.log('  Hostname:', parsed.hostname);
console.log('  Port:', parsed.port);
console.log('  Path:', parsed.pathname);
console.log('  Auth:', parsed.auth);
console.log('');

// Test 2: Try different connection methods
async function testConnections() {
  console.log('=== Connection Tests ===\n');

  // Test 2a: Connection string
  try {
    console.log('Test 1: Using connection string directly...');
    const client1 = new Client({ connectionString: DATABASE_URL });
    await client1.connect();
    const result1 = await client1.query('SELECT current_database(), version()');
    console.log('✅ Success! Database:', result1.rows[0].current_database);
    await client1.end();
  } catch (e) {
    console.log('❌ Failed:', e.message);
  }

  // Test 2b: Connection object
  try {
    console.log('\nTest 2: Using connection object...');
    const client2 = new Client({
      host: parsed.hostname,
      port: parseInt(parsed.port || '5432'),
      database: parsed.pathname?.substring(1) || 'postgres',
      user: parsed.auth || 'postgres',
      password: '',
    });
    await client2.connect();
    const result2 = await client2.query('SELECT current_database()');
    console.log('✅ Success! Database:', result2.rows[0].current_database);
    await client2.end();
  } catch (e) {
    console.log('❌ Failed:', e.message);
  }

  // Test 3: Create test database (what test runner does)
  try {
    console.log('\nTest 3: Creating test database (simulating test runner)...');
    const client3 = new Client({ connectionString: DATABASE_URL });
    await client3.connect();
    
    const testDbName = `medusa-test-${Date.now()}`;
    console.log(`Creating database: ${testDbName}`);
    
    await client3.query(`CREATE DATABASE "${testDbName}"`);
    console.log('✅ Test database created!');
    
    // Connect to new database
    const newUrl = DATABASE_URL.replace(/\/[^\/]+$/, `/${testDbName}`);
    const client4 = new Client({ connectionString: newUrl });
    await client4.connect();
    const result4 = await client4.query('SELECT current_database()');
    console.log('✅ Connected to test database:', result4.rows[0].current_database);
    
    await client4.end();
    await client3.query(`DROP DATABASE "${testDbName}"`);
    console.log('✅ Test database dropped!');
    await client3.end();
  } catch (e) {
    console.log('❌ Failed:', e.message);
    console.log('Stack:', e.stack);
  }
}

testConnections().catch(console.error);

