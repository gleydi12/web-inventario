import { API_URL } from '../constants'; // Asegúrate de tener esta constante definida

export const ProductosService = {
  // Obtener todos los productos
  async getAll() {
    try {
      const response = await fetch(`${API_URL}/productos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Obtener un producto por ID
  async getById(id) {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Crear un nuevo producto
  async create(producto) {
    try {
      const response = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(producto)
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Actualizar un producto
  async update(id, producto) {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(producto)
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Eliminar un producto
  async delete(id) {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};