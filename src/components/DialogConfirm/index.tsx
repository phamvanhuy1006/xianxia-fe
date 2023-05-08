import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  SxProps,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";
import { COLORS } from "src/shared/constants";

interface DialogConfirmPropsModels {
  children: ReactNode;
  open: boolean;
  handleClose?: () => void;
  dialogTitleProps?: {
    sx?: SxProps;
    title: string | null;
  };
  maxWidth: Breakpoint;
  dialogProps?: any;
  actions: ReactNode[];
}

const DialogConfirm = (props: DialogConfirmPropsModels) => {
  const {
    children,
    open,
    maxWidth,
    handleClose,
    dialogTitleProps,
    dialogProps,
    actions,
  } = props;
  return (
    <Dialog
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      {...dialogProps}
    >
      <DialogTitle
        id="scroll-dialog-title"
        sx={{ backgroundColor: "#3853A4", ...dialogTitleProps?.sx }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{ color: COLORS.WHITE, fontSize: "24px", fontWeight: 700 }}
          >
            {dialogTitleProps?.title}
          </Typography>
          <IconButton
            aria-label="close"
            sx={{ color: COLORS.BLACK }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ paddingX: 3 }}>
        {actions.map((ActionComponent, index) => {
          return <React.Fragment key={index}>{ActionComponent}</React.Fragment>;
        })}
      </DialogActions>
    </Dialog>
  );
};
export default DialogConfirm;
