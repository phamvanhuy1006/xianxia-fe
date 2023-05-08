import { Box, SxProps, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React, { ReactElement } from "react";
import { COLORS } from "src/shared/constants";

type VariantType = "outlined" | "filled" | "standard";
type TypeType = "password" | "number" | "text" | "tel" | "email";

export interface TextFieldCustomPropsModel {
  className?: string;
  defaultValue?: string;
  id?: string;
  value?: any;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  label?: any;
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
  error?: boolean;
  errorMessage?: any;
  inputProps?: any;
  InputProps?: {
    endAdornment?: any;
    startAdornment?: any;
    readOnly?: boolean;
  };
  type?: TypeType;
  variant?: VariantType;
  fullWidth?: boolean;
  placeholder?: any;
  disabled?: boolean;
  name?: string;
  formProps?: any;
  SelectProps?: any;
  title?: string | null;
  sx?: SxProps;
  autoFocus?: boolean;
  autoComplete?: string;
  endAdornment?: any;
  helperText?: string;
  inputRef?: any;
  isRequired?: boolean;
  sxTitle?: SxProps;
  iconTitle?: ReactElement;
}
const useStyles = makeStyles((theme: any) => ({
  textfield: {
    "& .MuiInputBase-root": {
      borderRadius: 12,
      // width: '90%',
    },
    "& .MuiInputBase-input": {
      // marginRight: 5,
      // marginLeft: 5
    },
    "& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
      minHeight: "30px !important",
    },
  },
}));
const TextFieldCustom = (props: TextFieldCustomPropsModel) => {
  const {
    error,
    helperText,
    title,
    inputRef,
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
        error={error}
        helperText={helperText}
        inputProps={{
          autoComplete: "new-password",
        }}
        inputRef={inputRef}
        sx={{ "& fieldset": {
          borderColor: COLORS.BORDER
        }, ...sx }}
        {...rest}
      />
    </>
  );
};
export default TextFieldCustom;
