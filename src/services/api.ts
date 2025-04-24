import { API_URL } from '../constants';

export namespace ProductosAPI {
  // OBTENER productos
  export function GET(endpoint: string = ''): Promise<Response> {
    return fetch(`${API_URL}/productos/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  // CREAR producto
  export function POST(data: object): Promise<Response> {
    return fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
  }

  // ACTUALIZAR producto
  export function PUT(id: string, data: object): Promise<Response> {
    return fetch(`${API_URL}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
  }

  // ELIMINAR producto
  export function DELETE(id: string): Promise<Response> {
    return fetch(`${API_URL}/productos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}