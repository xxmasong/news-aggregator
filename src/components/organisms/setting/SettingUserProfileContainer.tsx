import SettingUserProfile from '@/components/molecules/setting/SettingUserProfile';
import RequireLogin from '@/components/atoms/RequireLogin';
import useAuth from '@/hooks/useAuth';

function SettingUserProfileContainer() {
  const { user, setAuthUser } = useAuth();

  if (!user) {
    return <RequireLogin hasMargin />;
  }

  return (
    <SettingUserProfile
      user={user}
      updateAuthUser={setAuthUser}
    />
  );
}

export default SettingUserProfileContainer;
