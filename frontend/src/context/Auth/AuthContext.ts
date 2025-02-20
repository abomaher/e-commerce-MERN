import { createContext, useContext } from "react";

interface AuthCntextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthCntextType>({
  username: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},

});

export const useAuth = () => useContext(AuthContext);
