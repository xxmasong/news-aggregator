import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {  SnackbarKey } from 'notistack';
import { Alert, Button } from '@mui/material';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { push, close } from '@/store/notifications';

function SW() {
  const dispatch = useDispatch();
  const notificationKey = useRef<SnackbarKey | null>(null);
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const closeNotification = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);

    if (notificationKey.current) {
      dispatch(close(notificationKey.current));
    }
  }, [setOfflineReady, setNeedRefresh, dispatch]);

  useEffect(() => {
    if (offlineReady) {
      dispatch(
        push({
          options: {
            autoHideDuration: 4500,
            content: <Alert severity="success">App is ready to work offline.</Alert>,
          },
        })
      );
    } else if (needRefresh) {
      notificationKey.current = dispatch(
        push({
          message: 'New content is available, click on the reload button to update.',
          options: {
            variant: 'warning',
            persist: true,
            action: (
              <>
                <Button onClick={() => updateServiceWorker(true)}>Reload</Button>
                <Button onClick={closeNotification}>Close</Button>
              </>
            ),
          },
        })
      );
    }
  }, [offlineReady, needRefresh, dispatch, updateServiceWorker, closeNotification]);

  return null;
}

export default SW;
