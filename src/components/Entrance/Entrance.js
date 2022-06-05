import React from 'react';
import './Entrance.scss';

const Entrance = ({ name, data, children: Component, ...props }) => {
  return (
    <div className="entrance">
      <div className="header">{name}</div>
      <div className="body">
        {data?.map((obj, idx) => (
          <Component key={idx} {...obj} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Entrance);
