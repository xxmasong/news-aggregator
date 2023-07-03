import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const actualHost = 'http://localhost:5000/';
const actualHostNoCdn = 'http://localhost:5000/';

// const actualHost = 'https://v2cdn.velog.io/';
// const actualHostNoCdn = 'https://v2.velog.io/';

const host =
  (import.meta.env.NODE_ENV === 'development'
    ? actualHost
    : import.meta.env.REACT_APP_GRAPHQL_HOST) || actualHost;

const noCdnHost =
  (import.meta.env.NODE_ENV === 'development'
    ? actualHostNoCdn
    : import.meta.env.REACT_APP_GRAPHQL_HOST_NOCDN) || actualHostNoCdn;

const cache = new InMemoryCache().restore((window as any).__APOLLO_STATE__);

const graphqlURI = host.concat('graphql');
const noCdnGraphqlURI = noCdnHost.concat('graphql');

const link = createHttpLink({
  uri: graphqlURI,
  credentials: 'include',
});

const noCdnLink = createHttpLink({
  uri: noCdnGraphqlURI,
  credentials: 'include',
});

const client = new ApolloClient({
  link,
  cache,
});

export const noCdnClient = new ApolloClient({
  link: noCdnLink,
  cache,
});

(window as any).client = client;

export default client;
