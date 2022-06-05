import React, { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from './store/actions';

// Component
import Entrance from './components/Entrance';
import Slot from './components/Slot';

function App({ appData, actions, ...props }) {
  const [current, setCurrent] = useState();
  const [isPark, setIsPark] = useState(false);
  const [isUnPark, setIsUnPark] = useState(false);
  const [vSize, setVSize] = useState(0);

  useLayoutEffect(() => {
    // Initialize our parking slots
    actions.initSpace();
  }, [actions]);

  const onClickSlot = (id) => {
    const _current = appData
      .map((d) => d.find((f) => f.id === id))
      .filter((f) => !!f)[0];
    setCurrent(_current);

    const { occupied } = _current;

    const onSuccess = () => {
      setIsUnPark(false);
      setIsPark(false);
    };

    if (isPark && !occupied) {
      actions.park(id, vSize, onSuccess);
    }

    if (isUnPark && occupied) {
      actions.unpark(id, onSuccess);
    }
  };

  const entrance = ['A', 'B', 'C'];

  const onParkVehicle = () => {
    setIsPark(true);
    setIsUnPark(false);
  };

  const onUnParkVehicle = () => {
    setIsUnPark(true);
    setIsPark(false);
  };

  const onCancel = () => {
    setIsUnPark(false);
    setIsPark(false);
  };

  return (
    <div className="App">
      <div className="entry">
        <span
          className={`btn ${isPark ? 'disabled' : ''}`}
          onClick={() => (!isPark ? onUnParkVehicle() : () => {})}
        >
          Unpark
        </span>
        <span
          className={`btn ${isUnPark ? 'disabled' : ''}`}
          onClick={() => (!isUnPark ? onParkVehicle() : () => {})}
        >
          Park
        </span>
        <div className="vehicle-group">
          <span>Vehicle</span>
          <select
            name="vehicle"
            onChange={(e) => setVSize(Number(e.target.value))}
            disabled={!isPark}
          >
            <option value="0">Small</option>
            <option value="1">Medium</option>
            <option value="2">Large</option>
          </select>
        </div>
        {(isPark || isUnPark) && (
          <span className="btn" onClick={onCancel}>
            Cancel
          </span>
        )}
      </div>
      <div className="parking-slot">
        {appData?.map((data, idx) => (
          <Entrance key={idx} name={entrance[idx]} data={data}>
            {({ ..._props }) => {
              const slotProps = {
                isPark,
                isUnPark,
                vSize,
                onClick: onClickSlot,
                ..._props,
              };
              return <Slot {...slotProps} />;
            }}
          </Entrance>
        ))}
      </div>
      {!isPark && !isUnPark && current && (
        <div className="details">
          <p>Occupied: {current.occupied ? 'yes' : 'no'}</p>
          <p>Parking Size: {current.psize.desc}</p>
          {current?.vsize && (
            <p>
              Vehicle Size: {['Small', 'Medium', 'Large'][current.vsize.value]}
            </p>
          )}
          {current?.start && (
            <p>Start: {new Date(current?.start).toLocaleString()}</p>
          )}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({ appData: state.data });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
