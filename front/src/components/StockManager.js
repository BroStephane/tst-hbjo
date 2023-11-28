import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockManager = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error('Erreur lors du chargement des produits', error));
    }, []);

    const handleStockChange = (id, newStock) => {
        axios.put(`http://localhost:3000/api/products/${id}`, { stock: newStock })
            .then(() => {
                setProducts(products.map(product =>
                    product.id === id ? { ...product, stock: newStock } : product
                ));
            })
            .catch(error => console.error('Erreur lors de la mise à jour du stock', error));
    };

    return (
        <div>
            <h2>Gérer le Stock</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Marque</th>
                        <th>Prix</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.brandName}</td> {/* Ajout de la colonne Marque */}
                            <td>{product.price}</td>
                            <td>
                                <input
                                    type="number"
                                    value={product.stock}
                                    onChange={(e) => handleStockChange(product.id, e.target.value)}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleStockChange(product.id, product.stock)}>
                                    Mettre à jour
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockManager;
