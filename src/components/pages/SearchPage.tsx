import React, { useMemo } from 'react';
import SearchTemplate from '@/components/templates/SearchTemplate';
import LargeSearchInput from '@/components/organisms/search/LargeSearchInput';
import SearchResult from '@/components/organisms/search/SearchResult';
import { RouteComponentProps } from 'react-router';
import qs from 'qs';
import { Helmet } from 'react-helmet-async';

export interface SearchPageProps extends RouteComponentProps {}

function SearchPage({ location }: SearchPageProps) {
  const query = useMemo(() => {
    const parsed = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as { q: string; username: string | undefined };
    return parsed;
  }, [location.search]);

  return (
    <SearchTemplate>
      <LargeSearchInput initialKeyword={query.q} />
      <SearchResult keyword={query.q} username={query.username} />
    </SearchTemplate>
  );
}

export default SearchPage;
