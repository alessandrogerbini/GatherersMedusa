// Simple test to verify database connection
const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres@postgres-test:5432/postgres';

console.log('Testing connection with:', DATABASE_URL);

const client = new Client({
  connectionString: DATABASE_URL,
});

client.connect()
  .then(() => {
    console.log('✅ Connected successfully!');
    return client.query('SELECT version()');
  })
  .then((result) => {
    console.log('✅ Query successful:', result.rows[0].version);
    return client.query('CREATE DATABASE test_connection_check');
  })
  .then(() => {
    console.log('✅ Database creation successful!');
    return client.end();
  })
  .catch((error) => {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  });

