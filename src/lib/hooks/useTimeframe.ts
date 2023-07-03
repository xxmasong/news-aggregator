import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import home from '@/store/home';
import { RootState } from '@/store';

export function useTimeframe() {
  const dispatch = useDispatch();
  const actions = useMemo(
    () => bindActionCreators(home.actions, dispatch),
    [dispatch],
  );
  const timeframe = useSelector((state: RootState) => state.home.timeframe);

  return [timeframe, actions.choose] as const;
}
