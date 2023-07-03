import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import OutsideClickHandler from 'react-outside-click-handler';
import { themedPalette } from '@/lib/styles/themes';

export type MainMobileHeadExtraProps = {
  visible: boolean;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
};

function MainMobileHeadExtra({ visible, onClose }: MainMobileHeadExtraProps) {
  const transition = useTransition(visible, {
    from: {
      opacity: 0,
      transform: 'scale(0.8)',
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
    },
    leave: {
      opacity: 0,
      transform: 'scale(0.8)',
    },
    config: {
      tension: 350,
      friction: 26,
    },
  });

  const theme = useTheme();
  const img =
    theme === 'dark'
      ? 'https://graphcdn.io/badge-light.svg'
      : 'https://graphcdn.io/badge.svg';

  return (
    <>
      {transition((styles, item) =>
        item ? (
          <Aligner>
            <OutsideClickHandler onOutsideClick={onClose}>
              <Block style={styles}>
                <ul>
                  <li>
                    <Link to="/@velog">공지사항</Link>
                  </li>
                  <li>
                    <Link to="/policy">서비스 정책</Link>
                  </li>
                </ul>
              </Block>
            </OutsideClickHandler>
          </Aligner>
        ) : null,
      )}
    </>
  );
}

const Aligner = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 5;
`;
const Block = styled(animated.div)`
  border: 1px solid ${themedPalette.border3};
  margin-top: 0.5rem;
  width: 12rem;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  background: ${themedPalette.bg_element1};
  color: ${themedPalette.text1};
  transform-origin: top right;
  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  li {
    font-weight: 600;

    font-size: 0.875rem;
    padding: 0;
    &:hover {
      color: ${themedPalette.primary1};
    }
    a {
      display: block;
      padding: 0.75rem 1rem;

      color: inherit;
      text-decoration: none;
    }
  }
  li + li {
    border-top: 1px solid ${themedPalette.border4};
  }
  .contact {
    border-top: 1px solid ${themedPalette.border3};
    padding: 1rem;
    h5 {
      margin: 0;
      font-size: 0.75rem;
    }
    .email {
      color: ${themedPalette.text1};
      font-size: 0.75rem;
    }
  }
`;

const GraphCDNWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  img {
    width: 120px;
    height: auto;
  }
`;

export default MainMobileHeadExtra;
