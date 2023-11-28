"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const splitCsvData_1 = require("./scripts/splitCsvData");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const brandRoutes_1 = __importDefault(require("./routes/brandRoutes"));
const app = (0, express_1.default)();
// Initialisation de la base de données
(0, database_1.initializeDatabase)().then(() => {
    console.log("Base de données initialisée");
    // Exécution du script de séparation des données CSV
    (0, splitCsvData_1.splitCsvData)().then(() => {
        console.log("Données CSV séparées");
    });
});
app.use(express_1.default.json());
const port = 3000; // Vous pouvez choisir un autre port si nécessaire
app.use('/api', productRoutes_1.default);
app.use('/api', brandRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map