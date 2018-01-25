/**
 * Created by zhangjian on 2018/1/16.
 */
import * as types from './mutation-types';

export default {
  [types.GET_DATA] (state, data) {
    state.pic = data;
  }
};
