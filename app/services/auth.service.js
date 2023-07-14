import api from "../configs/api";

const AuthService = {
  login: async (phone, password) => {
    const response = await api.post("/auth/login", { phone, password });
    return response.data;
  },
  register: async (newUserData) => {
    const response = await api.post("/auth/register", newUserData);
    return response.data;
  },
  forgotPassword: async (confirmData) => {
    const response = await api.post("/auth/forgotPassword", confirmData);
    return response.data;
  },
  resetPassword: async (token, newPassword) => {
    const response = await api.post("/auth/updatePassword?token=" + token, {
      newPassword,
    });
    return response.data;
  },
  refreshToken: async (refreshToken) => {
    const response = await api.post("/auth/refreshToken", { refreshToken });
    return response.data;
  },
};

export default AuthService;
