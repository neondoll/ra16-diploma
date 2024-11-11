const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/api`;

export default {
  CATEGORIES: `${backendUrl}/categories`,
  ORDER: `${backendUrl}/order`,
  PRODUCTS: `${backendUrl}/items`,
  TOP_SALES: `${backendUrl}/top-sales`,
};
