import { createContext, Dispatch, ReactNode, useEffect, useReducer } from 'react';
import { getBearerToken } from '@/services/ApiService';
import { sources } from '@/services/NewsService';
import news, { initialNewsState, NewsState, setNewsSources } from '@/store/news';
import { NewsDataArticle } from '@/lib/graphql/news';
import { PayloadAction } from '@reduxjs/toolkit';

export const NewsContext = createContext<[ 
  NewsState | null, 
  Dispatch<PayloadAction<
    NewsDataArticle[] | NewsDataArticle | string | null>
  > | null, 
]>([null, null]);

function NewsContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(news.reducer, initialNewsState);

  useEffect(() => {
    if (getBearerToken()) {
      (async () => {
        const newsSources = await sources();
        console.log(newsSources);
        if (newsSources) {
          dispatch(setNewsSources(newsSources));
        } else {
          dispatch(setNewsSources([]));
        }
      })();
    } else {      
      dispatch(setNewsSources([]));
    }
  }, []);

  return (
    <NewsContext.Provider value={[state, dispatch]}>
      {children}
    </NewsContext.Provider>
  );
}


export default NewsContextProvider;
