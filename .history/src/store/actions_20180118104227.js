import * as types from './mutation-types';
import api from '../assets/api';
export default {
  getData({commit}, data) {
    api.getData().then((res) => {
      commit(types.GET_DATA, res.data.data.liveWodList);
    })
  }
};
