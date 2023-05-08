import React from "react";
import clsx from "clsx";
import { AsyncPaginate, wrapMenuList } from "react-select-async-paginate";
import { components, MenuPlacement, MenuPosition } from "react-select";

//--- Material Control
import makeStyles from "@mui/styles/makeStyles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ClearIcon from "@mui/icons-material/Clear";
import { get } from "lodash";
import TextFieldCustom from "../TextFieldCustom";
import { SxProps, Typography } from "@mui/material";
import OptionView from "./OptionView";
import ErrorMessage from "src/components/ErrorMessage";
import { defaultAdditional, loadOptions } from "./utils";
import { COLORS } from "src/shared/constants";

const useStyles = makeStyles(() => ({
  error: {
    "& .react-select__control": {
      borderColor: `${COLORS.BORDER_ERROR_TEXTFIELD} !important`,
    },
    "& .react-select__control--is-focused": {
      boxShadow: "0 0 0 1px #ffffff",
      borderWidth: "2px",
    },
  },
  errors: {
    fontSize: "0.7rem",
  },
  textFiledCustom: {
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  iconReactSelect: {
    cursor: "pointer",
    color: "#757575",
  },
}));

const customStyles = {
  menu: (provided: any) => ({
    ...provided,
    zIndex: 998,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  loadingIndicator: () => ({
    display: "none",
  }),
  control: (styles: any, { isDisabled, isFocused }: any) => ({
    ...styles,
    // '.react-select__indicator.react-select__clear-indicator': {
    //   cursor: 'pointer'
    // },
    cursor: "text",
    "&:hover": {
      borderColor: "black",
    },
    "& .clear-icon": {
      opacity: 1,
    },
    fontSize: "16px",
    "& > div.div:nth-of-type(2)": {
      color: "black",
    },
    "& div": {
      color: `${COLORS.TEXT} !important`,
      fontSize: "16px",
      lineHeight: "20px",
    },
    "&.react-select__control--is-focused": {
      borderColor: COLORS.PRIMARY,
      boxShadow: "0 !important",
    },
    borderRadius: "12px",
    borderColor: isDisabled
      ? COLORS.DISABLED_BORDER_AUTOCOMPLETE
      : COLORS.BORDER,
    backgroundColor: isDisabled ? COLORS.DISABLED_BACKGROUND_AUTOCOMPLETE : "",
    minHeight: "47px",
    "&.css-ptukto-control:hover": { borderColor: "rgba(0, 0, 0, 0.87)" },
  }),
  placeholder: (styles: any) => ({
    ...styles,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "calc(100% - 12px)",
    opacity: 0.5,
  }),
  option: (styles: any, { isFocused, isSelected }: any) => {
    return {
      ...styles,
      cursor: "pointer",
      backgroundColor: isFocused
        ? COLORS.HOVER_BACKGROUND_AUTOCOMPLETE
        : isSelected
        ? COLORS.HOVER_BACKGROUND_AUTOCOMPLETE
        : null,
      color: COLORS.TEXT,
      fontSize: "14px",
    };
  },
  multiValue: (styles: any, { isDisabled }: any) => {
    return {
      ...styles,
      borderRadius: "20px",
      fontWeight: 500,
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    };
  },

  multiValueRemove: (styles: any, { isDisabled }: any) => {
    return {
      ...styles,
      display: isDisabled ? "none" : "flex",
      borderRadius: "10px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "unset",
      },
    };
  },

  menuPortal: (styles: any) => {
    return {
      ...styles,
      zIndex: 10000,
    };
  },

  indicatorsContainer: (styles: any, { isDisabled }: any) => {
    return {
      ...styles,
      display: isDisabled ? "none" : "flex",
      marginRight: "6px",
      fontSize: "1.25rem",
      "& div": {
        padding: "2px",
        borderRadius: "50%",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: COLORS.HOVER_BACKGROUND_AUTOCOMPLETE,
        },
      },
    };
  },
  singleValue: (styles: any) => {
    return {
      ...styles,
      lineHeight: "21px !important",
    };
  },
};

interface ReactSelectProps {
  //--- Settings loading
  isLoading?: boolean;
  loadingWidth?: number;
  loadingHeight?: number;
  //--- Title field
  title?: string | null;
  titleClassName?: any;
  //--- Option control
  fieldName?: string;
  className?: any;
  options?: any;
  value?: any;
  onChange?: any;
  customDropdown?: any;
  titleDropdown?: string;
  actionDropdown?: () => void;
  optionsPerPage?: number;
  //--- Validate field
  isValidationFailed?: boolean;
  errors?: any;
  clearErrors?: any;
  inputRef?: any;
  defaultMenuIsOpen?: boolean;
  placeholder?: string | null;
  maxMenuHeight?: number;
  getOptionLabel?: any;
  getOptionValue?: any;
  isClearable?: boolean;
  Clearable?: boolean;
  defaultValue?: any;
  isDisabled?: boolean;
  onInputChange?: any;
  getOptions?: (
    searchText?: string,
    page?: number,
    optionsPerPage?: number,
    prevOptions?: any
  ) => Promise<{ options: any[]; hasMore: boolean }>;
  isMulti?: boolean;
  filterOption?: any;
  keyCache?: string;
  inputValue?: string;
  showIcon?: boolean;
  menuPosition?: MenuPosition;
  menuPlacement?: MenuPlacement;
  menuPortalTarget?: HTMLElement | null;
  clearValue?: any;
  menuShouldScrollIntoView?: boolean;
  menuShouldBlockScroll?: boolean;
  closeMenuOnScroll?: any;
  onBlur?: any;
  closeMenuOnSelect?: boolean;
  blurInputOnSelect?: boolean;
  autoFocus?: boolean;
  backspaceRemovesValue?: boolean;
  noOptionsMessage?: any;
  classNamePrefix?: string;
  components?: { [key: string]: any };
  defaultOptions?: any;
  errorMessage?: string;
  onFocus?: any;
  selectRef?: any;
  styles?: any;
  sxTitle?: SxProps;
  key?: string;
}

const ReactSelect: React.FC<ReactSelectProps> = (props) => {
  const {
    //--- Settings loading
    isLoading,
    loadingWidth,
    loadingHeight,
    //--- Title field
    title,
    titleClassName,
    //--- Option control
    fieldName,
    className,
    options,
    value,
    onChange,
    customDropdown,
    titleDropdown,
    actionDropdown,
    optionsPerPage,
    //--- Validate field
    isValidationFailed,
    errors,
    errorMessage,
    clearErrors,
    inputRef,
    getOptions,
    keyCache,
    showIcon,
    clearValue,
    components: componentsProp,
    onFocus,
    selectRef,
    maxMenuHeight,
    sxTitle,
    isDisabled,
    key,
    ...rest
  } = props;

  const classes = useStyles();
  const KEY = `react_select_${fieldName || ""}_${
    (value && value.value) || ""
  }_${keyCache || ""}`;
  const CACHE_OPTION =
    (value && [value.value]) || (keyCache && [keyCache]) || [];
  const _options = options;

  const _loadPageOptions = async (q: any, prevOptions: any, page: any) => {
    const { options, hasMore, ...res1t } = await (getOptions
      ? getOptions(q, page.page, optionsPerPage || 10, prevOptions)
      : loadOptions(q, page.page, _options, optionsPerPage));

    return {
      options,
      hasMore,
      additional: {
        page: page.page + 1,
      },
    };
  };

  const optionView = () => {
    if (customDropdown) {
      const OptionItem = customDropdown;
      return <OptionItem />;
    }

    return (
      <OptionView
        title={titleDropdown}
        action={actionDropdown}
        showIcon={showIcon}
      />
    );
  };

  const CustomMenuList = (props: any) => {
    return (
      <>
        <components.MenuList {...props}>{props.children}</components.MenuList>
        {optionView()}
      </>
    );
  };

  const MenuList: any = wrapMenuList(CustomMenuList);

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        {props?.selectProps?.menuIsOpen ? (
          <ArrowDropUpIcon className={classes.iconReactSelect} />
        ) : (
          <ArrowDropDownIcon className={classes.iconReactSelect} />
        )}
      </components.DropdownIndicator>
    );
  };

  const ClearIndicator = (props: any) => {
    return (
      <components.ClearIndicator {...props}>
        <ClearIcon
          sx={{
            height: "0.8em",
            width: "0.8em",
            opacity: 0,
            color: "rgba(0, 0, 0, 0.54)",
          }}
          className="clear-icon"
        />
      </components.ClearIndicator>
    );
  };

  const handleChange = (newValue: any) => {
    onChange(newValue);
  };

  if (isValidationFailed) {
    return (
      <div style={{ position: "relative" }}>
        {title && (
          <Typography
            sx={{
              fontWeight: 700,
              color: COLORS.TEXT_PRIMARY,
              fontSize: 14,
              ...sxTitle,
            }}
          >
            {title} <span className="required"></span>
          </Typography>
        )}
        <AsyncPaginate
          // menuIsOpen={true}
          classNamePrefix="react-select"
          debounceTimeout={500}
          key={key || KEY}
          value={value}
          onChange={handleChange}
          cacheUniqs={CACHE_OPTION}
          additional={defaultAdditional}
          loadOptions={_loadPageOptions}
          styles={customStyles}
          selectRef={inputRef}
          menuShouldBlockScroll
          onFocus={onFocus}
          isLoading={isLoading}
          maxMenuHeight={maxMenuHeight}
          // Add vao khi react-select nam o cuoi popup
          // menuPosition={'absolute'}
          // menuPlacement={'auto'}
          // menuPortalTarget={document.body}
          components={{
            ...(componentsProp ? componentsProp : {}),
            DropdownIndicator,
            MenuList,
            ClearIndicator,
          }}
          className={clsx({
            [className]: true,
            [classes.error]: Boolean(
              (errors &&
                get(errors, fieldName || "", null) &&
                get(errors, fieldName || "", null)?.message) ||
                !!errorMessage
            ),
          })}
          {...rest}
        />

        <TextFieldCustom
          // style={{ display: 'none' }}
          // styles input khi co loi validation
          className={clsx(classes.textFiledCustom, "d-none")}
          id={fieldName}
          name={fieldName}
          value={value?.label || ""}
          //ref={inputRef}
          inputProps={{
            autocomplete: "off",
          }}
        />
        {((errors &&
          get(errors, fieldName || "", null) &&
          get(errors, fieldName || "", null)?.message) ||
          errorMessage) && (
          <ErrorMessage>
            {get(errors, fieldName || "", null)?.message || errorMessage || ""}
          </ErrorMessage>
        )}
      </div>
    );
  }

  return (
    <>
      {title && (
        <Typography
          sx={{
            fontWeight: 700,
            color: COLORS.TEXT_PRIMARY,
            fontSize: 14,
            marginBottom: 1,
            ...sxTitle,
          }}
        >
          {title}
        </Typography>
      )}
      <AsyncPaginate
        isDisabled={isDisabled}
        key={key || KEY}
        value={value}
        onChange={onChange}
        cacheUniqs={CACHE_OPTION}
        additional={defaultAdditional}
        isLoading={isLoading}
        loadOptions={_loadPageOptions}
        components={{
          ...(componentsProp ? componentsProp : {}),
          DropdownIndicator,
          MenuList,
          ClearIndicator,
        }}
        styles={customStyles}
        className={className}
        menuShouldBlockScroll
        selectRef={selectRef}
        onFocus={onFocus}
        debounceTimeout={500}
        maxMenuHeight={maxMenuHeight}
        {...rest}
      />
    </>
  );
};

ReactSelect.defaultProps = {
  //--- Settings loading
  isLoading: false,
  loadingWidth: 100,
  loadingHeight: 11,
  //--- Title field
  title: "",
  //--- Option control
  fieldName: `${new Date().getTime()}`,
  options: [],
  value: undefined,
  onChange: () => {
    //
  },
  customDropdown: undefined,
  titleDropdown: "",
  errorMessage: "",
  actionDropdown: () => {
    //
  },
  optionsPerPage: 10,
  //--- Validate field
  isValidationFailed: false,
  errors: undefined,
  clearErrors: () => {
    //
  },
  inputRef: undefined,
  menuPosition: "absolute",
  menuPlacement: "auto",
  menuPortalTarget: null,
  noOptionsMessage: () => <>Không có lựa chọn nào</>,
  classNamePrefix: "react-select",
  maxMenuHeight: 155,
};

export default ReactSelect;
