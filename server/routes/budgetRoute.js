import express from 'express';

import { createB, updateB, publishB, excludeB, listB } from '../controllers/badgetController';

const router = express.Router();

//GET
router.get('/budget', listB)

//POST
router.post('/budget', createB);

//PUT
router.put('/budget', updateB);
router.put('/budget/publish', publishB)
router.put('/budget/exclude', excludeB)

export default router;