import { useState, useEffect, useCallback, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentForm from './CommentForm.js';
import Comment from './Comment.js';
/*import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";*/
import CommentsDataService from '../services/CommentsDataService';
import AppContext from '../AppContext';

const Comments = () => {
  const { user } = useContext(AppContext);
  const { questionId, classroomId } = useParams();
  const [postComments, setPostComments] = useState([]);
  const [currentComment, setCurrentComment] = useState(null);
  const [commentID, setCommentID] = useState(null);
  const navigate = useNavigate();

  const fetchComments = useCallback(() => {
    CommentsDataService.getCommentsById(questionId)
      .then((res) => {
        setPostComments(res.data);
      })
      .catch(console.error);
  }, [questionId, setPostComments]);

  /*
const Comments = ({ questionId, currentUserId }) => {
  const [postComments, setPostComments] = useState([]);
  const [currentComment, setCurrentComment] = useState(null);
  const parentComments = postComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  */

  const getReplies = (commentID) =>
    postComments
      .filter((postComment) => postComment.parentID === commentID)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (text, parentId) => {
    var data = {
      commentDesc: text,
      questionId: questionId,
      parentID: parentId || null,
      userID: user._id,
      userName: user.name,
      createdAt: new Date().toISOString()
    };
    CommentsDataService.postComments(data)
      .then((response) => {
        setPostComments([
          ...postComments,
          { ...data, _id: response.data.insertedId }
        ]);
      })
      .catch((e) => {
        console.log(e);
      });
    setCurrentComment(null);
  };

  const updateComment = (text, commentId) => {
    var data = {
      _id: commentId,
      text: text
    };
    CommentsDataService.updateComment(data).then(() => {
      const updatedPostComments = postComments.map((updatedComment) => {
        if (updatedComment._id === commentId) {
          return { ...updatedComment, commentDesc: text };
        }
        return updatedComment;
      });
      setPostComments(updatedPostComments);
      setCurrentComment(null);
    });
  };

  const deleteComment = (commentId) => {
    var data = {
      _id: commentId,
      user_id: user._id
    };
    if (window.confirm("Are you sure you want to remove ?")) {
      CommentsDataService.deleteComment(data).then(() => {
        const updatedComments = postComments.filter(
          (postComment) => postComment._id !== commentId
        );
        setPostComments(updatedComments);
      });
    }
  };
  

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className='comments'>
      <div className='comment-form-title'>Respond to this post -</div>
      <CommentForm submitLabel='Add comment' handleSubmit={addComment} />
      <div className='comments-container'>
        {postComments
          .filter((parentComment) => !parentComment.parentID)
          .map((parentComment) => (
            <Comment
              key={parentComment._id}
              comment={parentComment}
              replies={getReplies(parentComment._id)}
              currentComment={currentComment}
              setCurrentComment={setCurrentComment}
              addComment={addComment}
              deleteComment={deleteComment}
              updateComment={updateComment}
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;
