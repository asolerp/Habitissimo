import sql from 'sql-template-strings'
import uuid from 'uuid/v4'
import db from '../db/db'

import {
  isEmpty,
} from '../helpers/validations';

const STATUS_PENDING = "pending"
const STATUS_PUBLISHED = "published"

const getBudget = async(id) => {
  const {rows} = await db.query(sql`
  SELECT * FROM budget WHERE id=${id} LIMIT 1;
  `);
  return rows[0];
}

const createNewBudget = async(badget) => {
  const { title, description, category, subcategory, user_id, created_on } = badget
  try {
    const {rows} = await db.query(sql`
    INSERT INTO budget (id, title, description, category, subcategory, status, user_id, created_on)
      VALUES (${uuid()}, ${title}, ${description}, ${category}, ${subcategory}, ${STATUS_PENDING}, ${user_id}, ${created_on})
      RETURNING id;
    `);  
    const [budget] = rows;
    return budget
  } catch (error) {
    throw error;
  }
}

const updateBudget = async(budget) => {
  const { id, title, description, category } = budget
  try {

    const budgetToUpdate = await getBudget(id)
    if (!budgetToUpdate) {
      throw error;
    }

    if (budgetToUpdate.status !== STATUS_PENDING) {
      throw "Budget cannot be updated as status is not pending"
    }

    const query = sql`UPDATE budget`
    if (!isEmpty(title)) {
      query.append(sql` SET title=${title}`)
    }
    if (!isEmpty(description)) {
      query.append(sql`, description=${description}`)
    }
    if (!isEmpty(category)) {
      query.append(sql`, category=${category}`)
    }
    query.append(sql` WHERE id =${id} AND status=${STATUS_PENDING}`)
    query.append(sql` RETURNING id;`)

    const {rows} = await db.query(query.text, query.values);  
    const [budget] = rows;
    console.log("Budget", budget)
    return budget
  } catch (error) {
    throw error;
  }
}

const publishBudget = async(id) => {

  console.log("[[ID]]", id)

  try {
    const budgetToUpdate = await getBudget(id)
    console.log("[[BudgetToUpdate]]", budgetToUpdate)
    if (!budgetToUpdate) {
      throw error;
    }

    if (budgetToUpdate.status !== STATUS_PENDING) {
      throw "Budget cannot be published as status is not pending"
    }
    if (!budgetToUpdate.title || budgetToUpdate.title.length < 1) {
      throw "Budget cannot be published as title has not defined"
    }
    if (!budgetToUpdate.category || budgetToUpdate.category.length < 1) {
      throw "Budget cannot be published as category has not defined"
    }

    const query = sql`UPDATE budget`
    query.append(sql` SET status=${STATUS_PUBLISHED}`)
    query.append(sql` WHERE id=${id}`)
    query.append(sql` RETURNING id;`)

    const {rows} = await db.query(query.text, query.values);  
    const [budget] = rows;
    return budget
  } catch (error) {
    throw error;
  }
}


export {
  createNewBudget,
  updateBudget,
  publishBudget
};