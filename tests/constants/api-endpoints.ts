
export const API_ENDPOINTS = {
    products: '/products',
    addProduct: '/products/add',
    searchProducts: '/products/search',
    singleProduct: (id: number) => `/products/${id}`,
};
