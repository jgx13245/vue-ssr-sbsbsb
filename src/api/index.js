
import axios from 'axios';

export const baseURL = '/active/api'
axios.defaults.baseURL = baseURL
axios.defaults.timeout = 5000
export default {
  getData() {
    return axios({
      url: '/public/banner/myf/list',
      method: 'GET'
    });
  },
  login(config) {
    return axios({
      url: '/public/user/login',
      method: 'POST',
      data: config
    })
  }
}
