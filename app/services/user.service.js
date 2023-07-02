import api from "../configs/api";

const UserService = {
  getCurrentUser: async (accessToken) => {
    const response = await api.get("/users/getCurrentUser", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  },
  getCartOfUser: async (accessToken) => {
    const response = await api.get("/users/myCart", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  },
  getInvoiceOfUser: async (accessToken) => {
    const response = await api.get("/users/myInvoices", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  },
  updateInformation: async (newInformation) => {
    const response = await api.post(
      "/users/changeMyInformation",
      newInformation,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response.data;
  },
  updatePassword: async (oldPassword, newPassword) => {
    const response = await api.post(
      "/auth/changePassword",
      { oldPassword, newPassword },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    return response.data;
  },
};

export default UserService;
