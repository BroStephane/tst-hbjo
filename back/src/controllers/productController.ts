// src/controllers/productController.ts
import { Request, Response } from 'express';
import { getAllProducts, updateProductQuantity } from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des produits");
    }
};

export const updateProductStock = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.id);
        const { stock } = req.body;
        await updateProductQuantity(productId, stock);
        res.status(200).send('Quantité du produit mise à jour');
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour de la quantité du produit");
    }
};
