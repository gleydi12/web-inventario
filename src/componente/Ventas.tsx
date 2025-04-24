import React, { useState } from 'react';

interface Venta {
  id: number;
  fecha: string;
}

const Ventas: React.FC = () => {
  // Estado para las ventas
  const [ventas, setVentas] = useState<Venta[]>([
    { id: 1, fecha: '2023-05-15' },
    { id: 2, fecha: '2023-05-16' },
  ]);

  // Estado para el formulario
  const [nuevaVenta, setNuevaVenta] = useState<Omit<Venta, 'id'>>({ 
    fecha: '',
  });

  // Estado para edición
  const [editando, setEditando] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState('');

  // Filtrar ventas según búsqueda
  const ventasFiltradas = ventas.filter(venta =>
    venta.fecha.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevaVenta({
      ...nuevaVenta,
      [name]: value
    });
  };

  // Agregar nueva venta
  const agregarVenta = () => {
    if (!nuevaVenta.fecha) return;
    
    const nuevoId = Math.max(...ventas.map(v => v.id), 0) + 1;
    setVentas([...ventas, { ...nuevaVenta, id: nuevoId }]);
    
    // Limpiar formulario
    setNuevaVenta({ fecha: '' });
  };

  // Editar venta
  const editarVenta = (id: number) => {
    const venta = ventas.find(v => v.id === id);
    if (venta) {
      setNuevaVenta({
        fecha: venta.fecha,
      });
      setEditando(id);
    }
  };

  // Actualizar venta
  const actualizarVenta = () => {
    if (editando === null || !nuevaVenta.fecha) return;
    
    setVentas(ventas.map(v => 
      v.id === editando ? { ...nuevaVenta, id: editando } : v
    ));
    
    // Limpiar formulario
    setNuevaVenta({ fecha: '' });
    setEditando(null);
  };

  // Eliminar venta
  const eliminarVenta = (id: number) => {
    setVentas(ventas.filter(v => v.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Ventas</h1>
      
      {/* Barra de búsqueda */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar ventas por fecha..."
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
            {editando !== null ? 'Editar Venta' : 'Agregar Venta'}
          </h5>
          <div className="row g-3">
            <div className="col-md-2">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                className="form-control"
                name="fecha"
                value={nuevaVenta.fecha}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mt-3">
            {editando !== null ? (
              <>
                <button 
                  className="btn btn-primary me-2"
                  onClick={actualizarVenta}
                >
                  Actualizar
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditando(null);
                    setNuevaVenta({ fecha: '' });
                  }}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button 
                className="btn btn-success"
                onClick={agregarVenta}
              >
                Agregar Venta
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Tabla de ventas */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventasFiltradas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{venta.fecha}</td>
                <td>
                  <button 
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarVenta(venta.id)}
                  >
                    <i className="bi bi-pencil"></i> Editar
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarVenta(venta.id)}
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

export default Ventas;