import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { NewsDataArticle, NewsDataSource } from '@/lib/graphql/news';

export interface NewsState {
  sources: NewsDataSource[];
  articles: NewsDataArticle[];
  article: NewsDataArticle | undefined | null;
  nextPage: string | null;
}

export const initialNewsState: NewsState = {
  sources: [],
  articles: [],
  article: undefined,
  nextPage: null,
};

const news = createSlice({
  name: 'news',
  initialState: initialNewsState,
  reducers: {
    setNewsSources(state, action: PayloadAction<NewsDataSource[]>) {
      state.sources = action.payload;
    },
    setNewsArticles(state, action: PayloadAction<NewsDataArticle[]>) {
      state.articles = action.payload;
    },
    setNewsReadArticle(state, action: PayloadAction<NewsDataArticle | undefined | null>) {
      state.article = action.payload;
    },
    setNextPage(state, action: PayloadAction<string | null>) {
      state.nextPage = action.payload;
    },
  },
});

export const { setNewsSources, setNewsArticles, setNewsReadArticle, setNextPage } = news.actions;
export const newsSources = (state: RootState) => state.news.sources;
export const newsArticles = (state: RootState) => state.news.articles;
export const newsArticle = (state: RootState) => state.news.article;
export const nextPage = (state: RootState) => state.news.nextPage;

export default news;
