import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { Box, BoxProps, Button, Grid, GridTypeMap } from "@mui/material";

import { styled } from "@mui/system";
import moment from "moment";
import { cloneElement, memo, ReactElement, useCallback } from "react";
import { Control, Controller, SubmitHandler, useForm } from "react-hook-form";
import { connect } from "react-redux";
import ButtonShared from "src/components/ButtonShared";
import DatePickerCustom from "src/components/DatePickerCustom";
import ReactSelect from "src/components/ReactSelectComponent";
import TextFieldCustom from "src/components/TextFieldCustom";
import { getOptionService } from "src/services/getOptions";
import {
  COLORS,
  FILTER_COLUMN_TYPES,
  ISO_DATE_FORMAT,
} from "src/shared/constants";
import Icons from "src/shared/constants/svgIcons";
import { UnknownObj } from "src/shared/models/common.model";

export type FilterBarColumn = {
  regex?:
    | "_like"
    | "_equal"
    | "_between"
    | "_notEqual"
    | "_isnull"
    | "has_"
    | "none";
  queryKey?: string;
  searchType?: "select" | "text" | "time-range-picker" | "timepicker";
  additionSearchProps?: Partial<any>;
  search?: boolean;
  grid?: GridTypeMap;
};

export type FilterBarProps<T extends UnknownObj> = BoxProps<
  "div",
  {
    searchColumns: any;
    handleChangeParams: (params: UnknownObj) => void;
    handleSubmitAll?: (params: any) => void;
    watchMode?: boolean;
    loading?: boolean;
    isShowTotal?: boolean;
    totalColumn?: number;
    getOptions?: any;
  }
>;
export const formatDate = "DD/MM/YYYY";

const mapState = (state: any) => ({});
const mapDispatch = {
  getOptions: getOptionService.endpoints.getOption.initiate,
};
const connector = connect(mapState, mapDispatch);

function FilterBarComponent<T extends UnknownObj>({
  handleChangeParams,
  handleSubmitAll,
  searchColumns,
  loading,
  isShowTotal,
  totalColumn,
  watchMode,
  getOptions,
}: FilterBarProps<T>) {
  const { control, handleSubmit, watch, reset } = useForm<UnknownObj>({
    defaultValues: {},
  });

  const getSearchObj = useCallback(
    (key: string) => {
      return searchColumns.find(
        (el: any) => el.accessor === key && (el?.display as any)
      );
    },
    [searchColumns]
  );

  const getQueryParams = useCallback(
    (values: any) => {
      const params = Object.keys(values).reduce<UnknownObj>((_params, cur) => {
        if (values[cur]) {
          if (typeof values[cur] === "string") {
            _params[cur] = values[cur];
          } else if (
            typeof values[cur] === "object" &&
            // eslint-disable-next-line no-prototype-builtins
            values[cur].hasOwnProperty("value")
          ) {
            _params[cur] = values[cur]["value"];
          } else {
            _params[cur] = moment(values[cur]).format(formatDate);
          }
        }
        return _params;
      }, {});

      const objValues: any = {};

      {
        searchColumns?.map(({ accessor = "", searchType }: any, index: any) => {
          const controlProps: any = {
            name: accessor,
            searchType: searchType,
          };
          switch (controlProps.searchType) {
            case FILTER_COLUMN_TYPES.DATE_PICKER:
              objValues[controlProps?.name] =
                moment(values[controlProps?.name]).format(ISO_DATE_FORMAT) ||
                null;
              break;
            case FILTER_COLUMN_TYPES.SELECT:
              objValues[controlProps?.name] =
                values[controlProps?.name]?.value || "";
              break;
            case FILTER_COLUMN_TYPES.TEXT:
              objValues[controlProps?.name] = values[controlProps?.name] || "";
              break;
            default:
              objValues[controlProps?.name] = values[controlProps?.name] || "";
              break;
          }
        });
      }

      return objValues;
    },
    [getSearchObj]
  );

  const onSubmit: SubmitHandler<UnknownObj> = (values) => {
    const params = getQueryParams(values);
    handleChangeParams(params);
  };

  const onReset = () => {
    const params = {};
    reset();
    handleChangeParams(params);
  };

  const CustomizedBox = styled(Box)`
    padding: 20px;
    /* border: 0.5px solid rgba(224, 224, 224, 1);
    border-radius: 10px; */
    margin: 0 0 20px 0;
  `;

  const CustomizedButton = styled(Button)`
    margin: 20px 10px 0 10px;
  `;

  const getOption = async (
    url?: string,
    paramsUrl?: any,
    searchText?: string | undefined,
    pageIndex?: number | undefined,
    pageSize?: number | undefined
  ) => {
    const params = {
      Page: pageIndex,
      PageSize: pageSize,
    };
    try {
      if (url) {
        const result = await getOptions({
          url: url,
          params: { ...params, ...paramsUrl },
        });
        const { data } = result;
        if (data && data.content.items.length > 0) {
          const items: any[] = data.content.items.map((item: any) => {
            const result = {
              ...item,
              label: item?.nameProject,
              value: item?.nameProject,
            };
            return result;
          });
          return {
            options: items,
            hasMore:
              Math.ceil(data.content.length / Number(pageSize)) >
              Number(pageIndex),
          };
        } else {
          return {
            options: [],
            hasMore: false,
          };
        }
      } else {
        return {
          options: [],
          hasMore: false,
        };
      }
    } catch (error) {
      return {
        options: [],
        hasMore: false,
      };
    }
  };

  return (
    <CustomizedBox component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid container item xs={8} spacing={2}>
          {searchColumns?.map(
            (
              {
                accessor = "",
                Header,
                searchType,
                additionSearchProps,
                grid,
                url,
                params,
                option,
              }: any,
              index: any
            ) => {
              const controlProps = {
                name: accessor,
                label: Header as string,
                control,
                key: index,
                grid,
                url: url,
                params: params,
                option: option,
              };

              switch (searchType) {
                case FILTER_COLUMN_TYPES.SELECT:
                  return (
                    <FilterElement {...controlProps} {...additionSearchProps}>
                      <ReactSelect
                        key={controlProps?.url}
                        getOptions={
                          controlProps?.url &&
                          (() => getOption(controlProps?.url, params))
                        }
                        options={option && option}
                        getOptionLabel={(option: any) => option.label}
                      />
                    </FilterElement>
                  );
                case FILTER_COLUMN_TYPES.DATE_PICKER:
                  return (
                    <FilterElement {...controlProps} {...additionSearchProps}>
                      <DatePickerCustom />
                    </FilterElement>
                  );
                default:
                  return (
                    <FilterElement {...controlProps} {...additionSearchProps}>
                      <TextFieldCustom fullWidth title={""} />
                    </FilterElement>
                  );
              }
            }
          )}
        </Grid>
        {!isShowTotal && (
          <Grid
            container
            item
            xs={4}
            sx={{
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <ButtonShared
              disabled={loading}
              startIcon={<SearchSharpIcon />}
              color="success"
              label="Reset"
              onClick={onReset}
              sx={{ marginRight: "5px" }}
            />
            <ButtonShared
              disabled={loading}
              startIcon={<SearchSharpIcon />}
              color="primary"
              type="submit"
              label="Search"
            />
          </Grid>
        )}
        {isShowTotal && (
          <Grid
            container
            item
            xs={4}
            sx={{
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            {!!totalColumn && (
              <Box
                sx={{
                  width: "245px",
                  height: "50px",
                  borderRadius: "12px",
                  bgcolor: "#EAEDEE",
                  marginRight: 3,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 2,
                  fontSize: "16px",
                  color: "#7B7B7B",
                  gap: 1,
                }}
              >
                Total: <div style={{ fontWeight: 700 }}>{totalColumn}h</div>
              </Box>
            )}

            <Box>
              <ButtonShared
                disabled={loading}
                startIcon={
                  <span className="colorSvg">
                    <Icons.SubmitIcon />
                  </span>
                }
                label="Submit all"
                sx={{
                  marginRight: "5px",
                  background: "#662D91",
                  color: COLORS.WHITE,
                  "&:hover": { background: "#662D91" },
                }}
                onClick={handleSubmitAll}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </CustomizedBox>
  );
}

const FilterBar = memo(FilterBarComponent) as typeof FilterBarComponent;

interface FilterElementProps {
  name: any;
  label: string;
  control: Control<UnknownObj, any>;
  key: any;
  children: ReactElement;
  grid: number;
}

const FilterElement = ({
  children,
  label,
  name,
  control,
  grid = 3,
}: FilterElementProps) => {
  return (
    <Grid item xs={grid}>
      <div
        style={{
          color: "#404061",
          fontSize: "16px",
          lineHeight: "26px",
          fontWeight: 400,
        }}
      >
        {label}
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return cloneElement(children, { onChange, value });
        }}
      />
    </Grid>
  );
};

export default connector(FilterBar);
