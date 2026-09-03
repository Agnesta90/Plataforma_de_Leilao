import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [estaLogado, setEstaLogado] = useState(JSON.parse(sessionStorage.getItem("user")) || "");
  const [mostrarBloqueio, setMostrarBloqueio] = useState(false);

  useEffect(() => {
    if (estaLogado) return;

    const temporizador = setTimeout(() => {
      if (!estaLogado) {
        setMostrarBloqueio(true);
      }
    }, 5000); 

    return () => clearTimeout(temporizador);
  }, [estaLogado]);

  const fecharBloqueio = () => setMostrarBloqueio(false);

  return (
    <AuthContext.Provider value={{ estaLogado, setEstaLogado, mostrarBloqueio, fecharBloqueio }} >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}