import { combineReducers } from 'redux';
import core, { CoreState } from './core';
import error, { ErrorState } from './error';
import scroll, { ScrollState } from './scroll';
import home, { HomeState } from './home';
import theme, { ThemeState } from './theme';
import hotKeys, { HotKeysState } from './hotkeys';
import notifications, { NotificationsState } from './notifications';
import news, { NewsState } from './news';

export type RootState = {
  core: CoreState;
  news: NewsState;
  error: ErrorState;
  scroll: ScrollState;
  home: HomeState;
  theme: ThemeState;
  hotKeys: HotKeysState;
  notifications: NotificationsState;
};

const rootReducer = combineReducers({
  core,
  news: news.reducer,
  error: error.reducer,
  scroll: scroll.reducer,
  home: home.reducer,
  theme: theme.reducer,
  hotKeys: hotKeys.reducer,
  notifications: notifications.reducer,
  
});

export default rootReducer;
