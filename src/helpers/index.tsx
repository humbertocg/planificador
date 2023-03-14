export const formatearCantidad = (cantidad: number) => {
  return cantidad.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
};
