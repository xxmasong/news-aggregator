import { useHotkeys } from 'react-hotkeys-hook';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggle } from '@/store/hotkeys';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';

function HotKeys() {
  const isHotKeysDialogOpen = useSelector((state: RootState) => state.hotKeys.isOpen);
  const dispatch = useDispatch();

  const handleToggleHotKeysDialog = () => {
    dispatch(toggle());
  };

  useHotkeys('alt+/', handleToggleHotKeysDialog);

  return (
    <Dialog fullWidth maxWidth="xs" onClose={handleToggleHotKeysDialog} open={isHotKeysDialogOpen}>
      <DialogTitle>Hot Keys</DialogTitle>
      <DialogContent>
        <FlexBox alignItems="center" height={50} justifyContent="space-between">
          <Typography>Toggle Hot Keys&apos; Dialog</Typography>
          <Button color="warning" variant="outlined" onClick={handleToggleHotKeysDialog}>
            alt + /
          </Button>
        </FlexBox>
      </DialogContent>
    </Dialog>
  );
}

export default HotKeys;
