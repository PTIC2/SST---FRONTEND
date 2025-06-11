import Cookie from 'js-cookie';
import { LogOut } from 'lucide-react';
import { toast } from 'react-toastify';
import { createContext, useState, useContext } from "react";

const isProduction = window.location.protocol === "https:";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    const login = async (email, password) => {
        try {
            setLoading(true);

            if(email === 'test@gmail.com' && password == 'Newstetic2025') {
                setIsAuth(true);
                setUser({ 
                    email 
                });

                Cookie.set("token", "fake-jwt-token", {
                    secure: isProduction,
                    sameSite: "strict",
                });

                toast.success('Bienvenido', {
                    position: "top-left",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });

            } else {
                throw new Error('Credenciales incorrectas')
            }

        } catch (err) {
            toast.error(err.message || "Error al iniciar sesión ❌");
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        toast.success('¡Nos vemos! Tu sesión se cerró con éxito.', {
            icon : <LogOut className='text-green-600 w-5 h-5' />,
            position: "top-left",
            autoClose: 5000,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });

        setTimeout(() => {
            window.location.href = '/'
        }, 2000) 
    }

    return (
        <AuthContext.Provider value={{
            login,
            isAuth,
            loading,
            user,
            logout
         }}
        >
            {children}
        </AuthContext.Provider>
    )

}