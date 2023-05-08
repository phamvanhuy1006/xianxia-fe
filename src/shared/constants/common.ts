import { ModalsActionProps } from "src/shared/models/common.model";

export const COLORS = {
    TEXT_PRIMARY: '#544949',
    SECONDARY_BUTTON: '#E6EAF9',
    DISABLED_BACKGROUND_AUTOCOMPLETE: '#e7e7e7',
    WHITE: '#ffffff',
    BLACK: '#000000',
    BUTTON_CREATE: '#36B37E',
    BORDER: '#EAEDEE',
    TITLE_TABLE: '#4D4D61',
    RED: '#f44336',
    YELLOW: '#ffd392',
    BLUE: '#c1e3f6',
    LIGHT_GREEN: '#99dc56',
    DARK_GREEN: '#007d4c',
    TEXT: '#614c4c',
    TEXT_DISABLED: '#614c4c',
    GRAY: '#96999c',
    BACKGROUND_LOADING: 'rgba(0, 0, 0, 0.4)',
    HOVER_BACKGROUND_AUTOCOMPLETE: 'rgba(0, 0, 0, 0.04)',
    DISABLED_BORDER_AUTOCOMPLETE: '#ababab',
    BORDER_AUTOCOMPLETE: '#c4c4c4',
    BORDER_GRAY: 'rgba(224, 224, 224, 1)',
    TABLE_HEADER_BACKGROUND: '#e4e4e4',
    BORDER_ERROR_TEXTFIELD: '#d32f2f',
    WARNING: '#ff9800',
    ACTIVE: '#36B37E',
    IN_ACTIVE: '#FF5630',
    PRIMARY: '#49C4DF',
    BG_SEARCH: '#F9E6D4',
    BG_ADD: '#F1A874',
    BG_COLORS: '#FEEFEA',
  };

  export const rowsPerPageOptions = [10, 20, 50];

export const MODALS_ACTIONS: ModalsActionProps = {
    ADD: "ADD",
    EDIT: "EDIT",
    VIEW: "VIEW",
    DELETE: "DELETE"
};