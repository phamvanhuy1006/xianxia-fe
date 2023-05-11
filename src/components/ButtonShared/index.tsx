import LoadingButton from "@mui/lab/LoadingButton";
import { SxProps, Theme } from "@mui/material";
import clsx from "clsx";
import { ReactNode } from "react";
import { UnknownObj } from "src/shared/models/common.model";
import styles from "./styles.module.scss";

type TypeButton = "submit" | "reset" | "button";
type ColorType =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "white"
  | "yellow";
export interface ButtonSharedPropsModel {
  className?: string;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  label: string;
  type?: TypeButton;
  onClick?: (parameters?: UnknownObj) => void;
  color?: ColorType;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  isNeon?: boolean;
  children?: ReactNode;
}
const ButtonShared = (props: ButtonSharedPropsModel) => {
  const {
    loading,
    startIcon,
    label,
    sx,
    color,
    className,
    isNeon,
    disabled,
    children,
    ...rest
  } = props;
  const btnColor = styles[color || ""] || "";
  return (
    <LoadingButton
      loading={loading}
      loadingPosition="start"
      startIcon={startIcon}
      variant="outlined"
      size="large"
      sx={{
        textTransform: "capitalize",
        borderRadius: 2,
        ":hover": {
          boxShadow:
            "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px",
        },
        ...sx,
      }}
      disabled={disabled}
      className={clsx(styles.btn, className, {
        [styles.disabled]: disabled,
        [btnColor]: !disabled,
        [`button-submit`]: isNeon,
      })}
      {...rest}
    >
      {label}
      {children}
    </LoadingButton>
  );
};
export default ButtonShared;
