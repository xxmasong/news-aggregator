import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AuthUser } from '@/lib/graphql/user';

export type AuthMode = 'REGISTER' | 'LOGIN';
export type CoreAction = ActionType<typeof actions>;

export type CoreState = {
  layer: boolean;
  auth: {
    visible: boolean;
    mode: AuthMode;
  };
  user: AuthUser | null;
};
