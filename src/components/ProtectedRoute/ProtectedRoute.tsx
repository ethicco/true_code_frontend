import type { FC, ReactNode } from "react";
import { Navigate } from "react-router";
import { useMe } from "@/features/Main/hooks";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { data, isLoading, isError } = useMe();

  if (isLoading) {
    return null;
  }

  if (isError || !data) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
