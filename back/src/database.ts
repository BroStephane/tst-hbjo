import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();

const connect = async () => {
    return open({
        filename: 'back/data/database.sqlite',
        driver: sqlite3.Database
    });
};

export const initializeDatabase = async () => {
    const db = await connect();
    // Ici, vous pouvez exécuter des commandes SQL pour créer des tables si elles n'existent pas
    // Exemple :
    // await db.exec(`CREATE TABLE IF NOT EXISTS products (...);`);
    // await db.exec(`CREATE TABLE IF NOT EXISTS brands (...);`);

    return db;
};
