import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import SCREEN_PATHS from "src/shared/constants/screenPaths";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children } = props;
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={SCREEN_PATHS.LOGIN} replace/>;
  }

  return <>{children}</>;
};

export default AuthGuard;
