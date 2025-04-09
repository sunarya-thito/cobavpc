const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,       // Endpoint RDS PostgreSQL
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // Opsi SSL jika diperlukan: ssl: { rejectUnauthorized: false },
});

module.exports = pool;
