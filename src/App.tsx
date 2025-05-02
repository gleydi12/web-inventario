import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './componente/Header';
import Productos from './componente/Productos';
import Proveedores from './componente/Proveedores';
import Compras from './componente/Compras';
import Ventas from './componente/Ventas';
import DetallesCompraComponent from './componente/DetallesCompra';
import DetallesVenta from './componente/DetallesVenta';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/productos" element={<Productos />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/compras" element={<Compras />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/detalles_compra" element={<DetallesCompraComponent />} />
            <Route path="/detalles_venta" element={<DetallesVenta />} />
         <Route path="/" element={<Productos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;