import type { FC, ReactNode } from "react";
import { Navigate } from "react-router";
import { useMe } from "@/features/Main/hooks";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { data, isLoading } = useMe();

  if (!data && !isLoading) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
