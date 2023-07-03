import styled from 'styled-components';
import RoundButton from '@/components/atoms/RoundButton';
import MainResponsive from '@/components/atoms/MainResponsive';
import useHeader from '../../../../hooks/useHeader';

import media from '@/lib/styles/media';
import HeaderLogo from './HeaderLogo';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import HeaderHotKeysButton from './HeaderHotKeysButton';
import HeaderSearchButton from './HeaderSearchButton';
import HeaderThemeButton from './HeaderThemeButton';

import { MdArrowDropDown } from 'react-icons/md';
import { userThumbnail } from '@/static/images';
import { themedPalette } from '@/lib/styles/themes';
import optimizeImage from '@/lib/optimizeImage';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

function HeaderDock() {
  const { showUserMenu, refUserMenu, 
    onLogin, onLogout, onOutsideClick, toggleUserMenu } = useHeader();
  const { isAuthorized, validating} = useAuth();
  const themeReady = useSelector(
    (state: RootState) => state.theme.systemTheme !== 'not-ready',
  );
  
  return (
    <Block>
      <Inner>
        <HeaderLogo />
        <Right>
          {themeReady && <HeaderThemeButton />}
          <HeaderSearchButton />
          <HeaderHotKeysButton />
          {!validating && !isAuthorized &&
            <RoundButton color="darkGray" onClick={onLogin}>
              Login
            </RoundButton>
          }
          {!validating && isAuthorized &&
            <>
              <div ref={refUserMenu}>                
                <HeaderUserIconBlock onClick={toggleUserMenu}>
                  <img
                    src={optimizeImage(userThumbnail, 120)}
                    alt="thumbnail"
                  />
                  <MdArrowDropDown />
                </HeaderUserIconBlock>
              </div>
              {
                showUserMenu && 
                <OutsideClickHandler onOutsideClick={onOutsideClick}>
                  <HeaderUserMenuBlock onClick={onOutsideClick}>
                    <div className="menu-wrapper">                      
                      <WrapperLink to="/account" style={{ display: 'block' }}>
                        <HeaderUserMenuItemBlock>
                          My Account
                        </HeaderUserMenuItemBlock>
                      </WrapperLink>
                      <HeaderUserMenuItemBlock onClick={onLogout}>
                        Log Out
                      </HeaderUserMenuItemBlock>
                    </div>
                  </HeaderUserMenuBlock>
                </OutsideClickHandler>
              }
            </>
          }
        </Right>
      </Inner>
    </Block>
  );
}

const Block = styled.div`
  height: 4rem;
`;

const Inner = styled(MainResponsive)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  .write-button {
    ${media.medium} {
      display: none;
    }
  }
`;

const HeaderUserIconBlock = styled.div`
  cursor: pointer;
  img {
    display: block;
    height: 2.5rem;
    width: 2.5rem;
    box-shadow: 0px 0 8px rgba(0, 0, 0, 0.085);
    border-radius: 50%;
    object-fit: cover;
    transition: 0.125s all ease-in;
  }
  svg {
    font-size: 1.5rem;
    margin-left: 0.25rem;
    color: ${themedPalette.text3};
    transition: 0.125s all ease-in;
    margin-right: -0.4375rem;
  }
  display: flex;
  align-items: center;
  &:hover {
    img {
      box-shadow: 0px 0 12px rgba(0, 0, 0, 0.1);
    }
    svg {
      color: ${themedPalette.text1};
    }
  }
`;

const HeaderUserMenuBlock = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 1rem;
  right: 0;
  > .menu-wrapper {
    position: relative;
    z-index: 5;
    width: 8rem;
    background: ${themedPalette.bg_element1};
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);

    .mobile-only {
      display: none;
      ${media.medium} {
        display: block;
      }
    }
  }
`;

const WrapperLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const HeaderUserMenuItemBlock = styled.div`
  color: ${themedPalette.text1};
  padding: 0.75rem 1rem;
  line-height: 1.5;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: ${themedPalette.bg_element2};
    color: ${themedPalette.primary1};
  }
`;

export default HeaderDock;
