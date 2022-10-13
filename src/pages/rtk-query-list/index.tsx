import React from 'react';
import List from '../../components/list';
import { useGetListQuery } from '../../store/rtk-query-list';
import { ListResponse } from '../../types/data-item';

const emptyArr: never[] = [];

interface QueryResult {
  currentData?: ListResponse;
  isFetching: boolean;
  isUninitialized: boolean;
}

const selectFromResult = ({ currentData, isFetching, isUninitialized }: QueryResult) => ({
  list: currentData ? currentData.list : emptyArr,
  count: currentData ? currentData.count : 0,
  isShowList: !isFetching && !isUninitialized
});

const RtkListWithQuery: React.FC = () => {
  const {
    list,
    count,
    isShowList
  } = useGetListQuery({}, { selectFromResult });
  console.log('isShowList', isShowList);
  console.log('data', list, count);

  return (
    <div>
      <div>
        <span>RtkList, count: {count}</span>
      </div>
      {
        isShowList ? <>
          <List list={list}/>
        </> : <div>Loading</div>
      }
    </div>
  );
};

export default RtkListWithQuery;
