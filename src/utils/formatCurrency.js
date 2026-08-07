export const formatPrice = (price) => {
  if (price === '' || price === null || price === undefined) return '';
  const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/,/g, '')) : price;
  if (isNaN(numericPrice)) return price;
  
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(numericPrice);
};
