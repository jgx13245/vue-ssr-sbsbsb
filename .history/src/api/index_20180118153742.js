
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';
export default {
  getData() {
    return axios({
      url: 'http://localhost:8080/data',
      method: 'GET'
    });
  }
}
