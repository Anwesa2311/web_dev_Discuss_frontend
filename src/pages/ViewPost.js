import React, { useState, useEffect, useContext } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import AppContext from '../AppContext';
import QuestionsDataService from '../services/QuestionsDataService';
import './ViewPost.css';
import Comments from './Comments.js';

export default function ViewPost() {
  const { user, dispatch } = useContext(AppContext);
  const [postdata, setPosts] = useState({});
  const location = useLocation();
  const { classroomId } = useParams();
  const navigate = useNavigate();

  let { questionId } = useParams();

  useEffect(() => {
    QuestionsDataService.getQuestionById(questionId)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
        NotificationManager.error('Error in loading question');
      });
  }, []);

  const deleteQuestion = () => {
    QuestionsDataService.deleteQuestionById(questionId, { userId: user._id })
      .then((res) => {
        NotificationManager.success('Question deleted!');
        navigate(`/classroom/${classroomId}`);
      })
      .catch((e) => {
        NotificationManager.error(e.response.data.error);
      });
  };

  return (
    <div>
      {postdata.author_id === user._id && (
        <Container>
          <Row className='justify-content-center justify-content-md-end'>
            <Col md={2} lg={2}>
              <Button
                as={Link}
                to={`${location.pathname}/edit`}
                id='edit-question-button'
                className='w-100 mt-2'
                variant='primary'
              >
                Edit
              </Button>
            </Col>
            <Col md={2} lg={2}>
              <Button
                onClick={deleteQuestion}
                id='delete-question-button'
                className='w-100 mt-2'
                variant='primary'
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      )}
      <Container className='py-5' style={{ maxWidth: 960 }}>
        <h1 className='mb-4 pb-4 border-bottom'>{postdata.title}</h1>
        <p>{postdata.description}</p>
        <Comments />
      </Container>
    </div>
  );
}
