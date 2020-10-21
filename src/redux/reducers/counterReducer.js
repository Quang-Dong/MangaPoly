import {
  INCREASE,
  DECREASE,
  INCREASE_DONE,
  STOP_COUNTER,
  NAVIGATION,
} from '../actions/types';

const initialState = 0;

export default function (state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + (action.e || 1);

    case DECREASE:
      return state - action.payload;

    case INCREASE_DONE:
      return state + console.log(action.payload);

    case STOP_COUNTER:
      return console.log('STOP_COUNTER');

    // case NAVIGATION:
    //   return action.payload + console.log(action.payload);

    default:
      return state;
  }
}
