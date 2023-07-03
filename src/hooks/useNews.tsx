import { useCallback, useContext } from "react";
import { NewsContext } from "@/providers/NewsContextProvider";
import { NewsDataArticle } from "@/lib/graphql/news";
import { setNewsArticles, setNewsReadArticle, setNextPage } from "@/store/news";

export default function useNews() {
  const [news, dispatch] = useContext(NewsContext);

  const updateArticles = useCallback((articles: NewsDataArticle[]) => {
    if (dispatch) {
      dispatch(setNewsArticles(articles));
    }
  }, [dispatch]);

  const preFetchArticle = useCallback((article: NewsDataArticle | null) => {
    if (dispatch) {
      dispatch(setNewsReadArticle(article));
    }
  }, [dispatch]);

  const keepNextPageKey = useCallback((page: string | null) => {
    if (dispatch) {
      dispatch(setNextPage(page));
    }
  }, [dispatch]);

  return {
    sources: news?.sources,
    articles: news?.articles,
    article: news?.article,
    page: news?.nextPage,
    updateArticles,
    preFetchArticle,
    keepNextPageKey,
  };
}
