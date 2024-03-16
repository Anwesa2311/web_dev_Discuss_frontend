import { useContext, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NotificationManager } from 'react-notifications';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppContext from '../AppContext';
import QuestionsDataService from '../services/QuestionsDataService';

const NewPost = ({ editMode = false }) => {
  const { user } = useContext(AppContext);
  const { classroomId } = useParams();
  let { questionId } = useParams();
  const navigate = useNavigate();

  const formRef = useRef(null);

  useEffect(() => {
    if (editMode) {
      QuestionsDataService.getQuestionById(questionId)
        .then((res) => {
          console.log(res.data);
          console.log(formRef);
          formRef.current['title'].value = res.data['title'];
          formRef.current['description'].value = res.data['description'];
          formRef.current['is_question'].checked = res.data['is_question'];
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const formDataObj = Object.fromEntries(formData.entries());

    if (editMode) {
      QuestionsDataService.editQuestionById(questionId, {
        classroomId,
        ...formDataObj,
        is_question: formDataObj.is_question === 'on',
        userId: user._id
      })
        .then((res) => {
          NotificationManager.success('Question edited!');
          navigate(`/classroom/${classroomId}/question/${questionId}`);
        })
        .catch((e) => {
          NotificationManager.error(e.response.data.error);
        });
    } else {
      QuestionsDataService.postQuestions({
        classroomId,
        ...formDataObj,
        isQuestion: formDataObj.is_question === 'on',
        userId: user._id
      })
        .then((res) => {
          NotificationManager.success('Question created!');
          navigate(`/classroom/${classroomId}/question/${res.data.insertedId}`);
        })
        .catch((e) => {
          NotificationManager.error(e.response.data.error);
        });
    }
  };

  return (
    <Container className='py-4' style={{ maxWidth: 520 }}>
      <h2 className='text-center'>
        {!editMode && 'New'}
        {editMode && 'Edit'} Question
      </h2>
      <Form ref={formRef}>
        <Form.Group className='mb-3'>
          <Form.Label>Question Title</Form.Label>
          <Form.Control name='title' type='text' placeholder='Question Title' />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Question Description</Form.Label>
          <Form.Control
            as='textarea'
            rows='5'
            placeholder='Question Description'
            name='description'
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Check
            name='is_question'
            type='checkbox'
            label='Mark as a question'
          />
        </Form.Group>
        <Form.Group className='mb-5'>
          <Button variant='primary' type='button' onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Group>
      </Form>
      <p>
        <Link to={`/classroom/${classroomId}`}>Go back</Link> to all posts.
      </p>
    </Container>
  );
};

export default NewPost;
