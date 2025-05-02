import React, { useState } from 'react';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface DetalleCompra {
  id: number;
  compraId: number;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

const DetallesCompra: React.FC = () => {
  // Datos de ejemplo
  const productos: Producto[] = [
    { id: 1, nombre: 'Laptop', precio: 1200 },
    { id: 2, nombre: 'Mouse', precio: 25 },
    { id: 3, nombre: 'Teclado', precio: 50 },
    { id: 4, nombre: 'Monitor', precio: 300 },
  ];

  // Estado inicial
  const [detalles, setDetalles] = useState<DetalleCompra[]>([
    { id: 1, compraId: 1, productoId: 1, cantidad: 2, precioUnitario: 1200, subtotal: 2400 },
    { id: 2, compraId: 1, productoId: 2, cantidad: 3, precioUnitario: 25, subtotal: 75 },
    { id: 3, compraId: 2, productoId: 3, cantidad: 1, precioUnitario: 50, subtotal: 50 },
  ]);

  const [nuevoDetalle, setNuevoDetalle] = useState<Omit<DetalleCompra, 'id' | 'subtotal'>>({
    compraId: 1,
    productoId: 1,
    cantidad: 1,
    precioUnitario: productos[0].precio,
  });

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState('');

  // Calcular subtotal
  const calcularSubtotal = (cantidad: number, precioUnitario: number) => {
    return cantidad * precioUnitario;
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setNuevoDetalle(prev => {
      const updated = {
        ...prev,
        [name]: name === 'productoId' || name === 'cantidad' || name === 'precioUnitario' || name === 'compraId'
          ? Number(value)
          : value
      };

      // Actualizar precio unitario cuando se selecciona un producto
      if (name === 'productoId') {
        const productoSeleccionado = productos.find(p => p.id === Number(value));
        if (productoSeleccionado) {
          updated.precioUnitario = productoSeleccionado.precio;
        }
      }

      return updated;
    });
  };

  // Agregar nuevo detalle
  const agregarDetalle = () => {
    const subtotal = calcularSubtotal(nuevoDetalle.cantidad, nuevoDetalle.precioUnitario);
    
    const nuevoId = detalles.length > 0 ? Math.max(...detalles.map(d => d.id)) + 1 : 1;
    
    setDetalles([
      ...detalles,
      {
        id: nuevoId,
        ...nuevoDetalle,
        subtotal
      }
    ]);

    // Resetear formulario
    setNuevoDetalle({
      compraId: 1,
      productoId: 1,
      cantidad: 1,
      precioUnitario: productos[0].precio,
    });
  };

  // Editar detalle
  const editarDetalle = (id: number) => {
    const detalle = detalles.find(d => d.id === id);
    if (detalle) {
      setNuevoDetalle({
        compraId: detalle.compraId,
        productoId: detalle.productoId,
        cantidad: detalle.cantidad,
        precioUnitario: detalle.precioUnitario,
      });
      setEditandoId(id);
    }
  };

  // Actualizar detalle
  const actualizarDetalle = () => {
    if (editandoId === null) return;
    
    const subtotal = calcularSubtotal(nuevoDetalle.cantidad, nuevoDetalle.precioUnitario);
    
    setDetalles(detalles.map(d => 
      d.id === editandoId 
        ? { ...d, ...nuevoDetalle, subtotal } 
        : d
    ));

    // Resetear
    setEditandoId(null);
    setNuevoDetalle({
      compraId: 1,
      productoId: 1,
      cantidad: 1,
      precioUnitario: productos[0].precio,
    });
  };

  // Eliminar detalle
  const eliminarDetalle = (id: number) => {
    setDetalles(detalles.filter(d => d.id !== id));
  };

  // Filtrar detalles
  const detallesFiltrados = busqueda
    ? detalles.filter(d => {
        const producto = productos.find(p => p.id === d.productoId);
        return (
          d.compraId.toString().includes(busqueda) ||
          (producto && producto.nombre.toLowerCase().includes(busqueda.toLowerCase()))
        );
      })
    : detalles;

  // Obtener nombre del producto
  const getNombreProducto = (productoId: number) => {
    const producto = productos.find(p => p.id === productoId);
    return producto ? producto.nombre : 'Desconocido';
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Gestión de Detalles de Compra</h1>
      
      {/* Barra de búsqueda */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar detalles por ID de compra o producto..."
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
            {editandoId !== null ? 'Editar Detalle' : 'Agregar Detalle'}
          </h5>
          <div className="row g-3">
            <div className="col-md-2">
              <label className="form-label">ID Compra</label>
              <input
                type="number"
                className="form-control"
                name="compraId"
                value={nuevoDetalle.compraId}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            
            <div className="col-md-3">
              <label className="form-label">Producto</label>
              <select
                className="form-select"
                name="productoId"
                value={nuevoDetalle.productoId}
                onChange={handleInputChange}
                required
              >
                {productos.map(producto => (
                  <option key={producto.id} value={producto.id}>
                    {producto.nombre} (${producto.precio})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-2">
              <label className="form-label">Cantidad</label>
              <input
                type="number"
                className="form-control"
                name="cantidad"
                value={nuevoDetalle.cantidad}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            
            <div className="col-md-2">
              <label className="form-label">Precio Unitario</label>
              <input
                type="number"
                className="form-control"
                name="precioUnitario"
                value={nuevoDetalle.precioUnitario}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="col-md-2">
              <label className="form-label">Subtotal</label>
              <input
                type="text"
                className="form-control"
                readOnly
                value={calcularSubtotal(nuevoDetalle.cantidad, nuevoDetalle.precioUnitario).toFixed(2)}
              />
            </div>
          </div>
          
          <div className="mt-3">
            {editandoId !== null ? (
              <>
                <button 
                  className="btn btn-primary me-2"
                  onClick={actualizarDetalle}
                >
                  <i className="bi bi-check"></i> Actualizar
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditandoId(null);
                    setNuevoDetalle({
                      compraId: 1,
                      productoId: 1,
                      cantidad: 1,
                      precioUnitario: productos[0].precio,
                    });
                  }}
                >
                  <i className="bi bi-x"></i> Cancelar
                </button>
              </>
            ) : (
              <button 
                className="btn btn-success"
                onClick={agregarDetalle}
              >
                <i className="bi bi-plus"></i> Agregar Detalle
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Tabla de detalles */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>ID Compra</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {detallesFiltrados.map((detalle) => (
              <tr key={detalle.id}>
                <td>{detalle.id}</td>
                <td>{detalle.compraId}</td>
                <td>{getNombreProducto(detalle.productoId)}</td>
                <td>{detalle.cantidad}</td>
                <td>${detalle.precioUnitario.toFixed(2)}</td>
                <td>${detalle.subtotal.toFixed(2)}</td>
                <td>
                  <button 
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarDetalle(detalle.id)}
                  >
                    <i className="bi bi-pencil"></i> Editar
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarDetalle(detalle.id)}
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

export default DetallesCompra;