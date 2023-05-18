import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../services/AuthService"


export const PrivateRoute = () => {
  const isAuthenticated : boolean = isAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} />
}