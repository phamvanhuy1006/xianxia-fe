import { Alert, Snackbar } from "@mui/material";
import { useSetToastInformationState } from "src/redux/slice/toastMessage";
import { useSelector } from "src/redux/store";

const Toast: () => JSX.Element = () => {
  const toastMessage = useSelector(
    (state: any) => state.toastNotification.toastMessage
  );
  const { setToastInformation } = useSetToastInformationState();
  const closeToast = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToastInformation({});
  };

  return (
    <>
      {toastMessage && Object.keys(toastMessage).length > 0 ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={Object.keys(toastMessage).length > 0}
          autoHideDuration={5000}
          onClose={closeToast}
        >
          <Alert
            onClose={closeToast}
            severity={toastMessage.status}
            sx={{ width: "100%" }}
          >
            {toastMessage.message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
};

export default Toast;
