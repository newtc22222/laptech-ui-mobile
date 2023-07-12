import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [maxAgeToken, setMaxAgeToken] = useState(0);

  const profile = {
    user: userData,
    accessToken,
    refreshToken,
    maxAgeToken,
  };

  const handleLogin = async (
    user,
    accessToken,
    refreshToken,
    maxAgeToken = 0
  ) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("accessToken", JSON.stringify(accessToken));
    await AsyncStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    await AsyncStorage.setItem("maxAgeToken", JSON.stringify(maxAgeToken));

    setUserData(user);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setMaxAgeToken(maxAgeToken);
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();

    setUserData(null);
    setAccessToken(null);
    setRefreshToken(null);
    setMaxAgeToken(0);
  };

  const handleUpdateAccessToken = (newAccessToken) => {
    setAccessToken(newAccessToken);
  };

  const handleUpdateUser = (newData) => {
    setUserData(newData);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        handleLogin,
        handleUpdateAccessToken,
        handleLogout,
        handleUpdateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AppProvider;
