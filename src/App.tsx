import { viVN } from "@mui/material/locale";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderScreens from "src/modules/router/render-screens";
import routes from "src/modules/router/routes";
import { store } from "src/redux/store";

import './i18n';
import ConfirmModal from "./components/ConfirmModal";
import { AuthProvider } from "./shared/contexts/jwt-auth";
const theme = createTheme({
  ...viVN,
  typography: {
    allVariants: {
      fontFamily: "SF-ProDisplay",
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <BrowserRouter>
            <AuthProvider>{renderScreens(routes)}</AuthProvider>
          </BrowserRouter>
        </LocalizationProvider>
        <ConfirmModal />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
