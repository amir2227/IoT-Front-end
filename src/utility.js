export const isAuthenticated = () => {
  const store = localStorage.getItem("profile");
  const profile = JSON.parse(store);
  return store !== null && profile.accessToken.length > 0 ? true : false;
};

export const logout = () => {
  localStorage.removeItem("profile");
};

export const getToken = () => {
  const store = localStorage.getItem("profile");
  const profile = JSON.parse(store);
  return store !== null && profile.accessToken.length > 0
    ? profile.accessToken
    : "";
};
