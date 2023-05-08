import { Stack, Typography } from "@mui/material";

const EmptyTable: React.VFC = () => {
  return (
    <Stack justifyContent="center" alignItems="center" p={10} spacing={0.5}>
      {/* <Box component={Icons.NodataSvg} color="inherit" /> */}
      {/* <Icons.NodataSvg /> */}
      <Typography variant="body2" color="grey.400">
        No data
      </Typography>
    </Stack>
  );
};

export { EmptyTable };

