import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Posts from '../pages/Posts'
import NewPost from '../pages/NewPost'
import Login from '../pages/Login'
import Post from '../pages/Post';

const Main = () => {
  return (
    <main className='Main'>
      <div className="inner">
        <Routes>
          <Route path='/' element={<Posts/>}></Route>
          <Route path='/posts' element={<Posts/>}></Route>
          <Route path='/new' element={<NewPost/>}></Route>
          <Route path='/user/:id/posts' element={<Posts/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/post/:postId' element={<Post/>}></Route>
        </Routes>
      </div>
    </main>
  )
}

export default Main