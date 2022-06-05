import { parking } from '../herlpers';
import * as types from './types';

const actions = {
  initSpace: (rows, cols) => (dispatch) => {
    const mr = rows ?? parking.MAX_ROWS;
    const mc = cols ?? parking.MAX_COLS;
    const park = new Array(mr).fill(null).map(() => new Array(mc).fill(null));

    const space = parking.initSpaces(park);
    dispatch({ type: types.SLOT_INIT_SPACE_TYPE, data: space });
  },

  park:
    (id, size, cb = false) =>
    (dispatch, getState) => {
      let resourceData = getState().data || {};

      const slot = findSlot(resourceData, id);

      const data = {
        ...slot,
        occupied: true,
        vsize: {
          value: parseInt(size),
          desc: parking.getVehicleDesc(size),
        },
        start: new Date(),
      };

      dispatch({ type: types.SLOT_PARK_VEHICLE_TYPE, data });

      const occupied = findSlot(getState().data, id)?.occupied;
      if (occupied) cb?.();
    },

  unpark:
    (id, cb = false) =>
    (dispatch, getState) => {
      let resourceData = getState().data || {};

      const data = findSlot(resourceData, id);

      if (data) {
        const diff = new Date() - data.start;
        const totalPayable = parking.compute(data.psize.value, diff);
        alert(`Total charges: P ${totalPayable}`);
      }

      dispatch({ type: types.SLOT_UNPARK_VEHICLE_TYPE, data });

      const occupied = findSlot(getState().data, id)?.occupied;
      if (!occupied) cb?.();
    },
};

const findSlot = (obj, id) => {
  return obj.map((d) => d.find((f) => f.id === id)).filter((f) => !!f)[0];
};

export default actions;
