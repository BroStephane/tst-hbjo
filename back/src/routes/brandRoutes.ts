import express from 'express';
import * as brandController from '../controllers/brandController';

const router = express.Router();

router.get('/brands', brandController.getBrands);

export default router;