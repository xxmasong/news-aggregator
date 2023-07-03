import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { themedPalette } from '@/lib/styles/themes';
import {
  MdTrendingUp,
  MdAccessTime,
  MdSettingsApplications,
  MdSearch,
  MdArrowDropDown,
  MdMoreVert,
} from 'react-icons/md';
import { useSpring, animated } from 'react-spring';
import media, { mediaQuery } from '@/lib/styles/media';
import PlainNavLink from '@/components/atoms/PlainNavLink';
import MainResponsive from '@/components/atoms/MainResponsive';
import useToggle from '@/lib/hooks/useToggle';
import { useRef } from 'react';
import { useTimeframe } from '@/lib/hooks/useTimeframe';
import TimeframePicker, { timeframes } from './TimeframePicker';
import HomeMobileHeadExtra from './HomeMobileHeadExtra';
import { Timeframe } from '@/store/home';

function HeaderTab() {
  const location = useLocation();
  const isArticle = location.pathname === '/article';
  const isSearch = location.pathname === '/search';
  const isSettings = location.pathname === '/account';

  const springStyle = useSpring({
    left: 
      location.pathname === '/recent' ? '33.33%' : 
        location.pathname === '/trending' ? '66.6%' : '0%',
        config: {
          friction: 0,
          tension: 0,
          duration: 0
        },
  });

  //////////////////////////////////////
  

  const [extra, toggle] = useToggle(false);
  const [timeframePicker, toggleTimeframePicker] = useToggle(false);
  const moreButtonRef = useRef<HTMLDivElement | null>(null);
  const timeframeRef = useRef<HTMLDivElement | null>(null);
  const [timeframe] = useTimeframe();

  const onClose = (e: React.MouseEvent<HTMLElement>) => {
    if (!moreButtonRef.current) return;
    if (
      e.target === moreButtonRef.current ||
      moreButtonRef.current.contains(e.target as Node)
    ) {
      return;
    }
    toggle();
  };

  const onCloseTimeframePicker = (e: React.MouseEvent<HTMLElement>) => {
    if (!timeframeRef.current) return;
    if (
      e.target === timeframeRef.current ||
      timeframeRef.current.contains(e.target as Node)
    ) {
      return;
    }
    toggleTimeframePicker();
  };

  if (isArticle || isSettings || isSearch) 
    return null;
  
  return (
    <MainResponsive>     
      <Wrapper> 
        <CategoryWrapper>
          {
            isSearch ? (
              <TabItem exact to="#"> 
                <MdSearch />
                SEARCH 
              </TabItem>
            ) : isSettings ? (
              <TabItem exact to="#"> 
                <MdSettingsApplications />
                SETTINGS 
              </TabItem>
            ) : (
              <>
                <TabItem exact to={"/"}>
                  <MdTrendingUp />
                  Headlines
                </TabItem>
                <TabItem exact to={"/recent"}>
                  <MdAccessTime />
                  Recent
                </TabItem>
                <TabItem exact to={"/trending"}>
                  Category
                </TabItem>
                <Indicator
                  style={springStyle}
                />
              </>
            )
          }
        </CategoryWrapper>   
        <OptionWrapper>
          <Block>
              <MdAccessTime />
              {(
                <>
                  <Selector onClick={toggleTimeframePicker} ref={timeframeRef}>
                    {timeframes.find((t) => t[0] === timeframe)![1]}{' '}
                    <MdArrowDropDown />
                  </Selector>
                  <TimeframePicker
                    visible={timeframePicker}
                    onClose={onCloseTimeframePicker}
                  />
                </>
              )}
          </Block>
          <Block>
              <MdTrendingUp />
              <MobileMore ref={moreButtonRef}>
                <MdMoreVert className="more" onClick={toggle} />
              </MobileMore>
              <HomeMobileHeadExtra visible={extra} onClose={onClose} />
          </Block>
        </OptionWrapper>
      </Wrapper>
    </MainResponsive>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .more {
    cursor: pointer;
    font-size: 1.5rem;
    color: ${themedPalette.text3};
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  ${media.small} {
    width: 100%;
  }
`;

const TabItem = styled(PlainNavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 3rem;
  color: ${themedPalette.text2};
  text-decoration: none;
  transition: 0.25s color ease-in-out;
  font-weight: 600;
  &.active {
    color: ${themedPalette.primary2};
  }
  ${media.small} {
    flex: 1;
    font-size: 1rem;
    height: 2.5rem;
  }
`;

const Indicator = styled(animated.div)`
  width: 33.3333%;
  height: 2px;
  background: ${themedPalette.primary2};
  position: absolute;
  bottom: -2px;
  transition: 0.25s left ease-in-out;
  ${media.small} {
    width: 33.3333%;
  }
`;

///////////////////////////////////////


const OptionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  .more {
    cursor: pointer;
    font-size: 1.5rem;
    color: ${themedPalette.text3};
  }
`;

const MobileMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Block = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  text-decoration: none;
  color: ${themedPalette.text3};
  height: 3rem;
  margin-left: 0.5rem;

  svg {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  &.active {
    color: ${themedPalette.text1};
    font-weight: bold;
  }
  ${mediaQuery(944)} {
    font-size: 1rem;
    width: 5rem;
    svg {
      font-size: 1.25rem;
    }
  }
`;

const Selector = styled.div`
  background: ${themedPalette.bg_element1};
  height: 2rem;
  width: 6rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-weight: 600;
  color: ${themedPalette.text2};
  font-size: 0.875rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.75;
    }
  }
  ${media.medium} {
    width: 5.25rem;
    font-size: 0.75rem;
  }
`;

export default HeaderTab;
