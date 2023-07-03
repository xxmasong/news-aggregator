import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { FlexBox } from '@/components/styled';
import { themedPalette } from '@/lib/styles/themes';
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import { Button, Tooltip } from '@mui/material';
import { open as openHotKeysDialog } from '@/store/hotkeys';

function HeaderHotKeysButton() {
  const dispatch = useDispatch();
  return (
    <FlexBox>
      <Tooltip title="Hot keys" arrow>
        <HotKeysButton
          onClick={() => dispatch(openHotKeysDialog())}
        >
          <KeyboardAltOutlinedIcon />
        </HotKeysButton>
      </Tooltip>
    </FlexBox>
  );
}

const HotKeysButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  outline: none;
  border-radius: 50%;
  color: ${themedPalette.text1};
  cursor: pointer;
  &:hover {
    background: ${themedPalette.slight_layer};
  }
  min-width: 40px;
  margin-right: 0.5rem;
`;

export default HeaderHotKeysButton;
