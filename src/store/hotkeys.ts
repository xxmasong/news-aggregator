import { createSlice } from '@reduxjs/toolkit';

export type HotKeysState = {
  isOpen: boolean;
};

const initialState: HotKeysState = {
  isOpen: false,
};

const hotKeys = createSlice({
  name: 'hotKeys',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    close: (state) => {
      state.isOpen = false;
    },
    open: (state) => {
      state.isOpen = true;
    },
  },
});

export const { toggle, close, open } = hotKeys.actions;
export default hotKeys;