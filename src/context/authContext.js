import React, { createContext, useContext, useState, useEffect } from "react";
import { loginService, logoutService, getUser } from "@/services/api";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadUser() {
      try {
        const result = await getUser();
        if (result && result.data) {
          setUser(result.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);
  

  const login = async (email, password) => {
    try {
      const result = await loginService(email, password);
      if (result && result.data) {
        // Recarregar dados completos do usuário após login
        const userData = await getUser();
        setUser(userData.data || result.data);
      } else {
        setUser(result.data);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setUser(null); 
    } catch (err) {
      console.error("Erro ao fazer logout:", err.message);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
