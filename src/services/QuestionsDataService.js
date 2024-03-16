import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/v1`;

class QuestionsDataService {
  /**
   * Returns a list of questions asks
   *
   * @param {Object} params Set of filters to filter out questions
   *
   * Example:
   * params = {
   *      classroomId: string,
   *      search: string,
   *      page: number,
   *      perPage: number
   * }
   */
  getQuestions(params) {
    return axios.get(`${baseUrl}/questions`, { params });
  }

  getQuestionById(id) {
    return axios.get(`${baseUrl}/questions/id/${id}`);
  }

  editQuestionById(id, params) {
    return axios.patch(`${baseUrl}/questions/id/${id}`, params);
  }

  deleteQuestionById(id, params) {
    return axios.delete(`${baseUrl}/questions/id/${id}`, { data: params });
  }

  postQuestions(params) {
    return axios.post(`${baseUrl}/questions/newPost`, params);
  }
}

export default new QuestionsDataService();
