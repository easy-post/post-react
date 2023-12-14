import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import PostListElement from "../components/PostListElement";
import "../scss/Posts.scss";
import ApiAdress from "../constants/ApiAddress";
import { Navigate, useLocation } from "react-router";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();
  const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate(),0,0,0,0);
  const location = useLocation();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    setIsLoading(true);
    switch (location.pathname) {
      case "/post":
        axios.get(`${ApiAdress.LOCAL_POST}`).then((res) => {
          setPosts(res.data.content);
          setIsLoading(false);
        });
        break;

      case "/post/member":
        axios
          .get(`${ApiAdress.LOCAL_POST}/member`, { withCredentials: true })
          .then((res) => {
            if(!(res.status === 200)) throw new Error("로그인 한 상태가 아닙니다.");
            setPosts(res.data.content);
            setIsLoading(false);
          })
          .catch((err)=>{
            Navigate("/login");
          });
        break;

      default:
        axios.get(`${ApiAdress.LOCAL_POST}`).then((res) => {
          
          setPosts(res.data.content);
          setIsLoading(false);
        });
        break;
    }
  }, [location.pathname]);

  const search = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    axios
      .get(
        `${ApiAdress.LOCAL_POST}?title=${e.target.title.value}&nickname=${e.target.nickname.value}`
      )
      .then((res) => {
        setPosts(res.data.content);
        setIsLoading(false);
      });
  };

  return (
    <div className="Posts">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="post--wrap">
          <form onSubmit={search}>
            <div className="search--input--wrap">
              <label htmlFor="search_title">글 제목 :</label>
              <input type="text" name="title" id="search_title" />

              <label htmlFor="search_title">닉네임</label>
              <input type="text" name="nickname" id="search_nickname" />
            </div>
            <button type="submit">검색</button>
          </form>
          <ul className="post--list">
            {posts.map((post) => {
              return (
                <PostListElement post={post} key={post.id} midnight={midnight} />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Posts;
