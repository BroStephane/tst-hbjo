"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductQuantity = exports.getAllProducts = void 0;
const database_1 = require("../database");
const getAllProducts = async () => {
    const db = await (0, database_1.initializeDatabase)();
    return db.all('SELECT * FROM products');
};
exports.getAllProducts = getAllProducts;
const updateProductQuantity = async (productId, newQuantity) => {
    const db = await (0, database_1.initializeDatabase)();
    await db.run('UPDATE products SET stock = ? WHERE id = ?', [newQuantity, productId]);
};
exports.updateProductQuantity = updateProductQuantity;
//# sourceMappingURL=Product.js.map