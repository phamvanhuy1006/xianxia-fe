import { useContext } from "react";
import AuthContext from "src/shared/contexts/jwt-auth";

const useAuth = () => useContext(AuthContext);

export default useAuth;
