import {INCREASE, DECREASE, NAVIGATION, CLICK} from './types';

export const counterIncrease = (e) => ({type: INCREASE, e});
export const click = () => ({type: CLICK, payload: 'click'});
export const counterDecrease = (i) => ({type: DECREASE, payload: i});
export const dieuhuong = (a) => ({type: NAVIGATION, payload: a});
