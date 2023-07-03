import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ArticleViewer from '@/components/organisms/article/ArticleViewer';
import PageTemplate from '@/components/templates/PageTemplate';

export interface ArticlePageProps
  extends RouteComponentProps<{
    urlTitle: string;
  }> {}

const ArticlePage: React.FC<ArticlePageProps> = ({ match }) => {
  const { urlTitle } = match.params;

  return (
    <PageTemplate>
      <ArticleViewer urlTitle={urlTitle} />;
    </PageTemplate>
  );
};

export default ArticlePage;
