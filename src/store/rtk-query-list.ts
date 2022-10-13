/* eslint-disable no-param-reassign */
import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from './api-slice';
import { ItemData } from '../types/data-item';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getList: builder.query({
      query: (params) => {
        const usp = new URLSearchParams();
        // eslint-disable-next-line no-restricted-syntax
        for (const key of Object.keys(params)) {
          if (String(params[key])) {
            usp.append(key, String(params[key]));
          }
        }
        return `/posts?${usp.toString()}`;
      },
      transformResponse: (response: ItemData[], meta, arg) => {
        return { list: response, count: response.length };
      }
    })
  })
});

export const selectUsersResult = extendedApiSlice.endpoints.getList.select(undefined);
export const selectUserList = createSelector(
  selectUsersResult,
  (userResult) => (userResult.data ? userResult.data.list : [])
);
export const selectUsersCount = createSelector(
  selectUsersResult,
  (userResult) => (userResult.data ? userResult.data.count : 0)
);
export const selectIsListLoading = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.isLoading
);

export const { useGetListQuery } = extendedApiSlice;
