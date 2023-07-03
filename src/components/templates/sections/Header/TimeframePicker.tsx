import React from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import OutsideClickHandler from 'react-outside-click-handler';
import { useTimeframe } from '@/lib/hooks/useTimeframe';
import { themedPalette } from '@/lib/styles/themes';

export type TimeframePickerProps = {
  visible: boolean;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
};

function TimeframePicker({ visible, onClose }: TimeframePickerProps) {
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

  const [timeframe, setTimeframe] = useTimeframe();

  return (
    <>
      {transition((styles, item) =>
        item ? (
          <Aligner>
            <OutsideClickHandler onOutsideClick={onClose}>
              <Block style={styles} onClick={onClose}>
                <ul>
                  {timeframes.map(([value, text]) => (
                    <li
                      key={value}
                      onClick={() => setTimeframe(value)}
                      className={value === timeframe ? 'active' : ''}
                    >
                      {text}
                    </li>
                  ))}
                </ul>
              </Block>
            </OutsideClickHandler>
          </Aligner>
        ) : null,
      )}
    </>
  );
}

export const timeframeMap: Record<Timeframe, string> = {
  day: '오늘',
  week: '이번 주',
  month: '이번 달',
  year: '올해',
};

export const timeframes = Object.entries(timeframeMap) as [Timeframe, string][];

const Aligner = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 5;
`;
const Block = styled(animated.div)`
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
    cursor: pointer;
    &:hover {
      background: ${themedPalette.bg_element2};
    }
    font-weight: 600;

    font-size: 0.875rem;
    padding: 0.75rem 1rem;

    &.active {
      color: ${themedPalette.primary1};
    }
  }
  li + li {
    border-top: 1px solid ${themedPalette.border4};
  }
  .contact {
    border-top: 1px solid #f1f3f5;
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

export default TimeframePicker;
