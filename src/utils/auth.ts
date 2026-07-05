export const getAuthToken = () => localStorage.getItem('token');
export const setAuthToken = (token: string) => localStorage.setItem('token', token);

export const getAuthUser = () => {
  const user = localStorage.getItem('user');
  if (!user || user === 'undefined') return null;
  try {
    return JSON.parse(user);
  } catch (e) {
    return null;
  }
};

export const setAuthUser = (user: any) => localStorage.setItem('user', JSON.stringify(user));

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
