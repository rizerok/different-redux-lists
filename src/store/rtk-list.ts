/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { AppState } from './index';
import { ListResponse } from '../types/data-item';

export interface ListState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  data: ListResponse | null;
}

const initialState: ListState = {
  status: 'idle',
  error: null,
  data: null
};

// First, create the thunk
export const getRequest = createAsyncThunk(
  '@rtkList/getRequest',
  () => {
    return fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((json) => ({ list: json, count: json.length }));
  }
);

const rtkListSlice = createSlice({
  name: '@rtkUserList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRequest.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getRequest.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(getRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = String(action.payload);
    });
  }
});


export const { actions, reducer, name } = rtkListSlice;

// selectors
export const selectUserList = ({ rtkList }: AppState) => rtkList;
export const selectUserListData = ({ rtkList }: AppState) => rtkList.data;
export const selectListOnly = createSelector(
  [selectUserListData],
  (data) => (data ? data.list : [])
);
export const selectListCount = createSelector(
  [selectUserListData],
  (data) => (data ? data.count : 0)
);
export const selectIsListLoaded = (
  { rtkList }: AppState
) => rtkList.status === 'succeeded';
