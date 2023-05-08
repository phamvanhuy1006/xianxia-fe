import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((_theme: any) => ({
  root: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    left: 0,
    position: "fixed",
    top: 0,
    zIndex: 2000,
  },
}));

const SlashScreen: () => JSX.Element = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box width={2000}>
        <LinearProgress color="success" />
      </Box>
    </div>
  );
};

export default SlashScreen;
