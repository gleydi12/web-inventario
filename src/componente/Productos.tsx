import React, { useState, useEffect } from 'react';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

const Productos: React.FC = () => {
  // Estado para los productos
  const [productos, setProductos] = useState<Producto[]>([
    { id: 1, nombre: 'Producto 1', descripcion: 'Descripción 1', precio: 100, stock: 10 },
    { id: 2, nombre: 'Producto 2', descripcion: 'Descripción 2', precio: 0, stock: 0 }
  ]);

  // Estado para el formulario
  const [nuevoProducto, setNuevoProducto] = useState<Omit<Producto, 'id'>>({ 
    nombre: '', 
    descripcion: '', 
    precio: '', 
    stock: '' ,
  });

  // Estado para edición
  const [editando, setEditando] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState('');

  // Filtrar productos según búsqueda
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoProducto({
      ...nuevoProducto,
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value
    });
  };

  // Agregar nuevo producto
  const agregarProducto = () => {
    if (!nuevoProducto.nombre) return;
    
    const nuevoId = Math.max(...productos.map(p => p.id), 0) + 1;
    setProductos([...productos, { ...nuevoProducto, id: nuevoId }]);
    
    // Limpiar formulario
    setNuevoProducto({ nombre: '', descripcion: '', precio: '', stock: '' });
  };

  // Editar producto
  const editarProducto = (id: number) => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      setNuevoProducto({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock
      });
      setEditando(id);
    }
  };

  // Actualizar producto
  const actualizarProducto = () => {
    if (editando === null || !nuevoProducto.nombre) return;
    
    setProductos(productos.map(p => 
      p.id === editando ? { ...nuevoProducto, id: editando } : p
    ));
    
    // Limpiar formulario
    setNuevoProducto({ nombre: '', descripcion: '', precio: 0, stock: 0 });
    setEditando(null);
  };

  // Eliminar producto
  const eliminarProducto = (id: number) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Productos</h1>
      
      {/* Barra de búsqueda */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button">
          <i className="bi bi-search"></i>
        </button>
      </div>
      
      {/* Formulario para agregar/editar */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">
            {editando !== null ? 'Editar Producto' : 'Agregar Producto'}
          </h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                name="descripcion"
                value={nuevoProducto.descripcion}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                name="precio"
                value={nuevoProducto.precio}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                name="stock"
                value={nuevoProducto.stock}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>
          <div className="mt-3">
            {editando !== null ? (
              <>
                <button 
                  className="btn btn-primary me-2"
                  onClick={actualizarProducto}
                >
                  Actualizar
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditando(null);
                    setNuevoProducto({ nombre: '', descripcion: '', precio: 0, stock: 0 });
                  }}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button 
                className="btn btn-success"
                onClick={agregarProducto}
              >
                Agregar Producto
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Tabla de productos */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>{producto.stock}</td>
                <td>
                  <button 
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarProducto(producto.id)}
                  >
                    <i className="bi bi-pencil"></i> Editar
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Productos;