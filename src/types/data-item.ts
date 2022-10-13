export interface ItemData {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export type ListResponse = {
  list: Array<ItemData>;
  count: number;
}
