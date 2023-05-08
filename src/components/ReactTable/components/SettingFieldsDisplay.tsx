import SettingsIcon from "@mui/icons-material/Settings";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/system";
import { Key, memo, useEffect, useMemo, useState } from "react";
import { Column } from "react-table";

type SettingFieldsDisplayPros<T extends object> = {
  columns: any;
  disabled?: boolean;
  callBackColumnsDisplay: (columnsSeleted: Column[]) => void;
};

type ItemFieldPros = {
  Header: string;
  display: boolean;
};

const CustomizedButton = styled(Button)`
  margin-left: 10px;
`;
function SettingFieldsDisplayComponent<T extends object>({
  columns,
  disabled = false,
  callBackColumnsDisplay,
}: SettingFieldsDisplayPros<T>) {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [columnOptions, setColumnOptions] = useState<any>([]);
  const [key, setKey] = useState<any>(Math.random());
  const handleChange = (item: ItemFieldPros, index: Key) => {
    const options = columnOptions;
    if (options[index].display) {
      options[index].display = false;
    } else {
      options[index].display = true;
    }
    setKey(Math.random());
    setColumnOptions(options);
  };

  useEffect(() => {
    setColumnOptions(columns);
    callBackColumnsDisplay(columns);
    setKey(Math.random());
  }, []);

  const openDialog = () => {
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleSubmit = () => {
    callBackColumnsDisplay(columnOptions);
    setShowDialog(false);
  };

  const content = useMemo(
    () => (
      <Grid container key={key}>
        {columnOptions?.map((c: ItemFieldPros, index: Key) => (
          <Grid key={index} item md={6} xs={12}>
            <Typography onClick={() => handleChange(c, index)}>
              <Checkbox
                checked={c.display ? true : false}
                inputProps={{ "aria-label": "controlled" }}
              />
              {c.Header}
            </Typography>
          </Grid>
        ))}
      </Grid>
    ),
    [key]
  );

  return (
    <>
      {!disabled ? (
        <CustomizedButton
          variant="outlined"
          startIcon={<SettingsIcon />}
          onClick={openDialog}
        >
          Custom
        </CustomizedButton>
      ) : null}

      <Dialog
        open={showDialog}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        {/* <DialogTitle>Setting fields display</DialogTitle> */}
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const SettingFieldsDisplay = memo(SettingFieldsDisplayComponent);

export { SettingFieldsDisplay };
