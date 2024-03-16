import axios from 'axios';

class UserDataService {
  doLogin(user) {
    
    return axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/signin`,
      user
    );
  }

  doRegisterUser(userInfo) {
    return axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/signup`,
      userInfo
    );
  }
}

export default new UserDataService();
