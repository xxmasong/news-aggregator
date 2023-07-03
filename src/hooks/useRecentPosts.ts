import { useQuery } from '@apollo/react-hooks';
import { GET_RECENT_POSTS, PartialPost } from '@/lib/graphql/post';
import { useCallback, useState } from 'react';
import useScrollPagination from '@/lib/hooks/useScrollPagination';

export default function useRecentPosts() {
  const { data, loading, fetchMore } = useQuery<{ recentPosts: PartialPost[] }>(
    GET_RECENT_POSTS,
    {
      variables: {
        limit: 24,
      },
      // https://github.com/apollographql/apollo-client/issues/1617
      notifyOnNetworkStatusChange: true,
    },
  );
  const [isFinished, setIsFinished] = useState(false);

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: {
          cursor,
          limit: 24,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult.recentPosts.length === 0) {
            setIsFinished(true);
          }
          return {
            recentPosts: [...prev.recentPosts, ...fetchMoreResult.recentPosts],
          };
        },
      });
    },
    [fetchMore],
  );

  const cursor = data?.recentPosts[data?.recentPosts.length - 1]?.id;

  useScrollPagination({
    cursor,
    onLoadMore,
  });

  return { data, loading, isFinished };
}
