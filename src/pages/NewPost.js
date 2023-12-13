import React, { useEffect, useRef, useState } from "react";
import "../scss/NewPost.scss";
import axios from "axios";
import useLoginCheck from "../components/LoginCheck";
import { useLocation, useNavigate } from "react-router";
import Loading from "../components/Loading";
import ApiAdress from "../constants/ApiAddress";
import CoverScreenLoading from "../components/CoverScreenLoading";

const NewPost = () => {
  const EXPORT_HOST = "https://post-react.onrender.com";
  const IMAGE_SERVER = "https://image-server-n6n6.onrender.com";
  const location = useLocation();
  const $content = useRef();
  const { checkLogin, isChecked } = useLoginCheck(location.pathname);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    checkLogin("/post/new");
  }, [checkLogin]);

  const savePost = (e) => {
    e.preventDefault();
    setIsSaving(true);

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
        setIsSaving(false);
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

  return (
    <div className="NewPost">
      <CoverScreenLoading style={{display:isSaving?'flex':'none'}}>
        <p>저장 중...</p>
      </CoverScreenLoading>
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
