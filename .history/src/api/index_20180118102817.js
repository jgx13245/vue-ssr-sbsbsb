/**
 * Created by zhangjian on 2018/1/16.
 */
import axios from 'axios';
//axios.defaults.baseURL = 'http://localhost:8080';
export default {
  getData() {
    return axios({
      url: '/data',
      method: 'GET'
    });
  }
}
