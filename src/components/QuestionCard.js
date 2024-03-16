import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsCardText, BsChat, BsQuestionSquare } from 'react-icons/bs';

import './QuestionCard.css';

export function QuestionCard({
  title,
  description,
  link,
  is_question: isQuestion,
  comments,
  ...props
}) {
  return (
    <Card className='question-card'>
      <Link className='question-card-link' to={link} title={title} />
      <Card.Body className='d-flex align-items-start'>
        {isQuestion && (
          <BsQuestionSquare className='question-card-icon me-4 text-danger' />
        )}
        {!isQuestion && (
          <BsCardText className='question-card-icon me-4 text-secondary' />
        )}

        <div className='question-card-body'>
          <Card.Title className='question-card-title'>{title}</Card.Title>
          <Card.Text className='question-card-description'>
            {description}
          </Card.Text>
          <div className='d-flex align-items-center mt-2'>
            <BsChat className='me-2' /> {comments.length} Responses
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
