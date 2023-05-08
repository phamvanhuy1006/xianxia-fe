import {
    Box,
    ClickAwayListener,
    PaginationProps,
    Paper,
    SortDirection,
    Stack,
    StackProps,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableContainerProps,
    TableHead,
    TableProps,
    TableSortLabel,
    Typography
} from "@mui/material";
import { SxProps } from "@mui/system";
import clsx from "clsx";
import { get } from "lodash";
import { ReactElement, useEffect } from "react";
import {
    Row as RowProps,
    TableOptions,
    usePagination,
    useSortBy,
    useTable
} from "react-table";
import { actionHook, hooks, selectionHook } from "src/hooks/useTableHook";
import { SORT_DIRECTION } from "src/shared/constants";
import { SortDirectionType, UnknownObj } from "src/shared/models/common.model";
import { TableSkeleton, TableSkeletonType } from "../SkeletonCustom/TableSkeleton";
import { Row } from "./components";
import { EmptyTable } from "./EmptyTable";
import Pagination from "./Pagination";

export type PaginationMeta = {
  pageIndex: number;
  pageSize: number;
  sortBy: any;
  sortColumn?: string;
  sortDirection?: string;
};

export type ActionColumnConfig = {
  editText?: string;
  deleteText?: string;
  deleteConfirmText?: string;
};

enum TypeCell {
  Header = 0,
  Body = 1,
}

interface TableProperties<T extends object> extends TableOptions<T> {
  tableProps?: TableProps;
  sx?: SxProps;
  onRowClick?(row: RowProps<T>): void;
  onClickAway?(): void;
  loading?: boolean;
  searchable?: boolean;
  selection?: boolean;
  isTableCalendar?: boolean;
  skeletonConfig?: TableSkeletonType;
  pageCount?: number;
  handleChangeParams?(params: UnknownObj): void;
  handleChangePagination?(paginationMeta: PaginationMeta): void;
  isPreviousData?: boolean;
  actionConfig?: ActionColumnConfig;
  onActionEdit?(props: OriginalRowType): void;
  onActionDelete?(props: OriginalRowType): void;
  showPagination?: boolean;
  nPaginationProps?: PaginationProps;
  nPaginationContainerProps?: StackProps;
  tableContainerProps?: TableContainerProps;
  showTotal?: boolean;
  keyName?: string;
}

export type OriginalRowType = UnknownObj;

function Table<T extends object>(props: TableProperties<T>): ReactElement {
  const {
    columns,
    data,
    // pageCount = 0,
    tableProps,
    selection = false,
    actionConfig,
    onActionEdit,
    onActionDelete,
    onRowClick,
    onClickAway = () => undefined,
    handleChangePagination,
    loading,
    defaultActionEdit,
    skeletonConfig,
    sx,
    showPagination = true,
    tableContainerProps,
    showTotal = false,
    keyName = "",
    ...useTableOptions
  } = props;

  const instance = useTable<T>(
    {
      columns,
      data,
      initialState: { pageSize: 10, sortBy: [] },
      autoResetSortBy: false,
      manualSortBy: true,
      manualPagination: true,
      autoResetPage: false,
      autoResetExpanded: false,
      ...useTableOptions,
    },
    ...hooks,
    useSortBy,
    usePagination,
    selectionHook(selection),
    actionHook({
      actionConfig,
      onActionEdit,
      onActionDelete,
      defaultActionEdit,
    })
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize, sortBy },
  } = instance;

  const hasRowClick = typeof onRowClick === "function";

  useEffect(() => {
    if (typeof handleChangePagination === "function") {
      handleChangePagination({
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortBy: sortBy,
      });
    }
  }, [handleChangePagination, pageIndex, pageSize, sortBy]);

  if (loading && !data.length) {
    return <TableSkeleton {...skeletonConfig} />;
  }

  if (!loading && !data.length) {
    return <EmptyTable />;
  }

  return (
    <Paper>
      <ClickAwayListener onClickAway={onClickAway}>
        <TableContainer
          className={clsx("table-container")}
          component={Paper}
          sx={sx}
          {...tableContainerProps}
        >
          <MuiTable {...tableProps} {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => {
                const { key, ...headerGroupProps } =
                  headerGroup.getHeaderGroupProps();
                return (
                  <Row key={key} {...headerGroupProps}>
                    {headerGroup.headers.map((column, index) => {
                      const { key, ...cellHeaderProps } = column.getHeaderProps(
                        column.getSortByToggleProps()
                      );

                      return (
                        <TableCell
                          variant="head"
                          sortDirection={
                            column.isSortedDesc
                              ? (SORT_DIRECTION.DESC as SortDirection)
                              : (SORT_DIRECTION.ASC as SortDirection)
                          }
                          key={key}
                          {...cellHeaderProps}
                        >
                          <TableSortLabel
                            active={column.isSorted}
                            onClick={() => {
                              //
                            }}
                            // react-table has a unsorted state which is not treated here
                            direction={
                              column.isSortedDesc
                                ? (SORT_DIRECTION.DESC as SortDirectionType)
                                : (SORT_DIRECTION.ASC as SortDirectionType)
                            }
                            hideSortIcon={
                              column.id === "_selector" ||
                              column.id === "__action" ||
                              column.disableSortBy
                            }
                          >
                            <Stack direction="row" alignItems="center">
                              {column.render("Header")}
                            </Stack>
                          </TableSortLabel>
                        </TableCell>
                      );
                    })}
                  </Row>
                );
              })}
            </TableHead>

            <TableBody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                const { key, ...getRowProps } = row.getRowProps();
                const rowKey = keyName ? get(row, keyName, key) : key;
                return (
                  <Row
                    onClick={() => hasRowClick && onRowClick(row)}
                    hasRowClick={hasRowClick}
                    hover
                    key={rowKey}
                    {...getRowProps}
                  >
                    {row.cells.map((cell, index) => {
                      const { key, ...getCellProps } = cell.getCellProps();
                      return (
                        <TableCell
                          variant="body"
                          key={key}
                          {...getCellProps}
                          sx={{
                            padding: 1,
                            backgroundColor: "white",
                            ...stickyFirstCol(index, TypeCell.Body),
                            ...cell.column?.sx,
                          }}
                        >
                          <Box>{cell.render("Cell")}</Box>
                        </TableCell>
                      );
                    })}
                  </Row>
                );
              })}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </ClickAwayListener>
      {showPagination && (
        <MuiTable>
          <TableBody>
            <Row>
              {showTotal && (
                <TableCell
                  sx={{
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "22px",
                  }}
                >
                  <Typography>Total: {rows.length}</Typography>
                </TableCell>
              )}
              <Pagination<T> instance={instance} />
            </Row>
          </TableBody>
        </MuiTable>
      )}
    </Paper>
  );
}

const stickyFirstCol = (index: number, type: number) => {
  if ((index == 0 || index == 1) && type === TypeCell.Header) {
    return {
      position: "sticky",
      left: 0,
      zIndex: 1,
    };
  }
};

export { Table };

