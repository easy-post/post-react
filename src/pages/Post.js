import React, { useEffect, useState } from "react";
import "../scss/Post.scss";
import axios from "axios";
import ApiAdress from "./../constants/ApiAddress";
import { useLocation, useParams } from "react-router";
import Loading from '../components/Loading';

const Post = () => {
  const [isLoadPage, setIsLoadPage] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {postId} = useParams();
  useEffect(() => {
    axios
      .get(`${ApiAdress.LOCAL_POST}/${postId}`)
      .then((res) => {
        if (res.status !== 200) throw new Error(res.data.message);
        setTitle(res.data.title);
        setContent(res.data.html);
        setIsLoadPage(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <div className="Post">
      {isLoadPage ? (
        <div className="contentWrap">
          <p className="title">{title}</p>
          <div className="content" dangerouslySetInnerHTML={{__html:content}}></div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Post;
