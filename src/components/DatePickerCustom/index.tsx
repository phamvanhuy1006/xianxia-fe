import { Button, DialogActions, Typography } from "@mui/material";
import { DesktopDatePicker, DesktopDateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { COLORS, DATE_FORMAT, DATE_TIME_FORMAT } from "src/shared/constants";
import { UnknownObj } from "src/shared/models/common.model";
import TextFieldCustom from "../TextFieldCustom";

const MyActionBar = ({ onCancel, onClear }: UnknownObj) => {
  return (
    <DialogActions>
      <Button
        onClick={(e) => {
          onClear(e);
        }}
      >
        clear
      </Button>
      <Button
        onClick={(e) => {
          onCancel(e);
        }}
      >
        cancel
      </Button>
    </DialogActions>
  );
};
interface DatePickerCustomPropsModel {
  onChange?: (params?: UnknownObj) => void;
  value?: UnknownObj;
  inputProps?: UnknownObj;
  staticDateTimePickerProps?: UnknownObj;
  isDateTimePicker?: UnknownObj;
  title?: UnknownObj;
  isRequired?: UnknownObj;
  sxTitle?: UnknownObj;
  disableFuture?: boolean;
  shouldDisableDate?: UnknownObj;
  disablePast?: boolean;
  minDate?: Date;
  maxDate?: Date;
}
const DatePickerCustom = (props: DatePickerCustomPropsModel) => {
  const {
    onChange,
    value,
    inputProps = {},
    staticDateTimePickerProps = {},
    isDateTimePicker,
    title,
    isRequired,
    sxTitle,
    disableFuture,
    minDate,
    maxDate,
  } = props;
  const [valueDate, setValueDate] = useState(null);
  const [error, setError] = useState({
    reason: null,
    valueError: null,
  });

  const Picker = isDateTimePicker ? DesktopDateTimePicker : DesktopDatePicker;
  const InputFormat = isDateTimePicker ? DATE_TIME_FORMAT : DATE_FORMAT;

  const popperSx = {
    "& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected": {
      backgroundColor: COLORS.PRIMARY,
    },
    "& .MuiButtonBase-root.MuiPickersDay-root": {
      borderRadius: 0,
    },
  };

  return (
    <>
      {title && (
        <Typography
          sx={{
            fontWeight: 700,
            color: COLORS.TEXT_PRIMARY,
            fontSize: 14,
            ...sxTitle,
          }}
        >
          {title} {isRequired && <span className="required"></span>}
        </Typography>
      )}
      <Picker
        {...staticDateTimePickerProps}
        toolbarTitle=""
        sx={{
          "& .MuiPickersToolbar-penIconButton": { display: "none" },
          "& .MuiPickersArrowSwitcher-root.MuiClockPicker-arrowSwitcher": {
            display: "none",
          },
          ...(staticDateTimePickerProps.sx || {}),
        }}
        onError={(reason, valueError) => {
          setError({ reason, valueError } as UnknownObj);
        }}
        disableFuture={disableFuture}
        showToolbar={!!isDateTimePicker}
        inputFormat={InputFormat}
        value={value || valueDate}
        onChange={onChange || setValueDate}
        minDate={minDate}
        maxDate={maxDate}
        renderInput={(params: UnknownObj) => (
          <TextFieldCustom
            onBlur={(e) => {
              inputProps.onBlur && inputProps.onBlur(e);
              if (error.valueError && error.reason) {
                !!onChange && onChange(null);
                setValueDate(null);
              }
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "12px",
                borderColor: COLORS.BORDER,
              },
            }}
            {...inputProps}
            {...params}
          />
        )}
        components={{
          ActionBar: (actionProps) => <MyActionBar {...actionProps} />,
        }}
        componentsProps={{
          actionBar: { actions: ["clear", "cancel"] },
        }}
        dayOfWeekFormatter={(day: UnknownObj) => {
          return `${day}`;
        }}
        PopperProps={{
          placement: "bottom-start",
          sx: popperSx,
        }}
      />
    </>
  );
};

export default DatePickerCustom;
