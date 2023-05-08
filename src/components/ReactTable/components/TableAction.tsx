import { Stack } from "@mui/material";
import { memo, useState } from "react";
import { CellProps, Row } from "react-table";
import { ActionColumnConfig, OriginalRowType } from "../Table";
import MenuListActions from "src/components/MenuListActions";
import { UnknownObj } from "src/shared/models/common.model";
import { MESSAGES_CONFIRM } from "src/shared/constants";
import { useSetConfirmModalState } from "src/redux/slice/confirmModal";

interface TableActionProps<T extends object> extends CellProps<T> {
  actionConfig?: ActionColumnConfig;
  onActionEdit?(props: OriginalRowType): void;
  onActionDelete?: (props: OriginalRowType) => void;
}

export const TableActionContainer = (
  <Stack onClick={(e) => e.stopPropagation()} />
);

function TableAction<T extends object>(props: TableActionProps<T>) {
  const { row, onActionEdit, onActionDelete } = props;
  const { openConfirmModal } = useSetConfirmModalState();
  const { original } = row;

  const hasEdit = typeof onActionEdit === "function";
  const hasDelete = typeof onActionDelete === "function";

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const menuId = open ? "simple-popover" : undefined;

  const _delete = () => {
    if (hasDelete) {
      openConfirmModal({
        isOpen: true,
        title: "Delete",
        message: MESSAGES_CONFIRM.ConfirmModal,
        onOk: () => {
          onActionDelete(original as UnknownObj);
        },
      });
    }
  };

  const handleDelete = () => {
    _delete();
    handleCloseActionMenu();
  };

  const handleEdit = () => {
    if (hasEdit) {
      onActionEdit(original as UnknownObj);
      handleCloseActionMenu();
    }
  };

  const handleOpenActionMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseActionMenu = () => {
    setAnchorEl(null);
  };

  return (
    <MenuListActions
      anchorEl={anchorEl}
      menuId={menuId}
      open={open}
      actionEdit={() => handleEdit()}
      actionDelete={() => handleDelete()}
      handleCloseActionMenu={handleCloseActionMenu}
      handleOpenActionMenu={handleOpenActionMenu}
      dataSelected={{}}
    />
  );
}

export default memo(TableAction) as typeof TableAction;
