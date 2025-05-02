import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

export interface DetalleVenta {
  id: number;
  ventaId: number;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

const DetallesVenta: React.FC = () => {
  // Obtener parámetros de la URL
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  // Datos de ejemplo
  const productos: Producto[] = [
    { id: 1, nombre: 'Laptop', precio: 1200 },
    { id: 2, nombre: 'Mouse', precio: 25 },
    { id: 3, nombre: 'Teclado', precio: 50 },
    { id: 4, nombre: 'Monitor', precio: 300 },
  ];

  // Estado inicial - ahora basado en el ID de la URL si existe
  const [detalles, setDetalles] = useState<DetalleVenta[]>(() => {
    const initialData = [
      { id: 1, ventaId: 1, productoId: 1, cantidad: 2, precioUnitario: 1200, subtotal: 2400 },
      { id: 2, ventaId: 1, productoId: 2, cantidad: 3, precioUnitario: 25, subtotal: 75 },
      { id: 3, ventaId: 2, productoId: 3, cantidad: 1, precioUnitario: 50, subtotal: 50 },
    ];
    
    // Filtrar por ventaId si hay un ID en la URL
    return id ? initialData.filter(d => d.ventaId === parseInt(id)) : initialData;
  });

  const [nuevoDetalle, setNuevoDetalle] = useState<Omit<DetalleVenta, 'id' | 'subtotal'>>({
    ventaId: id ? parseInt(id) : 1,
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
        [name]: name === 'productoId' || name === 'cantidad' || name === 'precioUnitario' || name === 'ventaId'
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
      ventaId: id ? parseInt(id) : 1,
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
        ventaId: detalle.ventaId,
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
      ventaId: id ? parseInt(id) : 1,
      productoId: 1,
      cantidad: 1,
      precioUnitario: productos[0].precio,
    });
  };

  // Eliminar detalle
  const eliminarDetalle = (id: number) => {
    setDetalles(detalles.filter(d => d.id !== id));
  };

  // Navegar a otra vista
  const irAOtraVista = () => {
    navigate('/otra-ruta');
  };

  // Filtrar detalles
  const detallesFiltrados = busqueda
    ? detalles.filter(d => {
        const producto = productos.find(p => p.id === d.productoId);
        return (
          d.ventaId.toString().includes(busqueda) ||
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
      <h1 className="mb-4">Gestión de Detalles de Venta {id ? `para Venta #${id}` : ''}</h1>
      
      {/* Botón para navegar */}
      <div className="mb-3">
        <button 
          className="btn btn-info me-2"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
        <button 
          className="btn btn-primary"
          onClick={irAOtraVista}
        >
          Ir a otra vista
        </button>
      </div>
      
      {/* Barra de búsqueda */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar detalles por ID de venta o producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button">
          <i className="bi bi-search"></i>
        </button>
      </div>
      
      {/* Resto del código permanece igual */}
      {/* Formulario para agregar/editar */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">
            {editandoId !== null ? 'Editar Detalle' : 'Agregar Detalle'}
          </h5>
          <div className="row g-3">
            <div className="col-md-2">
              <label className="form-label">ID Venta</label>
              <input
                type="number"
                className="form-control"
                name="ventaId"
                value={nuevoDetalle.ventaId}
                onChange={handleInputChange}
                min="1"
                required
                disabled={!!id} // Deshabilitar si el ID viene de la URL
              />
            </div>
            
            {/* Resto del formulario... */}
          </div>
          
          {/* Resto del componente... */}
        </div>
      </div>
      
      {/* Tabla de detalles */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>ID Venta</th>
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
                <td>{detalle.ventaId}</td>
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

export default DetallesVenta;