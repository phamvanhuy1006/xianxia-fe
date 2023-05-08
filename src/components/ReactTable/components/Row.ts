import {
    styled,
    TableCell,
    tableCellClasses,
    TableRow,
    tableRowClasses,
    TableSortLabel,
  } from "@mui/material";
  
  export const Row = styled(TableRow, {
    shouldForwardProp: (prop) => prop !== "hasRowClick",
  })<{ hasRowClick?: boolean }>(({ theme, hasRowClick }) => ({
    [`&.${tableRowClasses.hover}`]: {
      cursor: hasRowClick ? "pointer" : "auto",
      // "&$hover:hover": {
      //   backgroundColor: theme.palette.grey[100],
      //   "& td": {
      //     backgroundColor: theme.palette.grey[100],
      //   },
      // },
    },
  }));
  