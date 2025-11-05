import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  const intervalRef = useRef(null);

  const fetchMe = async (t) => {
    try {
      const res = await fetch(`${backend}/auth/me`, { headers: { Authorization: `Bearer ${t}` } });
      if (!res.ok) return null;
      const u = await res.json();
      setUser(u);
      return u;
    } catch {
      return null;
    }
  };

  const startPolling = (t) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      fetchMe(t);
    }, 5000);
  };

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
      fetchMe(t);
      startPolling(t);
    }
    const onVis = () => {
      if (document.visibilityState === 'visible' && t) fetchMe(t);
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [backend]);

  const login = async (email, password) => {
    const res = await fetch(`${backend}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Invalid credentials');
    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    startPolling(data.token);
    return data.user;
  };

  const register = async (email, password) => {
    const res = await fetch(`${backend}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Registration failed');
    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    startPolling(data.token);
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const refreshUser = () => {
    if (token) return fetchMe(token);
    return null;
  };

  const value = useMemo(() => ({ user, token, login, register, logout, backend, refreshUser }), [user, token, backend]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
