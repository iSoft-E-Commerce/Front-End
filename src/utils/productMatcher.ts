import type { Color, Product } from '../../client';

export const productMatcher = (products: Product[], currentColor: Color) => {
  const memory = products
    .filter((pr) => pr.color.name === currentColor.name)
    .sort((a, b) => parseInt(a.memory) - parseInt(b.memory));
  const uniqueColors = new Set();
  const colors = products.filter((item) => {
    if (uniqueColors.has(item.color.name)) {
      return false;
    } else {
      uniqueColors.add(item.color.name);
      return true;
    }
  });

  return { memory, colors };
};
