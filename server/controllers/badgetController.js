import moment from 'moment'
import { findUser, createUser, updateUser, } from '../repositories/User' 
import { createNewBudget, updateBudget, publishBudget, excludeBudget, listBudgetPaginated } from '../repositories/Budget'
import axios from 'axios'

import {
  isValidEmail,
  isEmpty,
} from '../helpers/validations';

import {
  errorMessage, successMessage, status,
} from '../helpers/status';

/**
   * List Categories
   * @returns {object} reflection object
   */

const listCategories = async (req, res) => {
  const {data} = await axios('https://api.habitissimo.es/category/list/')
  res.status(200).send(data)
}

/**
   * List Subcategories
   * @returns {object} reflection object
   */

const listSubcategories = async (req, res) => {
  const {data} = await axios(`https://api.habitissimo.es/category/list/${req.params.id}`)
  res.status(200).send(data)
}

/**
   * List Budget Paginated
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */

  const listB = async (req, res) => {

    const email = req.query.email
    const page = req.query.page
    const limit = req.query.limit
    try {
      if (page < 1 || limit < 1) {
        errorMessage.error = 'Page and limit must be higher than 0 ✋';
        return res.status(status.bad).send(errorMessage);
      }
      const budgets = await listBudgetPaginated(email, page, limit)
      if (!budgets) {
        errorMessage.error = 'Unable to list budgets 😢';
        return res.status(status.bad).send(errorMessage);
      }
      const result = budgets
      return res.status(status.success).send(result)
    } catch (err) {
      return res.status(status.error).send(errorMessage);
    }
  }

/**
   * Create A Budget
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  
  const createB = async (req, res) => {
    try {
      const {
        title, description, category, subcategory, email, phone, address,
      } = req.body;
    
      const created_on = moment(new Date());

      if (isEmpty(description) || isEmpty(category) || isEmpty(email) || isEmpty(phone) || isEmpty(address)) {
        errorMessage.error = 'Description, category, email, phone and address field cannot be empty';
        return res.status(status.bad).send(errorMessage);
      }
      if (!isValidEmail(email)) {
        errorMessage.error = 'Please enter a valid Email';
        return res.status(status.bad).send(errorMessage);
      }

      let user = await findUser(email)
      if (user) {
        await updateUser(Object.assign(user, {phone, address}))
      } else{
        user = await createUser({email, phone, address, created_on})
      }

      const budget = await createNewBudget({ title, description, category, subcategory, user_id: user.id, created_on })
      if (!budget) {
        return res.status(status.bad).json({message: 'Unable to add budget'});
      }

      successMessage.message = 'Badget created! 🤠'
      res.status(status.success).send(Object.assign(successMessage, budget))
    } catch(err) {
      return res.status(status.error).send(errorMessage);
    }

  };

  /**
   * Update A Budget
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */

   const updateB = async (req, res) => {
     try {
       const { id, title, description, category } = req.body

       if (isEmpty(id)) {
        errorMessage.error = 'Budget id field cannot be empty';
        return res.status(status.bad).send(errorMessage);
       }

       if (isEmpty(title) && isEmpty(description) && isEmpty(category)) {
        successMessage.message = 'Nothing to update!'
        res.status(status.success).send(successMessage)
       }
       
       const budget = await updateBudget({id, title, description, category})
       if (!budget) {
        return res.status(status.bad).json({message: 'Unable to update budget'});
      }
      successMessage.message = 'Budget updated! 👽'
      res.status(status.success).send(successMessage)
     } catch(err) {
       errorMessage.error = err
      return res.status(status.bad).send(errorMessage);
     }
   }

     /**
   * Publish Budget
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */

  const publishB = async (req, res) => {
    try {
      const { id } = req.params

      if (isEmpty(id)) {
       errorMessage.error = 'Budget id field cannot be empty';
       return res.status(status.bad).send(errorMessage);
      }
      
      const budget = await publishBudget(id)
      if (!budget) {
       return res.status(status.bad).json({message: 'Unable to publish budget'});
     }
     successMessage.message = 'Budget published! 🥊'
     res.status(status.success).send(successMessage)
    } catch(err) {
      errorMessage.error = err
      return res.status(status.bad).send(errorMessage);
    }
  }

    /**
   * Exclude Budget
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */

  const excludeB = async (req, res) => {
    try {
      const { id } = req.params

      if (isEmpty(id)) {
       errorMessage.error = 'Budget id field cannot be empty';
       return res.status(status.bad).send(errorMessage);
      }
      
      const budget = await excludeBudget(id)
      if (!budget) {
       return res.status(status.bad).json({message: 'Unable to exclude budget 😱'});
     }
     successMessage.message = 'Budget excluded 🚫!'
     res.status(status.success).send(successMessage)
    } catch(err) {
      errorMessage.error = err
      return res.status(status.bad).send(errorMessage);
    }
  }


  export {
    createB,
    updateB,
    publishB,
    excludeB,
    listB,
    listCategories,
    listSubcategories
  }