import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Logo } from '@/static/svg';
import { themedPalette } from '@/lib/styles/themes';
import media from '@/lib/styles/media';
import { ellipsis } from '@/lib/styles/utils';

function HeaderLogo() {
  return (
    <HeaderLogoBlock>
      <Link to="/">
        <Logo className="velog-logo" />
      </Link>
    </HeaderLogoBlock>
  );
}

const HeaderLogoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${themedPalette.text1};
  font-size: 1.3125rem;
  text-decoration: none;
  font-family: Fira Mono, monospace;

  ${media.medium} {
    font-size: 1.125rem;
    .velog-logo {
      height: 1.25rem;
    }
  }

  a {
    display: flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
  }

  .user-logo {
    display: block;
    max-width: calc(100vw - 200px);
    ${ellipsis};
  }
`;

export default HeaderLogo;
