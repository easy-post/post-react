import React from "react";
import { Link } from "react-router-dom";
import "../scss/Header.scss";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
  return (
    <header className="Header">
      <div className="inner">
        <LogoutBtn></LogoutBtn>

        <div className="logo-wrap">
          <h1 className="logo">
            <Link to={"/"}>
              <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" ></img>
            </Link>
          </h1>
        </div>

        <div className="menu-wrap">
          <ul className="menu">
            <li><Link to={"/post"}>글 목록</Link></li>
            <li><Link to={"/post/new"}>새 글</Link></li>
            <li><Link to={"/post/member"}>내 글</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
