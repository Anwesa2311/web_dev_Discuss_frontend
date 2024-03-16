import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/v1`;

class CommentsDataService {
  getCommentsById(questionId) {
    return axios.get(`${baseUrl}/comments/${questionId}`);
  }

  postComments(params) {
    return axios.post(`${baseUrl}/comments`, params);
  }

  updateComment(params) {
    return axios.put(`${baseUrl}/comments`, params);
  }
  deleteComment(params) {
    return axios.delete(`${baseUrl}/comments`, {data:params});
  }
}

export default new CommentsDataService();
