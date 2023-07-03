import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const useUser = () => {
  const user = useSelector((state: RootState) => state.core.user);
  return user;
};

export const useUserId = () => {
  const user = useUser();
  return user && user.id;
};

export default useUser;
