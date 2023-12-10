import React, { useEffect, useRef } from "react";
import "../scss/NewPost.scss";
import axios from "axios";
import useLoginCheck from "../components/LoginCheck";
import { useLocation, useNavigate } from "react-router";
import Loading from "../components/Loading";
import ApiAdress from "../constants/ApiAddress";
// import ApiAdress from '../constants/ApiAddress';
// import ApiAdress from './ApiAddress';
// import { useNavigate } from 'react-router';

const NewPost = () => {
  const IMAGE_SERVER = "https://image-server-n6n6.onrender.com";
  const location = useLocation();
  const $content = useRef();
  const { checkLogin, isChecked } = useLoginCheck(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  const savePost = (e) => {
    e.preventDefault();

    axios
      .post(
        `${ApiAdress.LOCAL_POST}/save`,
        {
          title: e.target.title.value,
          html: $content.current.innerHTML,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.data);
        } else {
          navigate(`/post/${res.data.id}`);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onPasteHandler = (e) => {
    const clipboardData = e.clipboardData;
    const file = clipboardData.files[0];

    if (file !== undefined) {
      e.preventDefault();
      const type = file.type.split("/");

      if (type[0] === "image") {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = (e) => {
          axios
            .post(
              `${IMAGE_SERVER}/save`,
              {
                type: type[1],
                file: e.target.result,
              },
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              const $img = document.createElement("img");
              console.log(res.data);

              $img.setAttribute("src", res.data);
              $img.setAttribute("alt", "content image");

              const selection = window.getSelection();
              const range = selection.getRangeAt(0);
              range.deleteContents();
              range.insertNode($img);

              const newRange = document.createRange();
              newRange.setStartAfter($img);
              newRange.collapse(true);
              selection.removeAllRanges();
              selection.addRange(newRange);
            })
            .catch((err) => {
              console.log(err);
            });
        };
      }
    }
  };

  return (
    <div className="NewPost">
      {isChecked ? (
        <form onSubmit={savePost}>
          <input type="text" name="title" id="title" placeholder="제목" />
          <div
            className="content"
            contentEditable="true"
            onPaste={onPasteHandler}
            ref={$content}
          ></div>

          <button type="submit">저장</button>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default NewPost;
