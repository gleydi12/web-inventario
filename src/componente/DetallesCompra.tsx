import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DetallesCompra {
  id: number;
  compraId: number;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
}

const API_URL = 'http://localhost:3001/detalles_compra'; // Reemplaza con tu URL real

const DetallesCompraComponent: React.FC = () => {
  const [detallesCompras, setDetallesCompras] = useState<DetallesCompra[]>([]);
  const [nuevoDetalleCompra, setNuevoDetalleCompra] = useState<Omit<DetallesCompra, 'id'>>({ 
    compraId: 0,
    productoId: 0,
    cantidad: 0,
    precioUnitario: 0
  });
  const [editando, setEditando] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Obtener detalles de compra al cargar el componente
  useEffect(() => {
    const fetchDetallesCompras = async () => {
      try {
        const response = await axios.get(`${API_URL}/detalles-compras`);
        setDetallesCompras(response.data);
        setCargando(false);
      } catch (err) {
        setError('Error al cargar los detalles de compra');
        setCargando(false);
        console.error(err);
      }
    };

    fetchDetallesCompras();
  }, []);

  // Filtrar detalles de compra según búsqueda
  const detallesComprasFiltrados = detallesCompras.filter(detalle =>
    detalle.productoId.toString().includes(busqueda) ||
    detalle.compraId.toString().includes(busqueda)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoDetalleCompra({
      ...nuevoDetalleCompra,
      [name]: Number(value)
    });
  };

  // Agregar nuevo detalle de compra
  const agregarDetalleCompra = async () => {
    if (nuevoDetalleCompra.productoId === 0) return;
    
    try {
      const response = await axios.post(`${API_URL}/detalles-compras`, nuevoDetalleCompra);
      setDetallesCompras([...detallesCompras, response.data]);
      setNuevoDetalleCompra({ compraId: 0, productoId: 0, cantidad: 0, precioUnitario: 0 });
    } catch (err) {
      setError('Error al agregar el detalle de compra');
      console.error(err);
    }
  };

  // Editar detalle de compra
  const editarDetalleCompra = (id: number) => {
    const detalle = detallesCompras.find(d => d.id === id);
    if (detalle) {
      setNuevoDetalleCompra({
        compraId: detalle.compraId,
        productoId: detalle.productoId,
        cantidad: detalle.cantidad,
        precioUnitario: detalle.precioUnitario
      });
      setEditando(id);
    }
  };

  // Actualizar detalle de compra
  const actualizarDetalleCompra = async () => {
    if (editando === null || nuevoDetalleCompra.productoId === 0) return;
    
    try {
      await axios.put(`${API_URL}/detalles-compras/${editando}`, nuevoDetalleCompra);
      setDetallesCompras(detallesCompras.map(d => 
        d.id === editando ? { ...nuevoDetalleCompra, id: editando } : d
      ));
      setNuevoDetalleCompra({ compraId: 0, productoId: 0, cantidad: 0, precioUnitario: 0 });
      setEditando(null);
    } catch (err) {
      setError('Error al actualizar el detalle de compra');
      console.error(err);
    }
  };

  // Eliminar detalle de compra
  const eliminarDetalleCompra = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/detalles-compras/${id}`);
      setDetallesCompras(detallesCompras.filter(d => d.id !== id));
    } catch (err) {
      setError('Error al eliminar el detalle de compra');
      console.error(err);
    }
  };

  if (cargando) return <div className="container mt-4">Cargando...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Detalles de Compra</h1>
      
      {/* Barra de búsqueda */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar detalles por ID de producto o compra..."
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
            {editando !== null ? 'Editar Detalle de Compra' : 'Agregar Detalle de Compra'}
          </h5>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">ID Compra</label>
              <input
                type="number"
                className="form-control"
                name="compraId"
                value={nuevoDetalleCompra.compraId || ''}
                onChange={handleInputChange}
                required
                min="1"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">ID Producto</label>
              <input
                type="number"
                className="form-control"
                name="productoId"
                value={nuevoDetalleCompra.productoId || ''}
                onChange={handleInputChange}
                required
                min="1"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Cantidad</label>
              <input
                type="number"
                className="form-control"
                name="cantidad"
                value={nuevoDetalleCompra.cantidad || ''}
                onChange={handleInputChange}
                min="1"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Precio Unitario</label>
              <input
                type="number"
                className="form-control"
                name="precioUnitario"
                value={nuevoDetalleCompra.precioUnitario || ''}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="mt-3">
            {editando !== null ? (
              <>
                <button 
                  className="btn btn-primary me-2"
                  onClick={actualizarDetalleCompra}
                >
                  Actualizar
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditando(null);
                    setNuevoDetalleCompra({ compraId: 0, productoId: 0, cantidad: 0, precioUnitario: 0 });
                  }}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button 
                className="btn btn-success"
                onClick={agregarDetalleCompra}
              >
                Agregar Detalle
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Tabla de detalles de compra */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>ID Compra</th>
              <th>ID Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {detallesComprasFiltrados.map((detalle) => (
              <tr key={detalle.id}>
                <td>{detalle.id}</td>
                <td>{detalle.compraId}</td>
                <td>{detalle.productoId}</td>
                <td>{detalle.cantidad}</td>
                <td>${detalle.precioUnitario.toFixed(2)}</td>
                <td>
                  <button 
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarDetalleCompra(detalle.id)}
                  >
                    <i className="bi bi-pencil"></i> Editar
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarDetalleCompra(detalle.id)}
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

export default DetallesCompraComponent;