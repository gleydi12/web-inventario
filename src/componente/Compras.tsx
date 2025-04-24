import React, { useState } from 'react';

interface Compra {
  id: number;
  proveedorId: number;
  fecha: string;
}

const Compras: React.FC = () => {
  // Estado para las compras
  const [compras, setCompras] = useState<Compra[]>([
    { id: 1, proveedorId: 'carlos perez', fecha: '2023-05-15' },
    { id: 2, proveedorId: 'jesus salgado', fecha: '2023-05-16' },
  ]);

  // Estado para el formulario
  const [nuevaCompra, setNuevaCompra] = useState<Omit<Compra, 'id'>>({ 
    proveedorId: 0,
    fecha: '',
  });

  // Estado para edición
  const [editando, setEditando] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState('');

  // Filtrar compras según búsqueda
  const comprasFiltradas = compras.filter(compra =>
    compra.fecha.toLowerCase().includes(busqueda.toLowerCase()) ||
    compra.proveedorId.toString().includes(busqueda)
  );

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevaCompra({
      ...nuevaCompra,
      [name]: name === 'proveedorId' || name === 'cantidad' 
        ? Number(value) 
        : value
    });
  };

  // Agregar nueva compra
  const agregarCompra = () => {
    if (!nuevaCompra.proveedorId || !nuevaCompra.fecha) return;
    
    const nuevoId = Math.max(...compras.map(c => c.id), 0) + 1;
    setCompras([...compras, { ...nuevaCompra, id: nuevoId }]);
    
    // Limpiar formulario
    setNuevaCompra({ proveedorId: 0, fecha: '' });
  };

  // Editar compra
  const editarCompra = (id: number) => {
    const compra = compras.find(c => c.id === id);
    if (compra) {
      setNuevaCompra({
        proveedorId: compra.proveedorId,
        fecha: compra.fecha,
     
      });
      setEditando(id);
    }
  };

  // Actualizar compra
  const actualizarCompra = () => {
    if (editando === null || !nuevaCompra.proveedorId || !nuevaCompra.fecha) return;
    
    setCompras(compras.map(c => 
      c.id === editando ? { ...nuevaCompra, id: editando } : c
    ));
    
    // Limpiar formulario
    setNuevaCompra({ proveedorId: 0, fecha: '', });
    setEditando(null);
  };

  // Eliminar compra
  const eliminarCompra = (id: number) => {
    setCompras(compras.filter(c => c.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Compras</h1>
      
      {/* Barra de búsqueda */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar compras..."
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
            {editando !== null ? 'Editar Compra' : 'Agregar Compra'}
          </h5>
          <div className="row g-3">
            <div className="col-md-2">
              <label className="form-label">ID Proveedor</label>
              <input
                type="number"
                className="form-control"
                name="proveedorId"
                value={nuevaCompra.proveedorId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                className="form-control"
                name="fecha"
                value={nuevaCompra.fecha}
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
                  onClick={actualizarCompra}
                >
                  Actualizar
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditando(null);
                    setNuevaCompra({ proveedorId: 0, fecha: '' });
                  }}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button 
                className="btn btn-success"
                onClick={agregarCompra}
              >
                Agregar Compra
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Tabla de compras */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>ID Proveedor</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {comprasFiltradas.map((compra) => (
              <tr key={compra.id}>
                <td>{compra.id}</td>
                <td>{compra.proveedorId}</td>
                <td>{compra.fecha}</td>
            
                <td>
                  <button 
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarCompra(compra.id)}
                  >
                    <i className="bi bi-pencil"></i> Editar
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarCompra(compra.id)}
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

export default Compras;