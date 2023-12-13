import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/PostListElement.scss';

const PostListElement = ({post, midnight}) => {
  const date = new Date(post.createdTime);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  const getDisplayDate = ()=>{
    if(date > midnight){
      return date.toLocaleDateString();
    }else{
      return date.toLocaleTimeString();
    }
  }

  return (
    <li>
      <span className="postId">{post.id}</span>
      <Link className="title" to={`/post/${post.id}`}>{post.title}</Link>
      <span className='date'>{getDisplayDate()}</span>
      <span className='author'>{post.nickname}</span>
    </li>
  )
}

export default React.memo(PostListElement);