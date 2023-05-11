import { Box, SxProps, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React, { forwardRef, ReactElement } from "react";
import { COLORS } from "src/shared/constants";
import { UnknownObj } from "src/shared/models/common.model";

type VariantType = "outlined" | "filled" | "standard";
type TypeType = "password" | "number" | "text" | "tel" | "email";

export interface TextFieldCustomPropsModel {
  className?: string;
  defaultValue?: string;
  id?: string;
  value?: UnknownObj;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  label?: UnknownObj;
  onChange?: (
    parameters: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onBlur?: (
    parameters: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement,
      Element
    >
  ) => void;
  onKeyDown?: (parameters: React.KeyboardEvent<HTMLDivElement>) => void;
  onInput?: (parameters: React.FormEvent<HTMLDivElement>) => void;
  onClick?: (parameters: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  errorMessage?: UnknownObj;
  inputProps?: UnknownObj;
  InputProps?: {
    endAdornment?: UnknownObj;
    startAdornment?: UnknownObj;
    readOnly?: boolean;
  };
  type?: TypeType;
  variant?: VariantType;
  fullWidth?: boolean;
  placeholder?: UnknownObj;
  disabled?: boolean;
  formProps?: UnknownObj;
  SelectProps?: UnknownObj;
  title?: string | null;
  sx?: SxProps;
  autoFocus?: boolean;
  autoComplete?: string;
  endAdornment?: UnknownObj;
  helperText?: string;
  isRequired?: boolean;
  sxTitle?: SxProps;
  iconTitle?: ReactElement;
}
const useStyles = makeStyles((theme: UnknownObj) => ({
  textfield: {
    "& .MuiInputBase-root": {
      borderRadius: 12,
      backgroundColor: "#fff",
    },
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
  },
}));
const TextFieldCustom = forwardRef((props: TextFieldCustomPropsModel, ref) => {
  const {
    helperText,
    title,
    isRequired,
    sxTitle,
    sx,
    iconTitle,
    className,
    ...rest
  } = props;
  const classes = useStyles();
  return (
    <>
      {title && (
        <Box display="flex" alignItems="center" mb={1}>
          {iconTitle}
          <Typography
            sx={{
              fontWeight: 700,
              color: COLORS.TEXT_PRIMARY,
              fontSize: 14,
              ml: 1,
              ...sxTitle,
            }}
          >
            {title} {isRequired && <span className="required"></span>}
          </Typography>
        </Box>
      )}
      <TextField
        className={clsx(classes.textfield, className)}
        size="small"
        fullWidth
        error={!!helperText}
        helperText={helperText}
        inputProps={{
          autoComplete: "new-password",
        }}
        inputRef={ref}
        sx={{
          "& fieldset": {
            borderColor: COLORS.BORDER,
          },
          ...sx,
        }}
        {...rest}
      />
    </>
  );
});
export default TextFieldCustom;
