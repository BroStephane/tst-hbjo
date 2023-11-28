export interface Product {
    id: number;             // Identifiant unique du produit
    name: string;           // Nom du produit
    brandId: number;        // Identifiant de la marque associée
    quantityInStock: number;// Quantité du produit en stock

}

import { initializeDatabase } from '../database';

export const getAllProducts = async (): Promise<Product[]> => {
    const db = await initializeDatabase();
    return db.all('SELECT * FROM products');
};

export const updateProductQuantity = async (productId: number, newQuantity: number): Promise<void> => {
    const db = await initializeDatabase();
    await db.run('UPDATE products SET stock = ? WHERE id = ?', [newQuantity, productId]);
};

