import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //este lo usaremos para guardar los permisos del usuario y restirngir el acceso a las rutas
  const [userPermissions, setUserPermissions] = useState([]);
  //este lo usaremos para guardar el token del usuario y restirngir el acceso a las rutas
  const [userToken, setUserToken] = useState(
    localStorage.getItem("SOFOCON_JWT_TOKEN") || null,
  );

  //para cerrar la sesion y limpiar el localstorage
  const logout = () => {
    localStorage.removeItem("SOFOCON_JWT_TOKEN");
    localStorage.removeItem("SOFOCON_JWT_REFRESH_TOKEN");
    localStorage.removeItem("SOFOCON_PERMISSIONS");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userPermissions,
        setUserPermissions,
        userToken,
        setUserToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
