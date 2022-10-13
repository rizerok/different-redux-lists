import React, {
  useEffect
} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import List from '../../components/list';
import {
  selectListOnly,
  selectListCount, selectIsListLoaded, getRequest
} from '../../store/rtk-list';

export interface SearchOptionsState {
  search: string;
  page: number;
  limit: number;
}

const RtkList: React.FC = () => {
  const userList = useAppSelector(selectListOnly);
  const userListCount = useAppSelector(selectListCount);
  const isListLoaded = useAppSelector(selectIsListLoaded);
  const dispatch = useAppDispatch();
  console.log('RtkList render', userList);

  useEffect(() => {
    dispatch(getRequest());
  }, [dispatch]);

  return (
    <div>
      <div>
        <span>RtkList, count: {userListCount}</span>
      </div>
      {
        isListLoaded ? <>
          <List list={userList}/>
        </> : <div>Loading</div>
      }
    </div>
  );
};

export default RtkList;
