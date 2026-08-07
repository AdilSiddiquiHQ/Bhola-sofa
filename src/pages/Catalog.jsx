import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import './Catalog.css';

const products = [
  {
    id: 1,
    name: 'The Signature Armchair',
    price: '$450',
    category: 'Armchairs',
    image: '/product1.jpg'
  },
  {
    id: 2,
    name: 'Classic Velvet Sofa',
    price: '$899',
    category: 'Sofas',
    image: '/hero.jpg'
  },
  {
    id: 3,
    name: 'Minimalist Lounge Chair',
    price: '$350',
    category: 'Chairs',
    image: '/product1.jpg'
  },
  {
    id: 4,
    name: 'Modern Earth Sectional',
    price: '$1200',
    category: 'Sofas',
    image: '/hero.jpg'
  },
  {
    id: 5,
    name: 'Oak Finish Side Table',
    price: '$150',
    category: 'Tables',
    image: '/product1.jpg'
  },
  {
    id: 6,
    name: 'Luxury Recliner',
    price: '$650',
    category: 'Armchairs',
    image: '/product1.jpg'
  }
];

const Catalog = () => {
  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title animate-fade-in">Our Collection</h1>
          <p className="catalog-subtitle">Explore our wide range of premium furniture designed for your comfort.</p>
        </div>
      </div>
      
      <div className="container section">
        <div className="catalog-filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Sofas</button>
          <button className="filter-btn">Armchairs</button>
          <button className="filter-btn">Tables</button>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-actions">
                  <button className="icon-btn"><Heart size={20} /></button>
                  <button className="icon-btn"><ShoppingCart size={20} /></button>
                </div>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <span className="product-price">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
