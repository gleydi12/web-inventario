import React, { useState } from 'react';

interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
}

const Proveedores: React.FC = () => {
  // Estado para los proveedores
  const [proveedores, setProveedores] = useState<Proveedor[]>([
    { id: 1, nombre:  'Juan Pérez', telefono: '555-1234', email: 'juan@proveedor1.com' },
    { id: 2, nombre:  'María García', telefono: '555-5678', email: 'maria@proveedor2.com' }
  ]);

  // Estado para el formulario
  const [nuevoProveedor, setNuevoProveedor] = useState<Omit<Proveedor, 'id'>>({ 
    nombre: '', 
    telefono: '',
    email: ''
  });

  // Estado para edición
  const [editando, setEditando] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState('');

  // Filtrar proveedores según búsqueda
  const proveedoresFiltrados = proveedores.filter(proveedor =>
    proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    proveedor.telefono.toLowerCase().includes(busqueda.toLowerCase()) ||
    proveedor.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoProveedor({
      ...nuevoProveedor,
      [name]: value
    });
  };

  // Agregar nuevo proveedor
  const agregarProveedor = () => {
    if (!nuevoProveedor.nombre) return;
    
    const nuevoId = Math.max(...proveedores.map(p => p.id), 0) + 1;
    setProveedores([...proveedores, { ...nuevoProveedor, id: nuevoId }]);
    
    // Limpiar formulari
    setNuevoProveedor({ nombre: '', telefono: '', email: '' });
  };

  // Editar proveedor
  const editarProveedor = (id: number) => {
    const proveedor = proveedores.find(p => p.id === id);
    if (proveedor) {
      setNuevoProveedor({
        nombre: proveedor.nombre,
        telefono: proveedor.telefono,
        email: proveedor.email
      });
      setEditando(id);
    }
  };

  // Actualizar proveedor
  const actualizarProveedor = () => {
    if (editando === null || !nuevoProveedor.nombre) return;
    
    setProveedores(proveedores.map(p => 
      p.id === editando ? { ...nuevoProveedor, id: editando } : p
    ));
    
    // Limpiar formulario
    setNuevoProveedor({ nombre: '', telefono: '', email: '' });
    setEditando(null);
  };

  // Eliminar proveedor
  const eliminarProveedor = (id: number) => {
    setProveedores(proveedores.filter(p => p.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Proveedores</h1>
      
      {/* Barra de búsqueda */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar proveedores..."
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
            {editando !== null ? 'Editar Proveedor' : 'Agregar Proveedor'}
          </h5>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={nuevoProveedor.nombre}
                onChange={handleInputChange}
                required
              />
                 </div>
         
            <div className="col-md-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={nuevoProveedor.telefono}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={nuevoProveedor.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mt-3">
            {editando !== null ? (
              <>
                <button 
                  className="btn btn-primary me-2"
                  onClick={actualizarProveedor}
                >
                  Actualizar
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditando(null);
                    setNuevoProveedor({ nombre: '', telefono: '', email: '' });
                  }}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button 
                className="btn btn-success"
                onClick={agregarProveedor}
              >
                Agregar Proveedor
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Tabla de proveedores */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedoresFiltrados.map((proveedor) => (
              <tr key={proveedor.id}>
                <td>{proveedor.id}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.email}</td>
                <td>
                  <button 
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarProveedor(proveedor.id)}
                  >
                    <i className="bi bi-pencil"></i> Editar
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarProveedor(proveedor.id)}
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

export default Proveedores;