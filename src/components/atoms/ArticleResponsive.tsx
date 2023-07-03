import * as React from 'react';
import styled from 'styled-components';
import media from '@/lib/styles/media';
export interface ArticleResponsiveProps {
  className?: string;
  style?: React.CSSProperties;
}

const ArticleResponsive: React.FC<ArticleResponsiveProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <Block
      children={children}
      className={className}
      style={style}
    />
  );
};

const Block = styled.div`
  width: 768px;
  margin-left: auto;
  margin-right: auto;
  ${media.small} {
    width: 100%;
  }
`;


export default ArticleResponsive;
