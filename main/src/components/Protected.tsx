import { Outlet, Navigate } from "react-router-dom";
import { userContextStore } from "../store/userStore";

const Protected = () => {
  
    const { isAuth } = userContextStore();
    if(!isAuth) return <Navigate to="/" replace />
    
    return <Outlet />
};

export default Protected;
