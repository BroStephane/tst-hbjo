// src/controllers/brandController.ts
import { Request, Response } from 'express';
import { getAllBrands } from '../models/Brand';

export const getBrands = async (req: Request, res: Response) => {
    try {
        const brands = await getAllBrands();
        res.json(brands);
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des marques");
    }
};
