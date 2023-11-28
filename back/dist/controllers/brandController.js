"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrands = void 0;
const Brand_1 = require("../models/Brand");
const getBrands = async (req, res) => {
    try {
        const brands = await (0, Brand_1.getAllBrands)();
        res.json(brands);
    }
    catch (error) {
        res.status(500).send("Erreur lors de la récupération des marques");
    }
};
exports.getBrands = getBrands;
//# sourceMappingURL=brandController.js.map