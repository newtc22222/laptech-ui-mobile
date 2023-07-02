import api from "../configs/api";

const ProductService = {
  getAllProducts: async (isCard = true) => {
    const response = await api.get(
      "/products" + (isCard ? "?isCard=true" : "")
    );
    return response.data;
  },
  getProductWithId: async (productId, isDetail) => {
    const response = await api.get(
      "/products/" + productId + (isDetail ? "/detail" : "")
    );
    return response.data;
  },
  filterProduct: async (filterObject) => {
    const response = await api.get("/products/filter", { data: filterObject });
    return response.data;
  },
  getAllBrands: async () => {
    const response = await api.get("/brands");
    return response.data;
  },
  getProductOfBrand: async (brandId, isCard = true) => {
    const response = await api.get(
      "/brands/" + brandId + "/products" + (isCard ? "?isCard=true" : "")
    );
    return response.data;
  },
  getAllCategories: async () => {
    const response = await api.get("/categories");
    return response.data;
  },
  getProductOfCategory: async (categoryId, isCard = true) => {
    const response = await api.get(
      "/categories/" + categoryId + "/products" + (isCard ? "?isCard=true" : "")
    );
    return response.data;
  },
  getImagesOfProduct: async (productId) => {
    const response = await api.get("/products/" + productId + "/images");
    return response.data;
  },
  getItemsInCart: async (cartId, accessToken) => {
    const response = await api.get("/cart/" + cartId + "/units", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  },
  getItemsInvoices: async (invoiceId, accessToken) => {
    const response = await api.get("/invoices/" + invoiceId + "/units", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  },
};

export default ProductService;
