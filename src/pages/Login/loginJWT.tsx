import { useState } from "react";
import { Box, Icon } from "@mui/material";
import { Controller } from "react-hook-form";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import TextFieldCustom from "../../components/TextFieldCustom";
import styles from "./login.module.scss";
import Icons from "src/shared/constants/svgIcons";
import LabelCustom from "src/components/LabelCustom";
import ButtonShared from "src/components/ButtonShared";

interface LoginJWTProps {
  children?: React.ReactNode;
  handleSubmit?: any;
  Styles?: any;
  control?: any;
  classes?: any;
  errors?: any;
  setValue?: any;
  setError?: any;
  handleLogin?: any;
  isLoading?: boolean;
}

const LoginJWT = ({
  control,
  errors,
  handleSubmit,
  handleLogin,
  isLoading,
}: LoginJWTProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box>
      <Box className={styles.loginContainer}>
        <Box>
          <Icons.LogoForm />
        </Box>
        <Box>
          <LabelCustom
            title="Welcome"
            sx={{ color: "#ABABAC", fontSize: "24px", fontWeight: 400 }}
          />
        </Box>
      </Box>
      <form>
        <Box mt={5}>
          <Box>
            <Box style={{ display: "flex", marginBottom: "5px" }}>
              <Icons.UserIconLog />
              <LabelCustom title="User name" className={styles.textLabel} />
            </Box>
            <Controller
              name="userName"
              rules={{
                required: "This field is required.",
              }}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextFieldCustom
                  {...field}
                  disabled={isLoading}
                  name={field.name}
                  placeholder="Enter your user name"
                  inputRef={field.ref}
                  sx={{
                    "& .MuiInputBase-input": {
                      background: "#fff",
                      borderRadius: "10px",
                      borderBottom: "none",
                      paddingBottom: "13px",
                      fontSize: "14px",
                    },
                    "& .MuiInputBase-root:before": {
                      borderBottom: "0px solid rgba(0,0, 0.42)",
                      content: "none",
                    },
                  }}
                  variant="outlined"
                  helperText={errors?.userName?.message}
                  error={!!errors?.userName?.message}
                />
              )}
            />
          </Box>
          <Box mt={3}>
            <Box style={{ display: "flex", marginBottom: "5px" }}>
              <Icons.LockIcon />
              <LabelCustom title="Password" className={styles.textLabel} />
            </Box>
            <Controller
              name="password"
              rules={{
                required: { value: true, message: "This field is required." },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextFieldCustom
                  {...field}
                  name={field.name}
                  disabled={isLoading}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  inputRef={field.ref}
                  sx={{
                    "& .MuiInputBase-input": {
                      background: "#fff",
                      borderRadius: "10px",
                      borderBottom: "none",
                      paddingBottom: "13px",
                      paddingRight: "0px",
                      height: "20px",
                      fontSize: "14px",
                    },
                    "& .MuiInputBase-root:before": {
                      borderBottom: "0px solid rgba(0,0, 0.42)",
                      content: "none",
                    },
                    ".MuiInputBase-root": {
                      backgroundColor: "#fff",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <Box
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? (
                          <Icons.EyeIcon />
                        ) : (
                          <Icons.EyeCloseIcon />
                        )}
                      </Box>
                    ),
                  }}
                  variant="outlined"
                  helperText={errors?.password?.message}
                  error={!!errors?.password?.message}
                />
              )}
            />
          </Box>
          <Box className={styles.btnLogin}>
            <ButtonShared
              onClick={handleSubmit(handleLogin)}
              className={styles.inputLogin}
              type="submit"
              label="Login"
              loading={isLoading}
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};
export default LoginJWT;
