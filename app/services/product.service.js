import api from "../configs/api";

const ProductService = {
  getAllBanners: async (date = null) => {
    const response = await api.get("/banners");
    return response.data;
  },
  getAllProducts: async (isCard = true, page, size) => {
    const response = await api.get(
      "/products" +
        (isCard ? "?isCard=true" : "") +
        (!!page && !!size ? `&page=${page}&size=${size}` : "")
    );
    return response.data;
  },
  getProductOnSale: async (isCard = true) => {
    const response = await api.get(
      "/products/on-sale" + (isCard ? "?isCard=true" : "?isCard=false")
    );
    return response.data;
  },
  getProductWithId: async (productId, isDetail = true) => {
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
  getCommentsOfProduct: async (productId) => {
    const response = await api.get("/products/" + productId + "/comments");
    return response.data;
  },
  createComment: async (newComment) => {
    const response = await api.post("/comments", newComment);
    return response.data;
  },
  getFeedbacksOfProduct: async (productId) => {
    const response = await api.get("/products/" + productId + "/feedbacks");
    return response.data;
  },
  createFeedback: async (newFeedback, accessToken) => {
    const response = await api.post("/feedbacks", newFeedback, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  },
  getItemsInCart: async (cartId, accessToken, isCard = true) => {
    const response = await api.get(
      "/cart/" + cartId + "/units" + (isCard ? "?isCard=true" : ""),
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response.data;
  },
  getItemsInvoices: async (invoiceId, accessToken, isCard = true) => {
    const response = await api.get(
      "/invoices/" + invoiceId + "/units" + (isCard ? "?isCard=true" : ""),
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response.data;
  },
  addItemToCart: async (item, accessToken) => {
    const response = await api.post("units", item, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return response.data;
  },
  updateItemOfCart: async (item, itemId, accessToken) => {
    const response = await api.patch("units/" + itemId, item, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  },
  removeItemFromCart: async (itemId, updateBy, accessToken) => {
    const response = await api.delete("units/" + itemId, {
      data: { updateBy },
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  },
};

export default ProductService;
