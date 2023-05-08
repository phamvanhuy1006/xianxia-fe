import React, { useMemo, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

//--- Material UI
import { Box, Popover } from "@mui/material";
import { makeStyles } from "@mui/styles";
//--- Others
import clsx from "clsx";
import { vi } from "date-fns/locale";
import moment from "moment";
import {
    DateRangePicker,
    Range,
    RangeKeyDict,
    StaticRange
} from "react-date-range";
import { DATE_FORMAT } from "src/shared/constants";
import { UnknownObj } from "src/shared/models/common.model";
import ButtonShared from "../ButtonShared";
import TextFieldCustom from "../TextFieldCustom";

const useStyles = makeStyles(() => ({
  dateRangeContainer: {
    padding: "10px",
    "& span.rdrDayNumber": {
      position: "absolute",
      display: "flex",
    },
    "& button.rdrStaticRange.rdrStaticRangeSelected": {
      color: "#849095",
    },
  },
  btnOKDate: {
    height: "35px",
    width: "40px",
  },
  btnClear: { height: "35px", width: "40px" },
  activeLabel: {
    color: "rgb(61, 145, 255) !important",
  },
  defaultLabel: {
    fontWeight: 600,
    color: "#849095",
  },
}));

const KEY_NAME = "selection";

interface IDateRange {
  startDate: string | null | Date | undefined;
  endDate: string | null | Date | undefined;
  key?: string;
}
interface IReactDateRangePickerCustom {
  initialDateRange: IDateRange;
  onChange: (dateRange: IDateRange) => void;
}

export const ReactDateRangePickerCustom = (
  props: IReactDateRangePickerCustom
) => {
  const { initialDateRange, onChange } = props;

  const classes = useStyles();

  const convertInitialDateRange =
    initialDateRange.startDate || initialDateRange.endDate
      ? {
          startDate: initialDateRange.startDate
            ? new Date(moment(initialDateRange.startDate).format())
            : new Date(),
          endDate: initialDateRange.endDate
            ? new Date(moment(initialDateRange.endDate).format())
            : new Date(),
          key: KEY_NAME,
        }
      : { startDate: new Date(), endDate: new Date(), key: KEY_NAME };

  //--- State
  const [anchorElDate, setAnchorElDate] = useState<any>(null);
  const [dateRange, setDateRange] = useState<Range>(
    convertInitialDateRange as Range
  );
  const [selectedStaticRange, setSelectedStaticRange] = useState<string | null>(
    null
  );

  //--- Live date
  const openLiveDate = Boolean(anchorElDate);
  const idLiveDate = openLiveDate ? "live-date-popover" : undefined;

  const handleClickSelectDate = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setAnchorElDate(event.target);
  };

  const handleCloseSelectDate = () => {
    setDateRange(convertInitialDateRange as Range);
    setAnchorElDate(null);
  };

  const handleChangeModifiedDateRange = (dataRange: RangeKeyDict) => {
    setSelectedStaticRange(null);
    setDateRange(dataRange[KEY_NAME] as Range);
  };

  const displayValue = useMemo(() => {
    let result = "";
    if (initialDateRange?.startDate || initialDateRange?.endDate) {
      const _startDate = initialDateRange?.startDate
        ? moment(initialDateRange?.startDate).format(DATE_FORMAT)
        : "";
      const _endDate = initialDateRange?.endDate
        ? moment(initialDateRange?.endDate).format(DATE_FORMAT)
        : "";
      result = `${_startDate} - ${_endDate}`;
    }
    return result;
  }, [initialDateRange]);

  const defaultStaticRanges = [
    {
      label: "Hôm nay",
      range: () => ({
        startDate: moment().toDate(),
        endDate: moment().toDate(),
      }),
      hasCustomRendering: true,
      isSelected() {
        return false;
      },
    },
    {
      label: "Hôm qua",
      range: () => ({
        startDate: moment().subtract(1, "days").toDate(),
        endDate: moment().subtract(1, "days").toDate(),
      }),
      hasCustomRendering: true,
      isSelected() {
        return false;
      },
    },
    {
      label: "7 ngày qua",
      range: () => ({
        startDate: moment().subtract(6, "days").toDate(),
        endDate: moment().toDate(),
      }),
      hasCustomRendering: true,
      isSelected() {
        return false;
      },
    },
    {
      label: "Tháng này",
      range: () => ({
        startDate: moment().startOf("month").toDate(),
        endDate: moment().endOf("month").toDate(),
      }),
      key: 1,
      hasCustomRendering: true,
      isSelected(test: Range) {
        return false;
      },
    },
    {
      label: "Tháng trước",
      range: () => ({
        startDate: moment().subtract(1, "month").startOf("month").toDate(),
        endDate: moment().subtract(1, "month").endOf("month").toDate(),
      }),
      hasCustomRendering: true,
      isSelected() {
        return false;
      },
    },
  ];

  const renderStaticRangeLabel = (staticRange: StaticRange) => (
    <div
      className={clsx(classes.defaultLabel, {
        [classes.activeLabel]: staticRange.label === selectedStaticRange,
      })}
      onClick={() => {
        setTimeout(() => {
          setSelectedStaticRange(staticRange.label as string);
        }, 100);
        const staticRangeDate = {
          endDate: staticRange.range().endDate,
          startDate: staticRange.range().startDate,
          key: "selection",
        };
        onChange(staticRangeDate as IDateRange);
        setAnchorElDate(null);
      }}
    >
      {staticRange.label}
    </div>
  );

  const onOK = () => {
    onChange(dateRange as IDateRange);
    setAnchorElDate(null);
  };

  const onClear = () => {
    onChange({ startDate: "", endDate: "", key: KEY_NAME });
    setDateRange({ startDate: new Date(), endDate: new Date(), key: KEY_NAME });
  };

  return (
    <>
      <TextFieldCustom
        inputProps={{ readOnly: true }}
        value={displayValue}
        onClick={handleClickSelectDate}
        placeholder="Chọn thời gian"
      />

      <Popover
        id={idLiveDate}
        open={openLiveDate}
        anchorEl={anchorElDate}
        onClose={handleCloseSelectDate}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className={classes.dateRangeContainer}>
          <DateRangePicker
            months={2}
            direction="horizontal"
            onChange={(item: UnknownObj) => handleChangeModifiedDateRange(item)}
            ranges={[dateRange]}
            locale={vi}
            staticRanges={defaultStaticRanges}
            inputRanges={[]}
            showDateDisplay={false}
            renderStaticRangeLabel={renderStaticRangeLabel}
            minDate={moment("01-01-1990").toDate()}
            // showMonthAndYearPickers={false}
          />
        </div>

        <Box
          padding="0 20px 5px 5px"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          {/* <Button variant="contained" size="small" className={classes.btnClear} onClick={onOK}>
                        Clear
                    </Button>
                    <Button variant="contained" size="small" className={classes.btnOKDate} onClick={onOK}>
                        OK
                    </Button> */}
          <ButtonShared
            className={classes.btnOKDate}
            color="white"
            // startIcon={<ClearIcon />}
            label="Cancel"
            onClick={onClear}
          />
          <ButtonShared
            onClick={onOK}
            className={classes.btnOKDate}
            color="yellow"
            label="Ok"
            // startIcon={isLoading ? <CircularProgress color="inherit" size="20px" /> : <SearchIcon />}
          />
        </Box>
      </Popover>
    </>
  );
};

export default ReactDateRangePickerCustom;
