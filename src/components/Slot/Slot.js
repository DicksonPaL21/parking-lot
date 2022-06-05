import React from 'react';
import './Slot.scss';

const Slot = ({
  id,
  children,
  psize,
  onClick,
  isPark,
  isUnPark,
  vSize,
  occupied,
  ...props
}) => {
  const onClickFunc = (e) => {
    e.preventDefault();
    if (psize.value >= vSize) {
      onClick(e.target.id);
    }
  };

  let slotProps = {
    className: 'slot',
    onClick: onClickFunc,
  };

  if (occupied) {
    slotProps = {
      ...slotProps,
      className: `${slotProps.className} occupied`,
    };
  }

  if (isPark) {
    slotProps = {
      ...slotProps,
      className: `${slotProps.className} ${
        psize.value >= vSize && !occupied ? 'is-park' : 'not-allowed'
      }`,
    };
  }

  if (isUnPark) {
    slotProps = {
      ...slotProps,
      className: `${slotProps.className} ${
        occupied ? 'is-unpark' : 'not-allowed'
      }`,
    };
  }

  return (
    <div id={id} {...slotProps}>
      <div className="content">
        {/* <p>{children}</p> */}
        <p className="type">{psize.desc}</p>
      </div>
    </div>
  );
};

export default React.memo(Slot);
