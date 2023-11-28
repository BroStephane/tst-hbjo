import express from 'express';
import { initializeDatabase } from './database';
import { splitCsvData } from './scripts/splitCsvData';
import productRoutes from './routes/productRoutes';
import brandRoutes from './routes/brandRoutes';

const app = express();

// Initialisation de la base de données
initializeDatabase().then(() => {
    console.log("Base de données initialisée");

    // Exécution du script de séparation des données CSV
    splitCsvData().then(() => {
        console.log("Données CSV séparées");
    });
});

app.use(express.json());
const port = 3000; // Vous pouvez choisir un autre port si nécessaire


app.use('/api', productRoutes);
app.use('/api', brandRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
