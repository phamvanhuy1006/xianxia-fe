import {
    Pagination as MPagination,
    PaginationProps as MPaginationProps,
    TablePagination,
  } from "@mui/material";
  import { ReactElement, useCallback } from "react";
  import { TableInstance } from "react-table";
  import TablePaginationActions from "./PaginationAction";
  
  type PaginationProps<T extends object> = {
    instance: TableInstance<T>;
    type?: "table" | "normal";
    nPaginationProps?: MPaginationProps;
  };
  
  function Pagination<T extends object>({
    instance,
    type = "table",
    nPaginationProps,
  }: PaginationProps<T>): ReactElement {
    const {
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      // Get the state from the instance
      state: { pageIndex, pageSize },
    } = instance;
  
    const handleChangePage = useCallback(
      (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        gotoPage(newPage);
      },
      [gotoPage, nextPage, pageIndex, previousPage]
    );
  
    const handleChangeRowsPerPage: React.ChangeEventHandler<
      HTMLTextAreaElement | HTMLInputElement
    > = useCallback(
      (e) => {
        setPageSize(Number(e.target.value));
      },
      [setPageSize]
    );
  
    const handleChangeNormalPage = (
      event: React.ChangeEvent<unknown>,
      value: number
    ) => {
      gotoPage(value - 1);
    };
  
    return type === "table" ? (
      <TablePagination
        rowsPerPageOptions={[10, 50, 100, { label: "All", value: -1 }]}
        colSpan={instance.allColumns.length}
        count={pageCount}
        rowsPerPage={pageSize}
        page={pageIndex}
        SelectProps={{
          inputProps: {
            "aria-label": "rows per page",
          },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    ) : (
      <MPagination
        count={Math.ceil(pageCount / pageSize)}
        color="primary"
        page={pageIndex + 1}
        onChange={handleChangeNormalPage}
        {...nPaginationProps}
      />
    );
  }
  
  export default Pagination
  