const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const originalCsvPath = 'data/produits_test.csv'; // Assurez-vous que ce chemin est correct

let brands = new Map();
let products = [];
let brandCounter = 1;

fs.createReadStream(originalCsvPath)
    .pipe(csv({ separator: ';', headers: ['nom', 'prix', 'reference', 'nom_marque', 'stock'] }))
    .on('data', (row) => {
        if (!brands.has(row.nom_marque)) {
            brands.set(row.nom_marque, brandCounter++);
        }

        products.push({
            id_product: products.length + 1,
            nom: row.nom,
            price: row.prix,
            reference: row.reference,
            id_brand: brands.get(row.nom_marque),
            stock: row.stock
        });
    })
    .on('end', () => {
        const csvWriterBrands = createCsvWriter({
            path: 'data/Brand.csv',
            header: [
                { id: 'id_marque', title: 'ID_MARQUE' },
                { id: 'nom_marque', title: 'NOM_MARQUE' }
            ]
        });

        const brandData = Array.from(brands).map(([nom_marque, id_marque]) => ({ id_marque, nom_marque }));
        csvWriterBrands.writeRecords(brandData).then(() => console.log('Brand.csv écrit avec succès'));

        const csvWriterProducts = createCsvWriter({
            path: 'data/Product.csv',
            header: [
                { id: 'id_product', title: 'ID_PRODUCT' },
                { id: 'nom', title: 'NOM' },
                { id: 'price', title: 'PRICE' },
                { id: 'reference', title: 'REFERENCE' },
                { id: 'id_brand', title: 'ID_BRAND' },
                { id: 'stock', title: 'STOCK' }
            ]
        });

        csvWriterProducts.writeRecords(products).then(() => console.log('Product.csv écrit avec succès'));
    });
