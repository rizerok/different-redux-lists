import { Dispatch } from 'redux';
import { createSelector } from 'reselect';
import { AppState } from './index';
import {
  ActionReduxOnlyListGetRequestFailed,
  ActionReduxOnlyListGetRequestLoading,
  ActionReduxOnlyListGetRequestReset,
  ActionReduxOnlyListGetRequestSet,
  ActionReduxOnlyListGetRequestSucceeded,
  ReduxOnlyListActions
} from '../types/redux-only-list-actions';
import { ItemData } from '../types/data-item';

export const LIST_GET_REQUEST_LOADING = '@redux-only-list/get/request/loading';
export const LIST_GET_REQUEST_SUCCEEDED = '@redux-only-list/get/request/succeeded';
export const LIST_GET_REQUEST_FAILED = '@redux-only-list/get/request/failed';
export const LIST_GET_REQUEST_SET = '@redux-only-list/get/request/set';
export const LIST_GET_REQUEST_RESET = '@redux-only-list/get/request/reset';

export interface ReduxOnlyListData {
  list: ItemData[];
  count: number;
}

export const actionReduxOnlyListGetRequestLoading: ActionReduxOnlyListGetRequestLoading = {
  type: LIST_GET_REQUEST_LOADING
};
export const actionReduxOnlyListGetRequestSucceeded: ActionReduxOnlyListGetRequestSucceeded = {
  type: LIST_GET_REQUEST_SUCCEEDED
};
export const actionReduxOnlyListGetRequestFailed = (error: string): ActionReduxOnlyListGetRequestFailed => ({
  type: LIST_GET_REQUEST_FAILED,
  payload: error
});
export const actionReduxOnlyListGetRequestSet = (
  ReduxOnlyListData: ReduxOnlyListData
): ActionReduxOnlyListGetRequestSet => ({
  type: LIST_GET_REQUEST_SET,
  payload: ReduxOnlyListData
});
export const actionReduxOnlyListGetRequestReset: ActionReduxOnlyListGetRequestReset = {
  type: LIST_GET_REQUEST_RESET
};

export interface ReduxOnlyListState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  data: ReduxOnlyListData | null;
}

const initialState: ReduxOnlyListState = {
  status: 'idle',
  error: null,
  data: null
};

const reducer = (state = initialState, action: ReduxOnlyListActions): ReduxOnlyListState => {
  switch (action.type) {
    case LIST_GET_REQUEST_LOADING: {
      return {
        ...state,
        status: 'loading'
      };
    }
    case LIST_GET_REQUEST_SUCCEEDED: {
      return {
        ...state,
        status: 'succeeded',
        error: null
      };
    }
    case LIST_GET_REQUEST_FAILED: {
      return {
        ...state,
        status: 'failed',
        error: action.payload
      };
    }
    case LIST_GET_REQUEST_SET: {
      return {
        ...state,
        data: action.payload
      };
    }
    case LIST_GET_REQUEST_RESET: {
      return {
        ...state,
        data: null
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

// action creators
export const searchInList = (
  searchOptions?: any
) => async (dispatch: Dispatch<ReduxOnlyListActions>) => {
  dispatch(actionReduxOnlyListGetRequestLoading);

  try {
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((json) => ({ list: json, count: json.length }));
    dispatch(actionReduxOnlyListGetRequestSet(data));
    dispatch(actionReduxOnlyListGetRequestSucceeded);
  } catch (e) {
    dispatch(actionReduxOnlyListGetRequestFailed(String(e)));
  }
};

// selectors
export const selectReduxOnlyListData = ({ reduxOnlyList }: AppState) => reduxOnlyList.data;
export const selectListOnly = createSelector(
  [selectReduxOnlyListData],
  (data) => (data ? data.list : [])
);
export const selectListCount = createSelector(
  [selectReduxOnlyListData],
  (data) => (data ? data.count : 0)
);
export const selectIsListLoaded = (
  { reduxOnlyList }: AppState
) => reduxOnlyList.status === 'succeeded';
