import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './database';
import productRoutes from './routes/productRoutes';
import brandRoutes from './routes/brandRoutes';

const app = express();

// Initialisation de la base de données
initializeDatabase().then(() => {
    console.log("Base de données initialisée");

});

app.use(express.json());
const port = 3000; // Vous pouvez choisir un autre port si nécessaire
app.use(cors({
    origin: 'http://localhost:3001' // L'URL de votre front-end
}));



app.use('/api', productRoutes);
app.use('/api', brandRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
