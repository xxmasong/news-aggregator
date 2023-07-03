import { SnackbarProvider } from "notistack";
import { Grow } from "@mui/material";

import { notifications } from '@/config';
import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import AuthContextProvider from "@/providers/AuthContextProvider";
import ConfirmContextProvider from "@/providers/ConfirmContextProvider";
import ThemeProvider from '@/providers/ThemeProvider';
import configuredAsyncComponentLoader from '@/utils/loader';
import NewsContextProvider from "./providers/NewsContextProvider";

// TODO
//import "@fontsource/roboto";
//import "antd_override.css";

const Layout = configuredAsyncComponentLoader(
  () => import('@/components/templates/Layout')
);

function App() {
  return (
    <ThemeProvider >
      <SnackbarProvider
        maxSnack={notifications.maxSnack}
        TransitionComponent={Grow}
        autoHideDuration={3000}
      >
        <AuthContextProvider>
          <NewsContextProvider>
            <ConfirmContextProvider>
              <Layout />
            </ConfirmContextProvider>
          </NewsContextProvider>
        </AuthContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
