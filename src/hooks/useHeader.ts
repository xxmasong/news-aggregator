import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setLayer, showAuthModal } from '@/store/core';
import { logout } from '@/services/AuthService';
import useAuth from './useAuth';
import useToggle from '@/lib/hooks/useToggle';

export default function useHeader() {
  const dispatch = useDispatch();  
  const { setUnauthorized } = useAuth();
  const [showUserMenu, toggleUserMenu] = useToggle(false);
  const refUserMenu = useRef<HTMLDivElement>(null);

  const onLogin = useCallback(() => {
    dispatch(showAuthModal('LOGIN'));
  }, [dispatch]);

  const onLogout = useCallback(async () => {
    dispatch(setLayer(true));
    await logout();
    setUnauthorized();
  }, [setUnauthorized]);

  const onOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if (!refUserMenu.current) return;
      if (refUserMenu.current.contains(e.target as any)) return;
      toggleUserMenu();
    },
    [toggleUserMenu],
  );

  return { 
    showUserMenu, 
    refUserMenu, 
    onLogin, 
    onLogout, 
    onOutsideClick,
    toggleUserMenu 
  };
}
