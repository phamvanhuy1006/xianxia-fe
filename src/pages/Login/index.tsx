import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import useAuth from "src/hooks/useAuth";
import { useAppDispatch } from "src/redux/hooks";
import { setToken } from "src/redux/slice/auth";
import { useSetToastInformationState } from "src/redux/slice/toastMessage";
import { setCurrentUser } from "src/redux/slice/userInfo.ts";
import { useSelector } from "src/redux/store";
import { useLoginMutation } from "src/services/auth";
import { STATUS_CODE, STATUS_TOAST } from "src/shared/constants";
import Icons from "src/shared/constants/svgIcons";
import { LoginModel } from "src/shared/models/auth.model";
import styles from "./login.module.scss";
import LoginJWT from "./loginJWT";
const Login = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    setFocus,
  } = useForm({ defaultValues: { email: "", password: "" }, mode: "onBlur" });

  const [loginApi, { isLoading }] = useLoginMutation();

  const { setToastInformation } = useSetToastInformationState();
  const { login } = useAuth();
  const dispatch = useAppDispatch();
  const toastMessage = useSelector(
    (state: any) => state.toastNotification.toastMessage
  );

  const handleLogin = async (data: LoginModel) => {
    const requestLogin: LoginModel = {
      userName: data.userName.trim(),
      password: data.password,
    };

    try {
      const response: any = await loginApi(requestLogin);
      if (
        response &&
        response.data &&
        response.data.statusCode === STATUS_CODE.SUCCESS
      ) {
        const { content } = response.data;
        dispatch(setToken(content));
        dispatch(
          setCurrentUser({ username: content.fullName, token: content.token })
        );
        login(response.data);
      } else {
        setToastInformation({
          status: STATUS_TOAST.ERROR,
          message: STATUS_TOAST.ERROR_LOGIN,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item md={7} xs={12} sm={6}>
          {/* <Box className={styles.imageLogin}>
            <Box className={styles.loginIcon}>
              <Icons.LogoLog />
            </Box>
            <Box className={styles.imageLogin}>
              <Icons.LogoMain />
            </Box>
            <Box className={styles.imageDesignedBy}>
              <Icons.LogoIden />
            </Box>
          </Box> */}
        </Grid>
        <Grid item md={5} xs={12} sm={6}>
          <Box className={styles.login}>
            <form>
              <LoginJWT
                handleSubmit={handleSubmit}
                handleLogin={handleLogin}
                control={control}
                errors={errors}
                setValue={setValue}
                setError={setError}
                isLoading={isLoading}
              />
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
