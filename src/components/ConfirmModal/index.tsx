import ButtonShared from "src/components/ButtonShared";
import DialogConfirm from "src/components/DialogConfirm";
import {
  useGetConfirmModalState,
  useSetConfirmModalState,
} from "src/redux/slice/confirmModal";
import { COLORS } from "src/shared/constants";
import ELEMENT_ID from "src/shared/constants/elementId";
import { convertBreakToHtml } from "src/shared/utils/helpers";

const ConfirmModal = (props: any) => {
  const {
    isOpen,
    title,
    message,
    cancelBtnLabel,
    okBtnLabel,
    isDeleteConfirm,
    isNoAction,
  } = useGetConfirmModalState();

  const { closeConfirmModal } = useSetConfirmModalState();
  const onOk = () => {
    const el = document.getElementById(ELEMENT_ID.CONFIRM_MODAL_OK_BUTTON);
    if (el) {
      el.click();
    }
    closeConfirmModal();
  };

  return (
    <>
      <DialogConfirm
        open={isOpen}
        handleClose={isNoAction ? undefined : closeConfirmModal}
        dialogTitleProps={{ title: title }}
        actions={[
          <ButtonShared
            loading={false}
            label={cancelBtnLabel}
            sx={{
              bgcolor: `${COLORS.WHITE} !important`,
              color: "#9c9c9c !important",
            }}
            onClick={isNoAction ? undefined : closeConfirmModal}
          />,
          <ButtonShared
            onClick={onOk}
            loading={false}
            label={okBtnLabel}
            sx={{ bgcolor: COLORS.LIGHT_GREEN, color: COLORS.BLACK }}
          />,
        ]}
        dialogProps={{ fullWidth: true }}
        maxWidth="sm"
      >
        <div
          style={{
            padding: "16px 0",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "20px",
            color: COLORS.TEXT,
          }}
          dangerouslySetInnerHTML={{
            __html: convertBreakToHtml(message),
          }}
        ></div>
      </DialogConfirm>
      <div id={ELEMENT_ID.CONFIRM_MODAL_OK_BUTTON} hidden></div>
    </>
  );
};

export default ConfirmModal;
