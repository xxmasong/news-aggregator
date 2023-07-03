import styled from 'styled-components';
import PageTemplate from '@/components/templates/PageTemplate';
import SettingRowsContainer from '@/components/organisms/setting/SettingRowsContainer';
import media from '@/lib/styles/media';
import SettingUserProfileContainer from '../organisms/setting/SettingUserProfileContainer';

export type SettingPageProps = {};

function SettingPage(props: SettingPageProps) {
  return (
    <SettingTemplate>
      <main>
        <SettingUserProfileContainer />
        <SettingRowsContainer />
      </main>
    </SettingTemplate>
  );
}

const SettingTemplate = styled(PageTemplate)`
  main {
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
    width: 768px;
    padding-bottom: 5rem;
    ${media.medium} {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    ${media.small} {
      width: 100%;
      margin-top: 1.5rem;
    }
  }
`;

export default SettingPage;
