import React, { useEffect, useRef, useState } from "react";
import "../scss/NewPost.scss";
import axios from "axios";
import useLoginCheck from "../components/LoginCheck";
import { useLocation, useNavigate } from "react-router";
import Loading from "../components/Loading";
import ApiAdress from "../constants/ApiAddress";

const EXPORT_HOST = "https://post-react.onrender.com";
const IMAGE_SERVER = "https://image-server-n6n6.onrender.com";

const onPasteHandler = (e) => {
  const clipboardData = e.clipboardData;
  const file = clipboardData.files[0];

  if (file !== undefined) {
    e.preventDefault();
    const type = file.type.split("/");

    if (type[0] === "image") {
      const $imgWrap = document.createElement("div");
      $imgWrap.classList.add("img--wrap");

      const $loading = document.createElement("img");
      $loading.setAttribute(
        "src",
        `${EXPORT_HOST + "/images/utility/loading.png"}`
      );
      $loading.setAttribute("alt", "loading image");
      $loading.classList.add("loading--img");
      $imgWrap.appendChild($loading);

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode($imgWrap);
      const $emptyP = document.createElement("p");

      $imgWrap.insertAdjacentElement("afterend", $emptyP);

      const newRange = document.createRange();
      newRange.setStartAfter($emptyP, 0);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);

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
            if (!(res.status == 200)) throw new Error(res.data);
            const $img = document.createElement("img");
            $img.setAttribute("src", res.data);
            $img.setAttribute("alt", "post picture");

            $imgWrap.removeChild($loading);
            $imgWrap.appendChild($img);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    }
  }
};

const NewPost = () => {
  const location = useLocation();
  const $content = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const { checkLogin, isChecked, setIsChecked } = useLoginCheck(location.pathname);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // useState로 바꾸기

  useEffect(() => {
    console.log(location.pathname);
    switch (location.pathname) {
      case "/post/new":
        checkLogin("/post/new");
        break;

      default:
        setIsChecked(true);
        axios
          .get(`${ApiAdress.LOCAL}${location.pathname}`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (!res.status === 200) throw new Error(res.data.message);

            setIsEdit(true);
            console.log(res.data);
            setTitle(res.data.title);
            setContent(res.data.html);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
    }
  }, [checkLogin]);

  const savePost = (e) => {
    e.preventDefault();

    switch (location.pathname) {
      case "/post/new":
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
        break;

      default:
        axios
          .post(
            `${ApiAdress.LOCAL}${location.pathname}`,
            {
              title: e.target.title.value,
              html: $content.current.innerHTML,
            },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            console.log(res);
            if (!res.status === 200) throw new Error(res.data.message);

            navigate(`/post/${res.data.id}`);
          })
          .catch((err) => {
            console.log(err.message);
          });

        break;
    }
  }
  const handleTitleChange = (e)=>{
    setTitle(e.target.value);
  }

  return (
    <div className="NewPost">
      {isChecked ? (
        <form onSubmit={savePost}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="제목"
            value={title}
            onChange={handleTitleChange}
          />
          <div
            className="content"
            contentEditable="true"
            onPaste={onPasteHandler}
            ref={$content}
            dangerouslySetInnerHTML={isEdit ? { __html: content } : { __html: "" }}
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
