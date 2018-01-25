
import axios from 'axios';
//axios.defaults.baseURL = 'http://localhost:8090';
export default {
  getData() {
    return axios({
      url: '/data',
      method: 'GET'
    });
  }
}
