// src/ProtectedRoute.tsx
import type { ProtectedRouteProps } from "../interface/interface";
import { Navigate } from "react-router-dom";
import { GetToken } from "../helper/helperFunction"
import { Login } from "../navigation/path"

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = GetToken();
  
  if (!token) {
    return <Navigate to={Login} replace />;
  }

  return children;
}
