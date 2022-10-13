import React from 'react';
import { Link } from 'react-router-dom';
import { ItemData } from '../../types/data-item';

interface Props {
  list: ItemData[],
  itemUrlPrefix?: string;
}

const List: React.FC<Props> = ({ list, itemUrlPrefix }) => {
  return (
    <div>
      {list.map(({ title, id }) => itemUrlPrefix ? (
        <Link to={`/${itemUrlPrefix}/${id}`} key={id}>
          <div style={{ padding: '20px', borderBottom: '1px solid #000' }}>
            <span>{title}</span>
          </div>
        </Link>
      ) : (
        <div style={{ padding: '20px', borderBottom: '1px solid #000' }} key={id}>
          <span>{title}</span>
        </div>
      ))}
    </div>
  );
};

export default List;
