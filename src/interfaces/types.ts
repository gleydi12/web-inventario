export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio_venta: number;
    stock: number;
  }
  
  export interface Proveedor {
    id: number;
    nombre: string;
    telefono: string;
    email: string;
  }
  
  export interface Compra {
    id: number;
    proveedorId: number;
    fecha: string;
  }
  
  export interface Venta {
    id: number;
    fecha: string;
  }
  
  export interface DetalleCompra {
    id: number;
    compraId: number;
    productoId: number;
    cantidad: number;
    precioUnitario: number;
  }
  
  export interface DetalleVenta {
    id: number;
    ventaId: number;
    productoId: number;
    cantidad: number;
    precioUnitario: number;
  }