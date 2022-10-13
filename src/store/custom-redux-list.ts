/* eslint-disable @typescript-eslint/no-explicit-any */
import PageListStore from '../utils/page-list-store';
import { ItemData } from '../types/data-item';

interface SearchOptions {
  search?: string;
  status?: string;
  date?: number;
  page?: number;
  limit?: number;
  role?: number;
  state?: string;
}

const customReduxStore = new PageListStore<ItemData, SearchOptions>({
  actionName: 'custom-redux-store',
  requestItemApi: (userId: string) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
      .then((response) => response.json());
  },
  requestSearchInListApi: (searchOptions: any) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((json) => ({ list: json, count: json.length }));
  }
});

export default customReduxStore;
