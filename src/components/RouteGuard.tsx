import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "store";

const RouteGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default RouteGuard;
