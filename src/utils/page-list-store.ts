import { Dispatch } from 'redux';

type ListData<ItemData> = {
  list: Array<ItemData>;
  count: number;
}

interface PageListConfig<ItemData, SearchOptions> {
  actionName: string;
  requestItemApi: (id: string) => Promise<ItemData>
  requestSearchInListApi: (searchOptions: SearchOptions) => Promise<ListData<ItemData>>
}

type ItemDataState<ItemData> = ItemData | null;
// Item action interfaces

interface ActionItemSet<ItemData> {
  type: string;
  payload: ItemDataState<ItemData>;
}
interface ActionItemRequestStart<ItemData> {
  type: string;
  payload?: ItemDataState<ItemData>;
}
interface ActionItemRequestEnd<ItemData> {
  type: string;
  payload?: ItemDataState<ItemData>;
}
type ActionsItem<ItemData> =
  ActionItemSet<ItemData> | ActionItemRequestStart<ItemData> | ActionItemRequestEnd<ItemData>;

// List action interfaces
interface ActionListSet<ItemData> {
  type: string;
  payload: ListData<ItemData>;
}
interface ActionListRequestStart<ItemData> {
  type: string;
  payload?: ListData<ItemData>;
}
interface ActionListRequestEnd<ItemData> {
  type: string;
  payload?: ListData<ItemData>;
}
type ActionsList<ItemData> =
  ActionListSet<ItemData> | ActionListRequestStart<ItemData> | ActionListRequestEnd<ItemData>;

// state interfaces
export interface ItemState<ItemData> {
  data: ItemDataState<ItemData>;
  requestStart: boolean;
  requestEnd: boolean;
}
export interface ListState<ItemData> {
  data: ListData<ItemData>;
  requestStart: boolean;
  requestEnd: boolean;
}

class PageListStore<ItemData, SearchOptions> {
  readonly itemReducerName: string;

  readonly listReducerName: string;

  private readonly ACTION_ITEM_SET: string;

  private readonly ACTION_ITEM_REQUEST_START: string;

  private readonly ACTION_ITEM_REQUEST_END: string;

  private readonly ACTION_LIST_SET: string;

  private readonly ACTION_LIST_REQUEST_START: string;

  private readonly ACTION_LIST_REQUEST_END: string;

  readonly actionItemRequestStart: ActionItemRequestStart<ItemData>;

  readonly actionItemRequestEnd: ActionItemRequestEnd<ItemData>;

  readonly actionItemSet: (payload: ItemDataState<ItemData>) => ActionItemSet<ItemData>;

  readonly actionListRequestStart: ActionListRequestStart<ItemData>;

  readonly actionListRequestEnd: ActionListRequestEnd<ItemData>;

  readonly actionListSet: (payload: ListData<ItemData>) => ActionListSet<ItemData>;

  private readonly initialItemState: ItemState<ItemData>;

  private readonly initialListState: ListState<ItemData>;

  private readonly requestItemApi: (id: string) => Promise<ItemData>;

  private readonly requestSearchInListApi: (
    searchOptions: SearchOptions
  ) => Promise<ListData<ItemData>>;

  // isListLoading: (listState: ListState<ItemData>) => boolean;

  constructor({
                actionName,
                requestItemApi,
                requestSearchInListApi
              }: PageListConfig<ItemData, SearchOptions>) {
    // action names
    this.itemReducerName = `${actionName}-item`;
    this.listReducerName = `${actionName}-list`;
    this.ACTION_ITEM_SET = `@${actionName}/set`;
    this.ACTION_ITEM_REQUEST_START = `@${actionName}/request-start`;
    this.ACTION_ITEM_REQUEST_END = `@${actionName}/request-end`;
    this.ACTION_LIST_SET = `@${actionName}-list/set`;
    this.ACTION_LIST_REQUEST_START = `@${actionName}-list/request-start`;
    this.ACTION_LIST_REQUEST_END = `@${actionName}-list/request-end`;
    // actions & action wrappers
    // item
    this.actionItemRequestStart = {
      type: this.ACTION_ITEM_REQUEST_START
    };
    this.actionItemRequestEnd = {
      type: this.ACTION_ITEM_REQUEST_END
    };
    this.actionItemSet = (payload: ItemDataState<ItemData>): ActionItemSet<ItemData> => ({
      type: this.ACTION_ITEM_SET,
      payload
    });
    // list
    this.actionListRequestStart = {
      type: this.ACTION_LIST_REQUEST_START
    };
    this.actionListRequestEnd = {
      type: this.ACTION_LIST_REQUEST_END
    };
    this.actionListSet = (payload: ListData<ItemData>): ActionListSet<ItemData> => ({
      type: this.ACTION_LIST_SET,
      payload
    });

    this.initialItemState = {
      data: null,
      requestStart: false,
      requestEnd: false
    };

    this.initialListState = {
      data: {
        list: [],
        count: 0
      },
      requestStart: false,
      requestEnd: false
    };

    this.requestItemApi = requestItemApi;
    this.requestSearchInListApi = requestSearchInListApi;
  }

  itemReducer = (
    state = this.initialItemState,
    { type, payload }: ActionsItem<ItemData>
  ): ItemState<ItemData> => {
    switch (type) {
      case this.ACTION_ITEM_SET: {
        return {
          ...state,
          data: payload ? { ...payload } : null
        };
      }
      case this.ACTION_ITEM_REQUEST_START: {
        return {
          ...state,
          requestStart: true,
          requestEnd: false
        };
      }
      case this.ACTION_ITEM_REQUEST_END: {
        return {
          ...state,
          requestStart: false,
          requestEnd: true
        };
      }
      default: {
        return state;
      }
    }
  };

  listReducer = (
    state = this.initialListState,
    { type, payload }: ActionsList<ItemData>
  ): ListState<ItemData> => {
    switch (type) {
      case this.ACTION_LIST_SET: {
        if (payload) {
          return {
            ...state,
            data: {
              list: [...payload.list],
              count: payload.count
            }
          };
        }
        return state;
      }
      case this.ACTION_LIST_REQUEST_START: {
        return {
          ...state,
          requestStart: true,
          requestEnd: false
        };
      }
      case this.ACTION_LIST_REQUEST_END: {
        return {
          ...state,
          requestStart: false,
          requestEnd: true
        };
      }
      default: {
        return state;
      }
    }
  };

  requestItem = (id: string) => (dispatch: Dispatch<ActionsItem<ItemData>>) => {
    dispatch(this.actionItemRequestStart);
    this.requestItemApi(id)
      .then((res: ItemData) => {
        dispatch(this.actionItemSet(res));
      })
      .catch(() => {
        dispatch(this.actionItemSet(null));
      })
      .finally(() => {
        dispatch(this.actionItemRequestEnd);
      });
  };

  resetItem = () => (dispatch: Dispatch<ActionsItem<ItemData>>) => {
    dispatch(this.actionItemSet(null));
  };

  setItem = (item: ItemData) => (dispatch: Dispatch<ActionsItem<ItemData>>) => {
    dispatch(this.actionItemSet(item));
  };

  searchInList = (searchOptions: SearchOptions) => (dispatch: Dispatch<ActionsList<ItemData>>) => {
    dispatch(this.actionListRequestStart);
    this.requestSearchInListApi(searchOptions)
      .then((res: ListData<ItemData>) => {
        dispatch(this.actionListSet(res));
      })
      .catch(() => {
        dispatch(this.actionListSet(this.initialListState.data));
      })
      .finally(() => {
        dispatch(this.actionListRequestEnd);
      });
  };

  // selectors
  static getListOnly<ItemData>(listState: ListState<ItemData>): Array<ItemData> {
    return listState.data.list;
  }

  static getListCountOnly<ItemData>(listState: ListState<ItemData>): number {
    return listState.data.count;
  }

  static isListLoading<ItemData>(listState: ListState<ItemData>): boolean {
    return listState.requestStart && !listState.requestEnd;
  }
}

export default PageListStore;
