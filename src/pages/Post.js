import React, { useEffect, useState } from "react";
import "../scss/Post.scss";
import axios from "axios";
import ApiAdress from "./../constants/ApiAddress";
import { useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";

const Post = () => {
  const [isLoadPage, setIsLoadPage] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();
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

  const edit = (e)=>{
    navigate(`${location.pathname}/edit`);
  }

  return (
    <div className="Post">
      {isLoadPage ? (
        <div className="contentWrap">
          <button onClick={edit}>수정</button>
          <p className="title">{title}</p>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Post;
