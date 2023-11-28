import express from 'express';
import * as productController from '../controllers/productController';

const router = express.Router();

router.get('/products', productController.getProducts);
router.put('/products/:id', productController.updateProductStock);

export default router;