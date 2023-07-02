import api from "../configs/api";

const CheckoutService = {
  getCheckout: async (cartData, accessToken) => {
    const response = await api.post("/checkout", cartData, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  },
};

export default CheckoutService;
