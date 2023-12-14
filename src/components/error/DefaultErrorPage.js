import React from "react";
import { useLocation } from "react-router";
import '../../scss/DefaultErrorPage.scss';

const DefaultErrorPage = () => {
  const location = useLocation();
  return (
    <div className="DefaultErrorPage">
      <h3>에러</h3>
      {location.state.errMsg
        ? location.state.errMsg : "유효하지 않는 접근입니다."}
    </div>
  );
};

export default DefaultErrorPage;
