"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductStock = exports.getProducts = void 0;
const Product_1 = require("../models/Product");
const getProducts = async (req, res) => {
    try {
        const products = await (0, Product_1.getAllProducts)();
        res.json(products);
    }
    catch (error) {
        res.status(500).send("Erreur lors de la récupération des produits");
    }
};
exports.getProducts = getProducts;
const updateProductStock = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { stock } = req.body;
        await (0, Product_1.updateProductQuantity)(productId, stock);
        res.status(200).send('Quantité du produit mise à jour');
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour de la quantité du produit");
    }
};
exports.updateProductStock = updateProductStock;
//# sourceMappingURL=productController.js.map