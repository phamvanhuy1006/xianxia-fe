import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export type TableSkeletonType = {
  row_number?: number;
  col_number?: number;
};

const TableSkeleton: React.VFC<TableSkeletonType> = ({
  col_number = 4,
  row_number = 3,
}) => {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ mb: 10 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {new Array(col_number).fill(0).map((el, idx) => (
              <TableCell key={idx} size="medium">
                <Skeleton variant="text" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {new Array(row_number).fill(0).map((el, idx) => (
            <TableRow key={idx}>
              <TableCell colSpan={col_number} size="medium">
                <Skeleton variant="text" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { TableSkeleton };
