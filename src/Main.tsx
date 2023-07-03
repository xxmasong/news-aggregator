import { ComponentType, Fragment, StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { ApolloProvider } from '@apollo/react-hooks';
import client, { noCdnClient } from '@/lib/graphql/client';
import { UncachedApolloProvider } from '@/lib/graphql/UncachedApolloContext';
import storage from '@/lib/storage';
import rootReducer from '@/store';
import {enableTheme, enableLightMode} from '@/store/theme';

import './typography.css';

const store = createStore(
  rootReducer,
  (window as any).__REDUX_STATE__,
  composeWithDevTools(),
);

const loadTheme = () => {
  const mode = storage.getItem('theme');
  if (!mode) return;
  if (mode === 'dark') {
    store.dispatch(enableTheme());
  } else {
    store.dispatch(enableLightMode());
  }
  document.body.dataset.theme = mode;
};

function Main(App: ComponentType) {
  loadTheme();

  return (
    <Fragment>
    {/* <StrictMode> */}
        <HelmetProvider>
          <Provider store={store}>
            <UncachedApolloProvider client={noCdnClient}>
              <ApolloProvider client={client}>
                <App />
              </ApolloProvider>
            </UncachedApolloProvider>
          </Provider>
        </HelmetProvider>
    {/* </StrictMode> */}
    </Fragment>
  );
}

export default Main;
