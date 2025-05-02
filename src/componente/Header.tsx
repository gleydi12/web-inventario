import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-box-seam me-2"></i>
          Sistema de Inventario
        </Link>
        
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/productos">
                <i className="bi bi-box me-1"></i> Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/proveedores">
                <i className="bi bi-truck me-1"></i> Proveedores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/compras">
                <i className="bi bi-cart-plus me-1"></i> Compras
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ventas">
                <i className="bi bi-cart-check me-1"></i> Ventas
              </Link>
              </li>
            <li className="nav-item">
              <Link className="nav-link" to="/detalles_compra">
                <i className="bi bi-cart-check me-1"></i> Detalles de Compras
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/detalles_venta">
                <i className="bi bi-cart-check me-1"></i> Detalles de Ventas
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;