import { useContext } from 'react';
import AppContext from '../AppContext.js';
import CommentForm from './CommentForm.js';
import { useState } from 'react';

const Comment = ({
  comment,
  replies,
  setCurrentComment,
  currentComment,
  updateComment,
  deleteComment,
  addComment,
  parentID = null
}) => {
  const { user } = useContext(AppContext);
  const isEditing =
    currentComment &&
    currentComment._id === comment._id &&
    currentComment.type === 'editing';

  const isReplying =
    currentComment &&
    currentComment._id === comment._id &&
    currentComment.type === 'replying';

  const fiveMins = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMins;
  const canDelete =
    user._id === comment.userID && replies.length === 0 && !timePassed;
  const canReply = Boolean(user._id);
  //console.log(canReply);
  const canEdit = user._id === comment.userID && !timePassed;
  const replyId = parentID ? parentID : comment._id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  return (
    <div key={comment._id} className='comment'>
      <div className='comment-image-container'>
        <img src='/icons/generic-user-icon.png' width='18' height='18' />
      </div>
      <div className='comment-right-part'>
        <div className='comment-content'>
          <div className='comment-author'>{comment.userName}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && (
          <div className='comment-text'>{comment.commentDesc}</div>
        )}
        {isEditing && (
          <CommentForm
            submitLabel='Update'
            hasCancelButton
            initialText={comment.commentDesc}
            handleSubmit={(text) => updateComment(text, comment._id)}
            handleCancel={() => {
              setCurrentComment(null);
            }}
          />
        )}
        <div className='comment-actions'>
          {canReply && (
            <div
              className='comment-action'
              onClick={() =>
                setCurrentComment({ _id: comment._id, type: 'replying' })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className='comment-action'
              onClick={() =>
                setCurrentComment({ _id: comment._id, type: 'editing' })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className='comment-action'
              onClick={() => deleteComment(comment._id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel='Reply'
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className='replies'>
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply._id}
                setCurrentComment={setCurrentComment}
                currentComment={currentComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment._id}
                replies={[]}
                currentUserId={user._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
