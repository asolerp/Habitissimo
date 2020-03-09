import sql from 'sql-template-strings'
import uuid from 'uuid/v4'
import db from '../db/db'

const createUser = async(user) => {
  const { email, phone, address, created_on } = user
  try {
    const {rows} = await db.query(sql`
    INSERT INTO users (id, email, phone, address, created_on)
      VALUES (${uuid()}, ${email}, ${phone}, ${address}, ${created_on})
      RETURNING id, email;
    `);
  
    const [user] = rows;
    return user;
  } catch (error) {
    if (error.constraint === 'users_email_key') {
      return null;
    }
    throw error;
  }
}

const updateUser = async(user) => {
  const { id, phone, address } = user

  try {
    const { rows } = await db.query(sql`
      UPDATE users 
      SET phone = ${phone},
          address = ${address}
      WHERE id = ${id}
    `)
    const [user] = rows;
    return user;
  } catch(error) {
    throw error;
  }
}

const findUser = async (email) => {

  const {rows} = await db.query(sql`
  SELECT * FROM users WHERE email=${email} LIMIT 1;
  `);
  return rows[0];
}

export {
 createUser,
 updateUser,
 findUser
};