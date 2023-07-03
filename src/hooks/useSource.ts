import { useCallback, useState } from 'react';
import { NewsDataSource } from '@/lib/graphql/news';
import { sources } from '@/services/NewsService';
import React from 'react';

export default function useSource() {
  const [newsSources, setNewsSources] = useState<NewsDataSource[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSources = useCallback(async () => {
    setLoading(true);
    const data = await sources();
    if (data?.status === 'success') {
      setNewsSources(data);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    fetchSources();
  }, []);

  return { newsSources, loading };
}
