import React, { useEffect } from 'react';
import { AppState } from '../../store';
import { ItemState } from '../../utils/page-list-store';
import customReduxStore from '../../store/custom-redux-list';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemData } from '../../types/data-item';

interface MapStateToProps {
  data: ItemData | null;
}

interface MapDispatchToProps {
  getItem: (id: string) => void;
}

type Props = MapStateToProps & MapDispatchToProps;

const CustomReduxItem: React.FC<Props> = ({ data, getItem }) => {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getItem(id);
    }
  }, [id, getItem]);
  const navigate = useNavigate();

  if (!data) {
    return null;
  }

  return (
    <div>
      <button onClick={() => {navigate(-1)}}>{'<'}history back</button>
      <h1>
        { data.title }
      </h1>
      <div>
        { data.body }
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  getItem: customReduxStore.requestItem
};

const mpaStateToProps = (appState: AppState): MapStateToProps => ({
  data: (appState[customReduxStore.itemReducerName] as ItemState<ItemData>).data,
});

export default connect(mpaStateToProps, mapDispatchToProps)(CustomReduxItem);
