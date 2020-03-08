import express from 'express';
import axios from 'axios'

import { createB, updateB, publishB, excludeB, listB } from '../controllers/badgetController';

const router = express.Router();

//GET
router.get('/budget', listB)
router.get('/budget/categories', async (req, res) => {
  const {data} = await axios('https://api.habitissimo.es/category/list/')
  res.status(200).send(data)
})
router.get('/budget/subcategories/:id', async (req, res) => {
  const {data} = await axios(`https://api.habitissimo.es/category/list/${req.params.id}`)
  res.status(200).send(data)
})

//POST
router.post('/budget', createB);

//PUT
router.put('/budget', updateB);
router.put('/budget/publish', publishB)
router.put('/budget/exclude', excludeB)

export default router;