import React, { useCallback } from 'react';
import SearchResultInfo from '@/components/molecules/search/SearchResultInfo';
import PostCardList from '@/components/atoms/FlatPostCardList';
import { useQuery } from '@apollo/react-hooks';
import { SearchPostsResponse, SEARCH_POSTS } from '@/lib/graphql/post';
import useScrollPagination from '@/lib/hooks/useScrollPagination';
import { safe } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
// import { undrawSearching } from '@/static/images';

export interface SearchResultProps {
  keyword: string;
  username?: string;
}

function SearchResult({ keyword, username }: SearchResultProps) {
  const { data, fetchMore } = useQuery<SearchPostsResponse>(SEARCH_POSTS, {
    variables: {
      keyword,
      username,
    },
    skip: keyword === '' || keyword === undefined,
  });

  const onLoadMoreByOffset = useCallback(
    (offset: number) => {
      fetchMore({
        variables: {
          keyword,
          offset,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            searchPosts: {
              ...prev.searchPosts,
              posts: prev.searchPosts.posts.concat(
                fetchMoreResult.searchPosts.posts,
              ),
            },
          };
        },
      });
    },
    [fetchMore, keyword],
  );

  const offset = safe(() => data!.searchPosts!.posts!.length) || 0;
  useScrollPagination({
    offset,
    onLoadMoreByOffset,
  });

  // if (!keyword) {
  //   return (
  //     <ImageWrapper>
  //       <img src={undrawSearching} alt="search keyword" />
  //     </ImageWrapper>
  //   );
  // }

  if (!data || !data.searchPosts) return null;

  return (
    <>
      <SearchResultInfo count={data.searchPosts.count} />
      <PostCardList posts={data.searchPosts.posts} hideUser={!!username} />
    </>
  );
}


export default SearchResult;
