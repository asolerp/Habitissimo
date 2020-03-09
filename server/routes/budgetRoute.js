import express from 'express';

import { createB, updateB, publishB, excludeB, listB, listCategories, listSubcategories } from '../controllers/badgetController';

const router = express.Router();

//GET
router.get('/budget', listB)
router.get('/budget/categories', listCategories)
router.get('/budget/subcategories/:id', listSubcategories)

//POST
router.post('/budget', createB);

//PUT
router.put('/budget', updateB);
router.put('/budget/publish/:id', publishB)
router.put('/budget/exclude/:id', excludeB)

export default router;