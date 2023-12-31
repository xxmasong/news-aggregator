import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import error from '@/store/error';
import { RootState } from '@/store';

export default function useNotFound() {
  const dispatch = useDispatch();

  const isNotFound = useSelector(
    (state: RootState) => state.error.errorType === 'NOT_FOUND',
  );

  const showNotFound = useCallback(
    () => dispatch(error.actions.showNotFound()),
    [dispatch],
  );

  const reset = useCallback(() => dispatch(error.actions.reset()), [dispatch]);

  return { showNotFound, reset, isNotFound };
}
