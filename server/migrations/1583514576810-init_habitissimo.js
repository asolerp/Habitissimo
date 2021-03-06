'use strict'
const db = require('../db/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
    CREATE TYPE sbadget AS ENUM ('pending', 'published', 'excluded');
  `)

  await client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY,
    email text not NULL,
    phone text not NULL,
    address text not NULL,
    created_on TIMESTAMP NOT NULL
  );

  CREATE TABLE IF NOT EXISTS budget (
    id uuid PRIMARY KEY,
    title text,
    description text not NULL,
    category text,
    subcategory text,
    status sbadget,
    user_id uuid REFERENCES users (id) ON DELETE CASCADE,
    created_on TIMESTAMP NOT NULL
  );
  `);

  await client.query(`
  CREATE INDEX users_email on users (email);
  `);

  await client.release(true);
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE budget;
  DROP TABLE users;
  DROP TYPE sbadget;

  `);

  await client.release(true);
  next()
}
