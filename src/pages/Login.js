import React, { useRef, useState } from "react";
import ApiAdress from "../constants/ApiAddress";
import "../scss/Login.css";
import useLoginCheck from "../components/LoginCheck";
import { useLocation, useNavigate } from "react-router";
import axios from 'axios';

const Login = () => {
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const $registerForm = useRef();
  const $emptyMsg = useRef();
  const $faildRegister = useRef();
  const $registerModal = useRef();
  const $nicknameValidSuccessMsg = useRef();
  const $nicknameValidFailedMsg = useRef();
  const $faildLoginMsg = useRef();

  const location = useLocation();
  const navigate = useNavigate();

  useLoginCheck();

  const handlerNicknameKeydown = (e) => {
    initNicknameValid();
  };

  const registerClose = (e) => {
    e.preventDefault();
    $registerModal.current.style.display = "none";
  };

  const registerOpen = (e) => {
    e.preventDefault();
    $registerModal.current.style.display = "block";
  };

  const nicknameDuplicateValid = (e) => {
    e.preventDefault();
    if (!emptyValid($registerForm.current.nickname.value)) return;
    console.log($registerForm.current.nickname.value);
    fetch(
      `${ApiAdress.LOCAL_MEMBER}/valid/nickname/${$registerForm.current.nickname.value}`
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsNicknameValid(data);
        if (data) {
          $nicknameValidFailedMsg.current.style.display = "none";
          $nicknameValidSuccessMsg.current.style.display = "block";
        } else {
          $nicknameValidFailedMsg.current.style.display = "block";
          $nicknameValidSuccessMsg.current.style.display = "none";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registy = (e) => {
    e.preventDefault();
    if (!registerAllValid()) {
    }

    if (!isNicknameValid) {
      console.log("닉네임 인증을 해 주세요.");
      return;
    }
    fetch(`${ApiAdress.LOCAL_MEMBER}/register`, {
      method: "POST",
      body: JSON.stringify({
        loginId: e.target.loginId.value,
        password: e.target.password.value,
        nickname: e.target.nickname.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          initNicknameValid();
          $registerForm.current.loginId.value = "";
          $registerForm.current.password.value = "";
          $registerForm.current.nickname.value = "";
          $faildRegister.current.style.display = "none";
          $registerModal.current.querySelector(
            ".success.register--message"
          ).style.display = "block";
        }
        return res.json();

        // 리다이렉트는 프론트엔드 서버에서 처리
      })
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        $faildRegister.current.textContent = err.message;
        $faildRegister.current.style.display = "block";
        console.log(err);
      });
  };

  const login = (e) => {
    e.preventDefault();
    if (
      !(
        emptyValid(e.target.loginId.value) &&
        emptyValid(e.target.password.value)
      )
    ) {
      $emptyMsg.current.style.display = "block";
    }

    axios
      .post(
        `${ApiAdress.LOCAL_MEMBER}/login`,
        {
          loginId: e.target.loginId.value,
          password: e.target.password.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (!res.status == 200) throw new Error(res.data.message);

        console.log("로그인 성공");
        console.log(res.data);
        document.cookie = `sessionId=${res.data.sessionId}; max-age=1800; domain=${ApiAdress.LOCAL};path=/`;
        if (location.state === null) navigate("/");
        navigate(
          location.state.nextPath !== undefined
            ? location.state.nextPath
            : "/"
        );
      })
      .then((data) => {
        if (data === undefined) {

        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        $faildLoginMsg.current.textContent = err.message;
        $faildLoginMsg.current.style.display = "block";
      });
  };

  function emptyValid(str) {
    if (str.includes(" ")) return false;
    return str.length > 0;
  }

  function registerAllValid() {
    if (!emptyValid($registerForm.current.loginId.value)) return false;
    if (!emptyValid($registerForm.current.password.value)) return false;
    if (!emptyValid($registerForm.current.nickname.value)) return false;
    return true;
  }

  function initNicknameValid() {
    setIsNicknameValid(false);
    $nicknameValidSuccessMsg.current.style.display = "none";
  }

  return (
    <div className="Login">
      <div className="inner">
        <h1>
          <img
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt="logo"
          ></img>
        </h1>
        <form className="login--form" method="post" onSubmit={login}>
          <p className="failed empty" ref={$emptyMsg}>
            모두 입력해 주세요.
          </p>
          <input
            type="text"
            name="loginId"
            placeholder="아이디"
            maxLength="16"
          ></input>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            autoComplete="on"
            maxLength="32"
          ></input>
          <input type="submit" value="로그인"></input>
          <button onClick={registerOpen}>회원가입</button>
        </form>
        <p className="failed login--message" ref={$faildLoginMsg}></p>
      </div>

      <div id="register--modal" ref={$registerModal}>
        <div className="inner">
          <form
            className="register--form"
            method="post"
            ref={$registerForm}
            onSubmit={registy}
          >
            <input
              type="text"
              name="loginId"
              placeholder="아이디"
              maxLength="16"
            ></input>
            <div className="register--nickname--wrap">
              <input
                onKeyDown={handlerNicknameKeydown}
                type="text"
                name="nickname"
                id="nickname"
                placeholder="닉네임"
                maxLength="16"
              ></input>
              <button onClick={nicknameDuplicateValid}>중복 확인</button>
            </div>

            <p
              className="success nickname--message"
              ref={$nicknameValidSuccessMsg}
            >
              사용 가능한 닉네임 입니다!
            </p>
            <p
              className="failed nickname--message"
              ref={$nicknameValidFailedMsg}
            >
              중복된 닉네임 입니다.
            </p>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              autoComplete="on"
              maxLength="32"
            ></input>
            <input type="submit" value="회원가입"></input>
          </form>
          <button className="close" onClick={registerClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
          <p className="success register--message">가입 완료.</p>
          <p className="failed register--message" ref={$faildRegister}></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
