import shortid from 'shortid';

export const MAX_COLS = 9;
export const MAX_ROWS = 3;

export const initSpaces = (park) => {
  let parkCopy = park;
  for (let i = 0; i < MAX_ROWS; i++) {
    for (let j = 0; j < MAX_COLS; j++) {
      parkCopy[i][j] = {
        id: shortid.generate(),
        occupied: false,
        psize: getRandomSize(),
        row: i,
        col: j,
      };
    }
  }
  return parkCopy;
};

// Compute total charges based on parking size and total time parked
export const compute = (size, totalTime) => {
  let remainingTime = totalTime;
  let t24 = 1000 * 60 * 24;
  let t1h = 1000 * 60;
  let charges = 0;

  var hourlyCharge = 0;

  if (size === 0) {
    hourlyCharge = 20;
  } else if (size === 1) {
    hourlyCharge = 60;
  } else if (size === 2) {
    hourlyCharge = 100;
  }

  // For parking that exceeds 24 hours, every full 24 hour chunk is charged 5,000 pesos regardless of parking slot.
  if (remainingTime > t24) {
    let n24 = parseInt(totalTime / t24);
    charges += n24 * 5000;
    remainingTime -= n24 * t24;
  }

  // First 3 hours has a flat rate of 40
  if (remainingTime > t1h * 3) {
    remainingTime -= t1h * 3;
    charges += 40;
  }

  // The exceeding hourly rate beyond the initial three (3) hours will be charged as follows:
  // - 20/hour for vehicles parked in SP;
  // - 60/hour for vehicles parked in MP; and
  // - 100/hour for vehicles parked in LP
  if (remainingTime > 0) {
    let remainingHours = Math.ceil(remainingTime / t1h);
    charges += remainingHours * hourlyCharge;
  }

  // return total charges
  return charges;
};

export const getVehicleDesc = (size) => {
  const type = ['S', 'M', 'L'];
  return type[parseInt(size)];
};

export const getRandomSize = () => {
  // SP = 0, MP = 1, LP = 2
  const max = 2;
  const min = 0;
  const descriptors = ['SP', 'MP', 'LP'];
  const size = Math.round(Math.random() * (max - min) + min);
  const desc = descriptors[size];
  return {
    value: size,
    desc: desc,
  };
};
