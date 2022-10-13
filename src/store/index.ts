import { combineReducers, configureStore } from '@reduxjs/toolkit';
import customReduxStore from './custom-redux-list';
import reduxOnlyListReducer from './redux-only';
import { reducer as rtkList } from './rtk-list';
import { apiSlice } from './api-slice';

const store = configureStore({
  reducer: combineReducers({
    [customReduxStore.listReducerName]: customReduxStore.listReducer,
    [customReduxStore.itemReducerName]: customReduxStore.itemReducer,
    reduxOnlyList: reduxOnlyListReducer,
    rtkList,
    [apiSlice.reducerPath]: apiSlice.reducer
  }),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
