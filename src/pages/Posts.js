import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import PostListElement from "../components/PostListElement";
import "../scss/Posts.scss";
import ApiAdress from "../constants/ApiAddress";
import { useLocation } from "react-router";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();
  const location = useLocation();
  axios.defaults.withCredentials = true;

  useEffect(() => {
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
            setPosts(res.data.content);
            setIsLoading(false);
          });
        break;

      default:
        axios.get(`${ApiAdress.LOCAL_POST}`).then((res) => {
          setPosts(res.data.content);
          setIsLoading(false);
        });
        break;
    }
  }, []);


  const search = (e)=>{
    setIsLoading(true);
    axios.get(`${ApiAdress.LOCAL_POST}?title=${e.target.title}&nickname=${e.target.nickname}`)
    .then((res) => {
      setPosts(res.data.content);
      setIsLoading(false);
    });
  }

  return (
    <div className="Posts">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="post--wrap">
          <form onSubmit={search}>
            <label htmlFor="search_title">글 제목 :</label>
            <input type="text" name="title" id="search_title" />

            <label htmlFor="search_title">닉네임</label>
            <input type="text" name="nickname" id="search_nickname" />

            <button type="submit">검색</button>
          </form>
          <ul className="post--list">
            {posts.map((post) => {
              return (
                <PostListElement post={post} key={post.id} today={today} />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Posts;
