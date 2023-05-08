import { Navigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import { IRoutesState } from "src/modules/router/route.model";
import SCREEN_PATHS from "src/shared/constants/screenPaths";

interface GuestGuardProps {
  children: React.ReactNode;
  routes: IRoutesState[];
  path: string;
}

const GuestGuard = ({ children, path }: GuestGuardProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={SCREEN_PATHS.DASHBOARD} replace />;
  }
  return <>{children}</>;
};

export default GuestGuard;
