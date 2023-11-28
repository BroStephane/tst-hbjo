"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
sqlite3_1.default.verbose();
const connect = async () => {
    return (0, sqlite_1.open)({
        filename: 'data/database.sqlite',
        driver: sqlite3_1.default.Database
    });
};
const initializeDatabase = async () => {
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
};
exports.initializeDatabase = initializeDatabase;
async function importCsvData() {
    const db = await (0, exports.initializeDatabase)();
    // Vérifiez si les données ont déjà été importées
    const count = await db.get("SELECT COUNT(*) as count FROM products");
    if (count.count > 0) {
        console.log("Les données ont déjà été importées.");
        return;
    }
    // Lire et insérer les données des marques
    fs_1.default.createReadStream('data/Brand.csv')
        .pipe((0, csv_parser_1.default)())
        .on('data', async (row) => {
        await db.run("INSERT INTO brands (id, name) VALUES (?, ?)", [row.ID_MARQUE, row.NOM_MARQUE]);
    });
    // Lire et insérer les données des produits
    fs_1.default.createReadStream('data/Product.csv')
        .pipe((0, csv_parser_1.default)())
        .on('data', async (row) => {
        await db.run("INSERT INTO products (id, name, price, reference, brandId, stock) VALUES (?, ?, ?, ?, ?, ?)", [row.ID_PRODUCT, row.NOM, row.PRICE, row.REFERENCE, row.ID_BRAND, row.STOCK]);
    });
    console.log("Données importées avec succès.");
}
importCsvData();
//# sourceMappingURL=database.js.map