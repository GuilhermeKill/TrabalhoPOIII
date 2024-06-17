import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');

    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
    }

    const currentPage = window.location.pathname;

    if (!storagedUser && currentPage !== '/login') {
      window.location.href = '/login';
    }
  }, []);

  async function signIn(login, password) {
    const response = await api({
      uri: '/login',
      method: 'POST',
      body: { email: login, senha: password },
    });
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error('Erro ao fazer login');
    }

    setUser(data);
    localStorage.setItem('@App:user', JSON.stringify(data));
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@App:user');
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
