import React, { useEffect, useReducer } from "react";
import SlashScreen from "src/components/SlashScreen";
import Toast from "src/components/Toast";
import { useSetToastInformationState } from "src/redux/slice/toastMessage";
import { useLazyGetCurrentUserQuery } from "src/services/user";
import { STATUS_TOAST } from "src/shared/constants";

enum ACTION_TYPE {
  INITIALIZE = "INITIALIZE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

interface InitialAuthStateProps {
  isAuthenticated: boolean;
  isInitialized: boolean;
}

export const initialAuthState: InitialAuthStateProps = {
  isAuthenticated: false,
  isInitialized: false,
};

const reducer = (state: any, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case ACTION_TYPE.INITIALIZE: {
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    }
    case ACTION_TYPE.LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: !!user,
        user,
      };
    }
    case ACTION_TYPE.LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
};

const AuthContext = React.createContext({
  ...initialAuthState,
  login: (data: any) => Promise,
  logout: () => Promise,
});

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const [getCurrentUser] = useLazyGetCurrentUserQuery();
  const { setToastInformation } = useSetToastInformationState();

  const login = async (data: any) => {
    localStorage.setItem("token", data.content.token);
    localStorage.setItem("refreshToken", data.content.refreshToken);
    let userInfo = null;

    try {
      if (data.content.token) {
        userInfo = await getCurrentUser("").unwrap();
      }
    } catch (error) {
      localStorage.clear();
      setToastInformation({
        status: STATUS_TOAST.ERROR,
        message: STATUS_TOAST.ERROR_USER,
      });
    } finally {
      dispatch({
        type: ACTION_TYPE.LOGIN,
        payload: {
          user: userInfo,
        },
      });
    }
    return true;
  };

  const logout = () => {
    localStorage.clear();
    dispatch({ type: ACTION_TYPE.LOGOUT });
  };

  const initData = async () => {
    const token = localStorage.getItem("token");
    let userInfo: any = null;
    try {
      if (token) {
        userInfo = await getCurrentUser("").unwrap();
      }
    } catch (error) {
      //
    } finally {
      setTimeout(() => {
        dispatch({
          type: ACTION_TYPE.INITIALIZE,
          payload: {
            isAuthenticated: Boolean(token && userInfo),
            user: userInfo,
          },
        });
      }, 200);
    }
  };

  useEffect(() => {
    initData();
    // eslint-disable-next-line
  }, []);

  if (!state.isInitialized) {
    return <SlashScreen />;
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          ...state,
          logout,
          login,
        }}
      >
        {children}
      </AuthContext.Provider>
      <Toast />
    </>
  );
};

export default AuthContext;
