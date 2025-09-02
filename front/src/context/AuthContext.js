import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(async () => {
      try {
        const { data } = await axios.post("refresh_token", {
          refresh_token: refreshToken,
        });
        setAccessToken(data.access_token);
        setExpiresIn(data.expires_in);
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    }, (expiresIn - 60) * 1000); // Refresh 60 seconds before expiration

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        setRefreshToken,
        setExpiresIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
