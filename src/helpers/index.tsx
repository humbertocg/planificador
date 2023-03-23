export const formatearCantidad = (cantidad: number) => {
  return cantidad.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
};

export const formatearFecha = (fecha: Date) => {
  const nuevaFecha = new Date(fecha);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return nuevaFecha.toLocaleDateString('es-MX', options);
};
