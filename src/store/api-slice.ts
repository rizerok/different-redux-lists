import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const apiSlice = createApi({
  reducerPath: '@api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    // prepareHeaders: (headers) => {
    //   const token = storage.getItem('token', { decode: false });
    //   headers.set('Accept', 'application/json');
    //   headers.set('Content-Type', 'application/json');
    //   headers.set('Cookie', `token=${token};`);
    //   return headers;
    // },
    // credentials: 'include'
  }),
  endpoints: () => ({})
});

export default apiSlice;
