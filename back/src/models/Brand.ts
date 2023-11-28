export interface Brand {
    id: number;             // Identifiant unique de la marque
    name: string;           // Nom de la marque
}

import { initializeDatabase } from '../database';

export const getAllBrands = async (): Promise<Brand[]> => {
    const db = await initializeDatabase();
    return db.all('SELECT * FROM brands');
};