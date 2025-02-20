import { createContext, useContext } from "react";

interface AuthCntextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  myOrders: any[]
  login: (username: string, token: string) => void;
  logout: () => void;
  getMyOrders: () => void;
}

export const AuthContext = createContext<AuthCntextType>({
  username: null,
  token: null,
  isAuthenticated: false,
  myOrders: [],
  login: () => {},
  logout: () => {},
  getMyOrders: () => {},
});

export const useAuth = () => useContext(AuthContext);
