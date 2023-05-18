import Cookies from 'js-cookie'

export const isAuth = () => {
  const token = Cookies.get("access_token")
  if (!token) {
    return false;
  } 
  return true;
}

export const getAccessToken = () : string => {
  return Cookies.get("access_token")!
}