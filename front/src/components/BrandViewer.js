import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrandViewer = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/brands')
            .then(response => setBrands(response.data))
            .catch(error => console.error('Erreur lors du chargement des marques', error));
    }, []);

    return (
        <div>
            <h2>Voir les Marques</h2>
            <ul>
                {brands.map(brand => (
                    <li key={brand.id}>{brand.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default BrandViewer;
