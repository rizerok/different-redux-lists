import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import customReduxStore from '../../store/custom-redux-list';
import { AppState } from '../../store';
import PageListStore from '../../utils/page-list-store';
import { ItemData } from '../../types/data-item';
import List from '../../components/list';

interface MapDispatchToProps {
  search: (searchOptions: any) => void;
}

export interface MapStateToProps {
  list: Array<ItemData>;
  count: number;
}

type CustomReduxListProps = MapDispatchToProps & MapStateToProps;

const CustomReduxList: React.FC<CustomReduxListProps> = ({
  list, count, search
}) => {
  useEffect(() => {
    search({});
  }, [search]);

  return (
    <List list={list} itemUrlPrefix="custom-redux-list"/>
  );
}

const mapDispatchToProps = {
  search: customReduxStore.searchInList
};

const mpaStateToProps = (appState: AppState): MapStateToProps => ({
  list: PageListStore.getListOnly(appState[customReduxStore.listReducerName]) as Array<ItemData>,
  count: PageListStore.getListCountOnly(appState[customReduxStore.listReducerName])
});

export default connect(mpaStateToProps, mapDispatchToProps)(CustomReduxList);
