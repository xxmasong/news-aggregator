import { useCallback, useEffect, useState } from 'react';
import useScrollPagination from '@/lib/hooks/useScrollPagination';
import { homeArticles } from '@/services/NewsService';
import useNews from './useNews';

export default function useHeadlineNews() {
  const {articles, page, updateArticles, keepNextPageKey} = useNews();
  const [loading, setLoading] = useState(false);

  const onLoadMoreByOffset = useCallback(async () => {
    setLoading(true);
    const data = await homeArticles(page);
    if (data?.status === 'success') {
      updateArticles([...articles!, ...data.results]);
      keepNextPageKey(data?.nextPage);
    }
    setLoading(false);
  }, [articles, keepNextPageKey, page, updateArticles]);

  useEffect(() => {
    if (articles && articles?.length <= 10) {
      onLoadMoreByOffset();
    }
  }, [articles]);

  useScrollPagination({
    offset: articles?.length,
    onLoadMoreByOffset,
  });

  return { articles, loading };
}
