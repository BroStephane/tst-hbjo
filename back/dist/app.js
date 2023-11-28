"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const brandRoutes_1 = __importDefault(require("./routes/brandRoutes"));
const app = (0, express_1.default)();
// Initialisation de la base de données
(0, database_1.initializeDatabase)().then(() => {
    console.log("Base de données initialisée");
});
app.use(express_1.default.json());
const port = 3000; // Vous pouvez choisir un autre port si nécessaire
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001' // L'URL de votre front-end
}));
app.use('/api', productRoutes_1.default);
app.use('/api', brandRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map