import React, { memo, useCallback } from "react";
import { Column, TableOptions } from "react-table";
import { usePagination } from "src/hooks/usePagination";
import { useSetToastInformationState } from "src/redux/slice/toastMessage";
import {
  useDeleteItemTableMutation,
  usePaginationQuery,
} from "src/services/pagination";
import { STATUS_CODE, STATUS_TOAST } from "src/shared/constants";
import { UnknownObj } from "src/shared/models/common.model";
import { OriginalRowType, Table } from "./Table";
import Toolbar from "./Toolbar";

interface ReactTableProps<T extends object> extends TableOptions<T> {
  searchColumns?: any;
  handleChangeParams?: (params: UnknownObj) => void;
  endpoint: string;
  deleteUrl?: string;
  exportUrl?: string;
  exportFileName?: string;
  templateUrl?: string;
  headerOptions?: React.ReactElement;
  selection?: boolean;
  columns: any;
  params?: Record<string, unknown>;
  data: readonly T[];
  showTotal?: boolean;
  isShowTotal?: boolean;
  totalColumn?: number;
  onActionCreate?: () => void;
  handleSubmitAll?: () => void;
  onActionEdit?(props: OriginalRowType): void;
  keyName?: string;
}
type Message = {
  type: "error" | "success" | "info";
  content?: string;
};

type ColumnWithDisplay = Column & {
  display?: boolean;
};

function ReactTable<T extends object>(props: ReactTableProps<T>) {
  const {
    columns,
    endpoint,
    searchColumns,
    params,
    selection = false,
    exportUrl,
    headerOptions,
    exportFileName,
    data,
    deleteUrl,
    onActionEdit,
    onActionCreate,
    handleSubmitAll,
    showTotal,
    isShowTotal,
    totalColumn,
    keyName = "",
    ...rest
  } = props;

  const [deleteItemTable] = useDeleteItemTableMutation();

  const { paginationData, handleChangeParams } = usePagination<any>(
    endpoint,
    params
  );

  const { setToastInformation } = useSetToastInformationState();

  const onActionDelete = useCallback(async (original: OriginalRowType) => {
    try {
      const response: any = await deleteItemTable({
        url: deleteUrl || "",
        params: {
          id: original?.id,
        },
      });
      if (response && response?.statusCode === STATUS_CODE.SUCCESS) {
        setToastInformation({
          status: STATUS_TOAST.SUCCESS,
          message: STATUS_TOAST.SUCCESS,
        });
      }
    } catch (error) {
      console.log(error);
      setToastInformation({
        status: STATUS_TOAST.ERROR,
        message: STATUS_TOAST.ERROR,
      });
    }
  }, []);

  const callBackColumnsDisplay = (cols: Column[]) => {
    cols = cols.filter((col: ColumnWithDisplay) => !!col.display);
  };

  return (
    <>
      <Toolbar
        searchColumns={searchColumns}
        handleChangeParams={handleChangeParams}
        callBackColumnsDisplay={callBackColumnsDisplay}
        loading={props.loading}
        {...props}
        headerOptions={headerOptions}
        onActionCreate={onActionCreate}
      />
      <Table
        onActionDelete={onActionDelete}
        onActionEdit={onActionEdit}
        columns={columns}
        selection={selection}
        exportUrl={exportUrl}
        exportFileName={exportFileName}
        {...paginationData}
        showTotal={showTotal}
        data={
          paginationData?.data?.length > 0 ? paginationData?.data : data || []
        }
        keyName={keyName}
      />
    </>
  );
}

export default memo(ReactTable) as typeof ReactTable;
