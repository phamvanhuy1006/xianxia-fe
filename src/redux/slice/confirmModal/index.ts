import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ELEMENT_ID from "src/shared/constants/elementId";
import REDUX_SLICE_NAMES from "src/shared/constants/reduxSliceNames";

interface InitialStateType {
  isOpen: boolean;
  title: string;
  message: string;
  cancelBtnLabel: string;
  okBtnLabel: string;
  isDeleteConfirm: boolean;
  isNoAction: boolean;
}

const initialState: InitialStateType = {
  isOpen: false,
  title: "Confirm",
  message: "",
  cancelBtnLabel: "Cancel",
  okBtnLabel: "OK",
  isDeleteConfirm: false,
  isNoAction: false,
};

const excludeFieldNames = [
  "message",
  "okBtnLabel",
  "title",
  "isNoAction",
  "cancelBtnLabel",
  "isDeleteConfirm",
];

export const confirmModalSlice = createSlice({
  name: REDUX_SLICE_NAMES.CONFIRM_MODAL,
  initialState,
  reducers: {
    setConfirmModalState: (state: any = initialState, action) => {
      if (action && action.payload) {
        for (const propertyName in initialState) {
          const isMessageClose =
            action.payload.isCloseCase &&
            excludeFieldNames.includes(propertyName);
          if (!isMessageClose) {
            state[propertyName] = action.payload[propertyName];
          }
        }
      }
    },
  },
});

const { setConfirmModalState } = confirmModalSlice.actions;

export const useGetConfirmModalState = () =>
  useSelector((state: any) => state[confirmModalSlice.name]);

export const useSetConfirmModalState = () => {
  const dispatch = useDispatch();
  const openConfirmModal = (options: any) => {
    const { onOk, ...stateOption } = options;
    const handleButton = document.getElementById(
      ELEMENT_ID.CONFIRM_MODAL_OK_BUTTON
    );
    if (onOk && typeof onOk === "function" && handleButton)
      handleButton.click = onOk;

    dispatch(
      setConfirmModalState({
        ...initialState,
        isOpen: true,
        isNoAction: !!stateOption?.isNoAction,
        isDeleteConfirm: !!stateOption?.isDeleteConfirm,
        ...stateOption,
      })
    );
  };

  const closeConfirmModal = () => {
    const handleButton = document.getElementById(
      ELEMENT_ID.CONFIRM_MODAL_OK_BUTTON
    );

    if (handleButton)
      handleButton.click = function () {
        //
      };
    dispatch(setConfirmModalState({ ...initialState, isCloseCase: true }));
  };

  return {
    openConfirmModal,
    closeConfirmModal,
  };
};

export default confirmModalSlice.reducer;
