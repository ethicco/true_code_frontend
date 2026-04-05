import type { FC, ReactNode } from "react";
import { Navigate } from "react-router";
import { getCookie } from "../../api/cookies";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const token = getCookie("accessToken");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
