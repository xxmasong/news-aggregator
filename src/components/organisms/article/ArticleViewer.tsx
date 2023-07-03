import React, { useEffect } from 'react';
import ArticleHead from '@/components/molecules/article/ArticleHead';
import ArticleContent from '@/components/molecules/article/ArticleContent';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import ArticleSkeleton from '@/components/molecules/article/ArticleSkeleton';
import useNotFound from '@/lib/hooks/useNotFound';
import RelatedArticle from './RelatedArticle';
import useArticle from '@/hooks/useArticle';
import Button from '@/components/atoms/Button';
import styled from 'styled-components';
import media from '@/lib/styles/media';
import { themedPalette } from '@/lib/styles/themes';
import { MdHome } from 'react-icons/md';

export interface ArticleViewerOwnProps {
  urlTitle: string;
}
export interface ArticleViewerProps
  extends ArticleViewerOwnProps,
    RouteComponentProps {}

const ArticleViewer: React.FC<ArticleViewerProps> = ({
  urlTitle,
}) => {
  const history = useHistory();
  const { article, loading } = useArticle(urlTitle);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [urlTitle]);
 
  useEffect(() => {
    if (!loading && article === null) {
      history.push('/');
    }
  }, [article, history, loading]);

  return (
    <>{loading ? (
      <ArticleSkeleton />
    ):(
      <>
        <ArticleHead />
        <ArticleContent />
        {article && 
          <ArticleReturn>
            <Button 
              color='transparent' 
              size='large' 
              onClick={() => history.push('/')}
            >
              <MdHome />Back
            </Button>
          </ArticleReturn>
        }        
        {!loading && article && <RelatedArticle />}
      </>      
    )}</>    
  );
};

const ArticleReturn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${themedPalette.text3};
  margin-top: 1rem;
  svg {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  ${media.small} {
    margin-top: 0.5rem;
  }
`;

export default React.memo(ArticleViewer);
