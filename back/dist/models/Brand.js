"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBrands = void 0;
const database_1 = require("../database");
const getAllBrands = async () => {
    const db = await (0, database_1.initializeDatabase)();
    return db.all('SELECT * FROM brands');
};
exports.getAllBrands = getAllBrands;
//# sourceMappingURL=Brand.js.map