import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from "@mui/material";

import HotKeys from '@/components/templates/load/HotKeys';
import SW from '@/components/templates/load/SW';
import Notifier from '@/components/templates/load/Notifier';
import Footer from '@/components/templates/sections/Footer';
import Header from '@/components/templates/sections/Header';
import Page from '@/components/templates/sections/Page';
import Background from '@/components/templates/load/Background';

function Layout() {
  return (
    <Fragment>
      <CssBaseline />
      <Notifier />
      <HotKeys />
      <SW />
      <BrowserRouter>
        <Background />
        <Header />
        <Page />
        <Footer /> 
      </BrowserRouter>
    </Fragment>
  );
}

export default Layout;
