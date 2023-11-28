import fs from 'fs';
import csv from 'csv-parser';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();

const connect = async () => {
  return open({
    filename: 'data/database.sqlite',
    driver: sqlite3.Database
  });
};

export const initializeDatabase = async () => {
  const db = await connect();

  // Création de la table brands
  await db.exec(`
    CREATE TABLE IF NOT EXISTS brands (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);

  // Création de la table products
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL,
      reference TEXT,
      brandId INTEGER,
      stock INTEGER,
      FOREIGN KEY (brandId) REFERENCES brands(id)
    );
  `);

  return db;
}

async function importCsvData() {
  const db = await initializeDatabase();

  // Vérifiez si les données ont déjà été importées
  const count = await db.get("SELECT COUNT(*) as count FROM products");
  if (count.count > 0) {
    console.log("Les données ont déjà été importées.");
    return;
  }

  // Lire et insérer les données des marques
  fs.createReadStream('data/Brand.csv')
    .pipe(csv())
    .on('data', async (row) => {
      await db.run("INSERT INTO brands (id, name) VALUES (?, ?)", [row.ID_MARQUE, row.NOM_MARQUE]);
    });

  // Lire et insérer les données des produits
  fs.createReadStream('data/Product.csv')
    .pipe(csv())
    .on('data', async (row) => {
      await db.run("INSERT INTO products (id, name, price, reference, brandId, stock) VALUES (?, ?, ?, ?, ?, ?)",
        [row.ID_PRODUCT, row.NOM, row.PRICE, row.REFERENCE, row.ID_BRAND, row.STOCK]);
    });

  console.log("Données importées avec succès.");
}

importCsvData();