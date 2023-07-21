import React from 'react';
import './style.scss';

function PostHeader({ post }) {
  return (
    <header className="post-header">
      {post.emoji && <div className="emoji">{post.emoji}</div>}
      <div className="info">
        <div className="categories">{post?.categories}</div>
      </div>

      <h1 className="title">{post.title}</h1>
      <div className="info">
        <div className="author">
          posted by <strong>{post.author}</strong>,
        </div>{' '}
        {post.date}
      </div>
    </header>
  );
}
export default PostHeader;
