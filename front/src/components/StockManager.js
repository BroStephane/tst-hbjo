import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Décommentez si vous utilisez axios

const StockManager = () => {
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        // Fonction pour charger les données du stock
        const loadStockData = async () => {
            try {
                // Utilisation de fetch
                const response = await fetch('/api/products');
                const data = await response.json();
                setStockData(data);

                // Ou utilisez axios
                // const { data } = await axios.get('/api/products');
                // setStockData(data);
            } catch (error) {
                console.error("Erreur lors du chargement des données du stock", error);
            }
        };

        loadStockData();
    }, []);

    return (
        <div>
            <h2>Gérer le Stock</h2>
            <table>
                {/* Entêtes du tableau */}
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prix</th>
                        {/* Autres entêtes... */}
                    </tr>
                </thead>
                {/* Données du tableau */}
                <tbody>
                    {stockData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            {/* Autres données... */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockManager;
