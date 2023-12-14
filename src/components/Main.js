import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Posts from '../pages/Posts'
import NewPost from '../pages/NewPost'
import Login from '../pages/Login'
import Post from '../pages/Post';
import DefaultErrorPage from './error/DefaultErrorPage'

const Main = () => {
  return (
    <main className='Main'>
      <div className="inner">
        <Routes>
          <Route path='/post/new' element={<NewPost/>}></Route>
          <Route path='/post/:postId/edit' element={<NewPost/>}></Route>
          <Route path='/post/:postId' element={<Post/>}></Route>
          <Route path='/post/member' element={<Posts/>}></Route>
          <Route path='/post' element={<Posts/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/error' element={<DefaultErrorPage/>}></Route>
          <Route path='/' element={<Posts/>}></Route>
        </Routes>
      </div>
    </main>
  )
}

export default Main