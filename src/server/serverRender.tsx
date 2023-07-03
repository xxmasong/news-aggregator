import path from 'path';
import React from 'react';
import fetch from 'node-fetch';
import ReactDOMServer from 'react-dom/server';
import { ApolloProvider } from '@apollo/react-common';
import { ApolloClient, ApolloError } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-boost';
import { getDataFromTree } from '@apollo/react-ssr';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import rootReducer from '../store';
import App from '../App2';
import Html from './Html';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import CacheManager from './CacheManager';
import { HelmetProvider, FilledContext } from 'react-helmet-async';
import error from '../store/error';
import { UncachedApolloProvider } from '../lib/graphql/UncachedApolloContext';

const statsFile = path.resolve(__dirname, '../build/loadable-stats.json');
const cacheManager = new CacheManager();

type SSROption = {
  url: string;
  loggedIn: boolean;
  cookie: string;
};

function extractFromCookie(cookie: string | undefined, key: string) {
  if (!cookie) return null;
  const cookieArray = cookie.split(';');
  const keyValue = cookieArray.find((item) => item.trim().startsWith(key));
  if (!keyValue) return null;
  const value = keyValue.split('=')[1];
  return value;
}

const serverRender = async ({ url, loggedIn, cookie }: SSROption) => {
  // enable proxy to backend server in development mode
  if (/^\/(api|graphql|sitemaps)/.test(url)) {
    return null;
  }

  // prepare redux store
  const store = createStore(rootReducer);
  // prepare apollo client

  if (!loggedIn && import.meta.env.STAGE !== 'true' && false) {
    try {
      const cachedPage = await cacheManager.get(url);
      if (cachedPage) {
        return {
          html: cachedPage,
          statusCode: 200,
        };
      }
    } catch (e) {}
  }

  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: `${import.meta.env.REACT_APP_GRAPHQL_HOST}graphql`,
      fetch: fetch as any,
      headers: {
        cookie,
      },
    }),
    cache: new InMemoryCache(),
  });

  const context = {
    statusCode: 200,
  };
  const sheet = new ServerStyleSheet();
  const extractor = new ChunkExtractor({
    statsFile,
    publicPath: import.meta.env.PUBLIC_URL,
  });

  const helmetContext = {} as FilledContext;

  const Root = (
    <ChunkExtractorManager extractor={extractor}>
      <HelmetProvider context={helmetContext}>
        <StyleSheetManager sheet={sheet.instance}>
          <Provider store={store}>
            <UncachedApolloProvider client={client}>
              <ApolloProvider client={client}>
                <StaticRouter location={url} context={context}>
                  <App />
                </StaticRouter>
              </ApolloProvider>
            </UncachedApolloProvider>
          </Provider>
        </StyleSheetManager>
      </HelmetProvider>
    </ChunkExtractorManager>
  );

  try {
    await getDataFromTree(Root);
  } catch (e) {
    console.log('Apollo Error! Rendering result anyways');
    if (e instanceof ApolloError) {
      const notFound = e.graphQLErrors.some(
        (ge) => (ge.extensions as any)?.code === 'NOT_FOUND',
      );
      if (notFound) store.dispatch(error.actions.showNotFound());
    }
    console.log((e as any).name);
    console.log((e as any).message);
    console.log(JSON.stringify(e));
  }

  const content = ReactDOMServer.renderToString(Root);
  const initialState = client.extract();
  const styledElement = sheet.getStyleElement();

  const theme = extractFromCookie(cookie, 'theme');

  const html = (
    <Html
      content={content}
      apolloState={initialState}
      reduxState={store.getState()}
      styledElement={styledElement}
      extractor={extractor}
      helmet={helmetContext.helmet}
      theme={theme}
    />
  );

  const pageHtml = `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(
    html,
  )}`;

  try {
    if (!loggedIn && import.meta.env.STAGE !== 'true' && false) {
      await cacheManager.set(url, pageHtml);
    }
  } catch (e) {
    console.log('Failed to cache...');
  }

  return { html: pageHtml, statusCode: context.statusCode };
};

export default serverRender;
