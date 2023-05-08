import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {
    IconButton,
    MenuItem,
    MenuList,
    Popover,
    Typography
} from "@mui/material";

interface MenuListActionsProps {
  actionEdit?: (param: any) => void | undefined;
  actionView?: (param: any) => void | undefined;
  actionDelete?: (param: any) => void | undefined;
  actionActive?: (param: any) => void | undefined;
  actionShowReview?: (param: any) => void;
  actionHideReview?: (param: any) => void;
  actionAnswerReview?: (param: any) => void | undefined;
  actionRemoveAnswerReview?: (param: any) => void | undefined;
  actionHandle?: (param: any) => void | undefined;
  actionChangePassword?: (param: any) => void | undefined;
  dataSelected?: any;
  menuId?: any;
  handleCloseActionMenu?: () => void;
  open?: boolean | any;
  anchorEl?: any;
  handleOpenActionMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MenuListActions = (props: MenuListActionsProps) => {
  const {
    actionView,
    actionEdit,
    actionDelete,
    dataSelected,
    actionHandle,
    actionChangePassword,
    handleCloseActionMenu,
    menuId,
    open,
    handleOpenActionMenu,
    anchorEl,
  } = props;

  const listOptions = [
    {
      icon: <VisibilityIcon className="icon-view" />,
      label: "Xem",
      action: actionView,
    },
    {
      icon: <VisibilityIcon className="icon-view" />,
      label: dataSelected?.status === "Processed" ? "Xem" : "Xử lý",
      action: actionHandle,
    },
    {
      icon: <EditIcon className="icon-edit" />,
      label: "Chỉnh sửa",
      action: actionEdit,
    },
    {
      icon: <DeleteForeverIcon className="icon-delete" />,
      label: "Xóa",
      action: actionDelete,
    },
    {
      icon: <VpnKeyIcon className="icon-view" />,
      label: "Đổi mật khẩu",
      action: actionChangePassword,
    },
  ];

  return (
    <>
      <IconButton aria-label="more" onClick={(e) => handleOpenActionMenu(e)}>
        <MoreHorizIcon />
      </IconButton>

      {open && (
        <Popover
          id={menuId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseActionMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuList>
            {listOptions.map((option, xIndex) => {
              // eslint-disable-next-line array-callback-return
              if (!option.action) return;
              return (
                <MenuItem onClick={option.action} key={xIndex}>
                  {option.icon}
                  <Typography marginLeft={2} variant="inherit">
                    {option.label}
                  </Typography>
                </MenuItem>
              );
            })}
          </MenuList>
        </Popover>
      )}
    </>
  );
};

export default MenuListActions;
