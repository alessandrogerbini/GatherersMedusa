// Debug script to test connection exactly as test runner might
const { Client } = require('pg');
const dns = require('dns');

// Set IPv4 first (like NODE_OPTIONS)
dns.setDefaultResultOrder('ipv4first');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres@postgres-test:5432/postgres';

console.log('=== Connection Debug ===');
console.log('DATABASE_URL:', DATABASE_URL);
console.log('NODE_OPTIONS:', process.env.NODE_OPTIONS);
console.log('');

// Test DNS resolution
dns.lookup('postgres-test', { all: true }, (err, addresses) => {
  if (err) {
    console.error('DNS Error:', err);
    return;
  }
  console.log('DNS Resolution:');
  addresses.forEach(addr => {
    console.log(`  ${addr.address} (family: ${addr.family})`);
  });
  console.log('');

  // Try connection
  console.log('Attempting connection...');
  const client = new Client({ connectionString: DATABASE_URL });
  
  client.connect()
    .then(() => {
      console.log('✅ Connection successful!');
      return client.query('SELECT current_database(), version()');
    })
    .then(result => {
      console.log('✅ Query successful!');
      console.log('  Database:', result.rows[0].current_database);
      console.log('  Version:', result.rows[0].version.substring(0, 50));
      return client.end();
    })
    .then(() => {
      console.log('✅ Connection closed');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Connection failed!');
      console.error('  Code:', error.code);
      console.error('  Message:', error.message);
      console.error('  Stack:', error.stack);
      process.exit(1);
    });
});

