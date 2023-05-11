import { Box } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import ButtonShared from "src/components/ButtonShared";
import LabelCustom from "src/components/LabelCustom";
import NeonButton from "src/components/NeonButton";
import TextFieldCustom from "src/components/TextFieldCustom";
import Icons from "src/shared/constants/svgIcons";
import { UnknownObj } from "src/shared/models/common.model";
import styles from "./login.module.scss";

interface LoginJWTProps {
  children?: React.ReactNode;
  handleSubmit?: UnknownObj;
  Styles?: UnknownObj;
  control?: UnknownObj;
  classes?: UnknownObj;
  setValue?: UnknownObj;
  setError?: UnknownObj;
  handleLogin?: UnknownObj;
  isLoading?: boolean;
}

const LoginJWT = ({
  control,
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
              render={({ field, fieldState: { error } }) => (
                <TextFieldCustom
                  {...field}
                  disabled={isLoading}
                  placeholder="Enter your user name"
                  variant="outlined"
                  helperText={error?.message}
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
              render={({ field, fieldState: { error } }) => (
                <TextFieldCustom
                  {...field}
                  disabled={isLoading}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  InputProps={{
                    endAdornment: (
                      <Box
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={handleClickShowPassword}
                      >
                        {!showPassword ? (
                          <Icons.EyeIcon />
                        ) : (
                          <Icons.EyeCloseIcon />
                        )}
                      </Box>
                    ),
                  }}
                  variant="outlined"
                  helperText={error?.message}
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
