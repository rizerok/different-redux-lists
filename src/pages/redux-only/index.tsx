import React, {
  useEffect
} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import {
  selectListOnly,
  searchInList,
  selectListCount, selectIsListLoaded
} from '../../store/redux-only';
import List from '../../components/list';

const ReduxOnly: React.FC = () => {
  const userList = useAppSelector(selectListOnly);
  const userListCount = useAppSelector(selectListCount);
  const isListLoaded = useAppSelector(selectIsListLoaded);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchInList());
  }, [dispatch]);

  return (
    <div>
      <div>
        <span>ReduxOnly, count: {userListCount}</span>
      </div>
      {
        isListLoaded ? <>
          <List list={userList}/>
        </> : <div>Loading</div>
      }
    </div>
  );
};

export default ReduxOnly;
