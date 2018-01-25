import * as types from './mutation-types';

export default {
  [types.GET_DATA] (state, data) {
    state.pic = data;
  }
};
