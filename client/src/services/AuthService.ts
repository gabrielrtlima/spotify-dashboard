import Cookies from 'js-cookie'

export const isAuth = () => {
  if (!Cookies.get("access_token")) {
    const url = window.location.href;
    const token = url.split("token=")[1];
    if (token) {
      Cookies.set("access_token", token);
      return true;
    } 
    return false
  } 
  return true
}

export const getAccessToken = () : string => {
  return Cookies.get("access_token")!
}