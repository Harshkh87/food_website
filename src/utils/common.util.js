import Cookies from "js-cookie";
export const logout = (history) => {
  Cookies.remove("x_ufo");
  Cookies.remove("x_auth_token");
  return history("/");
};

