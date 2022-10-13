import {
  LIST_GET_REQUEST_LOADING,
  LIST_GET_REQUEST_SUCCEEDED,
  LIST_GET_REQUEST_FAILED,
  LIST_GET_REQUEST_SET,
  LIST_GET_REQUEST_RESET,
  ReduxOnlyListData
} from '../store/redux-only';

export interface ActionReduxOnlyListGetRequestLoading {
  type: typeof LIST_GET_REQUEST_LOADING;
}

export interface ActionReduxOnlyListGetRequestSucceeded {
  type: typeof LIST_GET_REQUEST_SUCCEEDED;
}

export interface ActionReduxOnlyListGetRequestFailed {
  type: typeof LIST_GET_REQUEST_FAILED;
  payload: string;
}

export interface ActionReduxOnlyListGetRequestSet {
  type: typeof LIST_GET_REQUEST_SET;
  payload: ReduxOnlyListData;
}

export interface ActionReduxOnlyListGetRequestReset {
  type: typeof LIST_GET_REQUEST_RESET;
}

export type ReduxOnlyListActions = ActionReduxOnlyListGetRequestLoading
  | ActionReduxOnlyListGetRequestSucceeded
  | ActionReduxOnlyListGetRequestFailed
  | ActionReduxOnlyListGetRequestSet
  | ActionReduxOnlyListGetRequestReset
