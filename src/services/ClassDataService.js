import axios from 'axios';

class ClassDataService {
  create(data) {
    return axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/class`,
      data
    );
  }

  get(id) {
    return axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/class/` + id
    );
  }

  getByIds(arr) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/class`, {
      params: { ids: arr }
    });
  }

  join(data) {
    return axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/class/join`,
      data
    );
  }

  leave(data) {
    return axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/class/leave`,
      data
    );
  }

  update(data) {
    return axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/class/`,
      data
    );
  }

  delete(data) {
    return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/class/`, {
      data: data
    });
  }

  getUniversities() {
    return axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/universities`
    );
  }
}

export default new ClassDataService();
