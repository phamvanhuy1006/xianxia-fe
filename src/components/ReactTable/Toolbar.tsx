import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import React from "react";
import { Column } from "react-table";
import { SettingFieldsDisplay } from "./components";
import FilterBar from "./components/FilterBar";

type UnknownObj = any;

type ToolbarProps<T extends object> = {
  onActionCreate?: () => void;
  loading: boolean;
  onActionFilter?: () => void;
  importUrl?: string;
  exportUrl?: string;
  exportFileName?: string;
  templateUrl?: string;
  isTableCalendar?: boolean;
  columns: readonly Column<T>[];
  headerOptions?: React.ReactElement;
  handleChangeParams: (params: UnknownObj) => void;
  callBackColumnsDisplay: (colums: Column[]) => void;
  searchColumns?: UnknownObj;
};

const CustomizedButton = styled(Button)`
  margin-left: 10px;
`;

export default function Toolbar<T extends object>({
  onActionCreate,
  searchColumns,
  callBackColumnsDisplay,
  handleChangeParams,
  importUrl,
  exportUrl,
  columns,
  headerOptions,
  isTableCalendar,
  templateUrl,
  exportFileName,
  loading,
  ...props
}: ToolbarProps<T>) {
  const onExport = async () => {
    //   exportApi(`${exportUrl}?rows=all`, exportFileName)
  };

  const onDownloadTemplate = async () => {
    if (templateUrl) {
      // exportApi(templateUrl, exportFileName || 'regions.xlsx')
    }
  };

  return (
    <>
      {!!searchColumns && searchColumns?.length > 0 ? (
        <FilterBar
          searchColumns={searchColumns}
          handleChangeParams={handleChangeParams}
          loading={loading}
        />
      ) : null}
      <Grid container flexDirection={"row"} mb={2}>
        <Grid item md={4} xs={8} display="flex" alignItems="center">
          {onActionCreate ? (
            <CustomizedButton
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={onActionCreate}
            >
              Add
            </CustomizedButton>
          ) : null}
        </Grid>
        <Grid item container md={8} xs={16} justifyContent={"flex-end"}>
          {false && (
            <SettingFieldsDisplay
              columns={columns}
              disabled={isTableCalendar}
              callBackColumnsDisplay={callBackColumnsDisplay}
            />
          )}

          {exportUrl ? (
            <CustomizedButton
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={() => {
                //
              }}
            >
              Export
            </CustomizedButton>
          ) : null}
          {importUrl ? (
            <>
              {/* <ImportData importUrl={importUrl} /> */}
              <CustomizedButton
                // variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={onDownloadTemplate}
              ></CustomizedButton>
            </>
          ) : null}
          {headerOptions ? (
            <Box marginLeft={1}>{headerOptions}</Box>
          ) : undefined}
        </Grid>
      </Grid>
    </>
  );
}
