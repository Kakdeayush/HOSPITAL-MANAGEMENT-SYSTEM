// 🔐 TOKEN
export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

// 👤 ROLE
export const getRole = () => localStorage.getItem('role');
export const setRole = (role) => localStorage.setItem('role', role);
export const removeRole = () => localStorage.removeItem('role');

// ✅ AUTH CHECK
export const isAuthenticated = () => !!getToken();

// 🚪 LOGOUT
export const logout = () => {
  removeToken();
  removeRole();
  window.location.href = '/login';
};