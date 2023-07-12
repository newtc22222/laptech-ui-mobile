import api from "../configs/api";

const UserService = {
  getCurrentUser: async (accessToken) => {
    const response = await api.get("/getCurrentUser", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  },
  getCartOfUser: async (accessToken) => {
    const response = await api.get("/myCart", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  },
  getInvoiceOfUser: async (accessToken) => {
    const response = await api.get("/myInvoices", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  },
  updateInformation: async (newInformation, accessToken) => {
    const response = await api.patch("/changeMyInformation", newInformation, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  },
  updatePassword: async (oldPassword, newPassword, accessToken) => {
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
