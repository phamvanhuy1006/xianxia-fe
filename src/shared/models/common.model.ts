export type ModalActions = "ADD" | "EDIT" | "VIEW" | "DELETE";

export interface ModalsActionProps {
  [x: string]: ModalActions;
}

export type UnknownObj = any

export type SortDirectionType = "asc" | "desc";
