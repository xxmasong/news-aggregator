import React from 'react';
import { undrawLogin } from '@/static/images';
import styled, { css } from 'styled-components';
import Button from './Button';
import useRequireLogin from '@/lib/hooks/useRequireLogin';
import { themedPalette } from '@/lib/styles/themes';
import media from '@/lib/styles/media';

export type RequireLoginProps = {
  hasMargin?: boolean;
};

function RequireLogin({ hasMargin }: RequireLoginProps) {
  const requireLogin = useRequireLogin();

  return (
    <Block hasMargin={hasMargin}>
      <img src={undrawLogin} alt="Login Required" />
      <h2>Please log in before using it.</h2>
      <Button onClick={requireLogin}>Login</Button>
    </Block>
  );
}

const Block = styled.div<{ hasMargin?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  img {
    width: 12rem;
    height: auto;
    display: block;
    ${media.medium} {
      width: 8rem;
    }
  }
  h2 {
    font-weight: 400;
    color: ${themedPalette.text1};
    margin-top: 2rem;
    ${media.small} {
      font-size: 1.25rem;
    }
  }
  ${(props) =>
    props.hasMargin &&
    css`
      margin-top: 10rem;
      ${media.medium} {
        margin-top: 4rem;
      }
    `}
`;

export default RequireLogin;
