import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import { NotificationManager } from 'react-notifications';

import QuestionsDataService from '../services/QuestionsDataService';

import './ClassroomPage.css';

export default function ClassroomPage() {
  const location = useLocation();
  const { classroomId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search bar state
  const searchRef = useRef(null);

  const fetchQuestions = useCallback(() => {
    QuestionsDataService.getQuestions({
      classroomId,
      search: searchRef.current.value
    })
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((e) => {
        NotificationManager.error('Error in getting questions.');
        console.error(e);
      });
  }, [classroomId, searchRef, setLoading, setQuestions]);

  const filterQuestions = useCallback(() => {
    setLoading(true);
    fetchQuestions();
  }, [setLoading, fetchQuestions]);

  const renderQuestions = useCallback(() => {
    return questions.map((q) => {
      const link = `${location.pathname}/question/${q._id}`;
      return <QuestionCard key={q._id} {...q} link={link} />;
    });
  }, [questions, location]);

  const renderNoQuestionsFound = useCallback(() => {
    return (
      <div className='classroom-no-questions text-center py-5'>
        <h3>No Questions Found!</h3>
        <p>
          Click on <b>New +</b> button to ask a new question.
        </p>
      </div>
    );
  }, []);

  const handleEnterKeyPress = useCallback((e) => {
    if (e.keyCode !== 13) {
      return;
    }

    filterQuestions();
  }, []);

  const renderSearchBar = useCallback(() => {
    return (
      <div className='classroom-searchbar mb-3 py-3 sticky-top'>
        <Container>
          <Row className='justify-content-between'>
            <Col xs={12} md={6} lg={4}>
              <InputGroup className='mb-3 mb-md-0'>
                <Form.Control
                  ref={searchRef}
                  placeholder='Search for Question title or description'
                  aria-label='Search for Question title or description'
                  aria-describedby='classroom-search-button'
                  onKeyUp={handleEnterKeyPress}
                />

                <Button
                  id='classroom-search-button'
                  variant='primary'
                  onClick={filterQuestions}
                >
                  Search
                </Button>
              </InputGroup>
            </Col>
            <Col
              className='d-flex justify-content-center justify-content-md-end'
              md={2}
              lg={2}
            >
              <Button
                as={Link}
                to={`${location.pathname}/question/new`}
                id='classroom-new-question-button'
                className='w-100'
                variant='primary'
              >
                New +
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }, [filterQuestions, location]);

  /**
   * Load all questions for the first
   * render.
   */
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className='classroom-wrap'>
      {renderSearchBar()}
      <div className='classroom-body'>
        <Container>
          {loading && (
            <h5 className='text-center py-5 classroom-loading'>Loading...</h5>
          )}
          {!loading &&
            !questions.length &&
            !loading &&
            renderNoQuestionsFound()}
          {!loading && questions.length > 0 && renderQuestions()}
        </Container>
      </div>
    </div>
  );
}
