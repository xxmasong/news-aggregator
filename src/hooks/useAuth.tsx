import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "@/providers/AuthContextProvider";
import { AuthUser } from "@/lib/graphql/user";

export default function useAuth() {
  const history = useHistory();
  const [auth, setAuth] = useContext(AuthContext);

  const setAuthUser = (user: AuthUser) => {
    setAuth!({ 
      ...auth!,
      user: user, 
    });
  };

  const setAuthorized = () => {
    setAuth!({ 
      user: null, 
      isAuthorized: true, 
      validating: true,
    });
    history.push("/");
    history.go(0);
  };

  const setUnauthorized = () => {
    localStorage.clear();
    setAuth!({ 
      user: null, 
      isAuthorized: false, 
      validating: true,
    });
    history.push("/");
    history.go(0);
  };

  return {
    user: auth?.user,
    isAuthorized: auth?.isAuthorized,
    validating: auth?.validating,
    setAuthUser,
    setAuthorized,
    setUnauthorized,
  };
}
