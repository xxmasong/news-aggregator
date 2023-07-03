import styled from 'styled-components';
import ArticleCard, { ArticleCardSkeleton } from './ArticleCard';
import { mediaQuery } from '@/lib/styles/media';
import { NewsDataArticle } from '@/lib/graphql/news';
import React, { memo } from 'react';

export type ArticleCardGridProps = {
  articles: NewsDataArticle[];
  loading?: boolean;
  forHome?: boolean;
  forArticle?: boolean;
};

function ArticleCardGrid({ articles, loading, forHome, forArticle }: ArticleCardGridProps) {
  return (
    <Block>
     {articles.map((article, i) => (
        article && (
          <ArticleCard
            key={i}
            article={article}
            forHome={forHome}
            forArticle={forArticle}
          />
        )
      ))}
      {loading &&
        Array.from({ length: 10 }).map((_, i) => (
          <ArticleCardSkeleton 
            key={i} 
            forHome={forHome} 
            forArticle={forArticle}
          />
        )
      )}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  margin: -1rem;
  flex-wrap: wrap;
  ${mediaQuery(767)} {
    margin: 0;
  }
  justify-content: center;
`;

export default React.memo(ArticleCardGrid);
