import express from 'express';

import { createB, updateB, publishB } from '../controllers/badgetController';

const router = express.Router();

router.post('/budget', createB);
router.put('/budget', updateB);
router.put('/budget/publish', publishB)

export default router;