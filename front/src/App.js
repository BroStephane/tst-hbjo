import React, { useState } from 'react';
import StockManager from './components/StockManager';
import BrandViewer from './components/BrandViewer';

const App = () => {
  const [activeTab, setActiveTab] = useState('stock');

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab('stock')}>Gérer le Stock</button>
        <button onClick={() => setActiveTab('brands')}>Voir les Marques</button>
      </nav>
      {activeTab === 'stock' ? <StockManager /> : <BrandViewer />}
    </div>
  );
};

export default App;
