import { createContext, useContext } from "react";

interface AuthCntextType {
  username: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
}

export const AuthContext = createContext<AuthCntextType>({
  username: null,
  token: null,
  login: () => {},
});

export const useAuth = () => useContext(AuthContext);
