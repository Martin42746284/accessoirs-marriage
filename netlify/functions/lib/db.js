import { Pool } from 'pg';

let pool = null;

export async function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
  }
  return pool;
}

export async function query(text, params) {
  const pool = await getPool();
  const result = await pool.query(text, params);
  return result;
}

export async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

// Helper pour les réponses CORS
export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };
}

// Helper pour répondre avec CORS
export function createResponse(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders(),
    body: JSON.stringify(body),
  };
}

// Helper pour les erreurs
export function createErrorResponse(statusCode, message) {
  return createResponse(statusCode, { error: message });
}
