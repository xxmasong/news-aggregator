import { Redirect, Route, Switch } from 'react-router-dom';

import PrivateRoute from '@/routes/PrivateRoute';
import PublicRoute from '@/routes/PublicRoute';

import configuredAsyncComponentLoader from '@/utils/loader';

import NotFoundPage from '@/components/pages/NotFoundPage';
import PageTemplate from '@/components/templates/PageTemplate';

const loadableConfig = {
  fallback: <PageTemplate />,
};

const HomePage = configuredAsyncComponentLoader(() => import('@/components/pages/HomePage'));

const ArticlePage = configuredAsyncComponentLoader(() => import('@/components/pages/ArticlePage'));

const SearchPage = configuredAsyncComponentLoader(() => import('@/components/pages/SearchPage'), loadableConfig);

const SettingPage = configuredAsyncComponentLoader(
  () => import('@/components/pages/SettingPage'),
  loadableConfig,
);

function PageRouter() { 
  return (
    <Switch>
      <Route path={['/', "/:mode(trending|recent)"]} component={HomePage} exact />
      <Route path="/account" component={SettingPage} />
      <Route path="/article/:urlTitle" component={ArticlePage} />   
      <Route path="/search" component={SearchPage} />
      
      {/* <Route component={configuredAsyncComponentLoader(() => import('@/components/pages/NotFound'))} path="*" /> */}
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default PageRouter;
