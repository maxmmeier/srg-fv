import mysql, { Pool, PoolOptions } from 'mysql2/promise';

export function getConnection(): Pool {
  const access: PoolOptions = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    timezone: '+00:00',
  };

  const connection = mysql.createPool(access);

  return connection;
}
