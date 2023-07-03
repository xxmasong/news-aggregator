import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { showAuthModal } from '@/store/core';

export default function useRequireLogin() {
  const dispatch = useDispatch();
  const requireLogin = useCallback(() => {
    dispatch(showAuthModal('LOGIN'));
  }, [dispatch]);
  return requireLogin;
}
