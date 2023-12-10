import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import ApiAdress from '../constants/ApiAddress';
import '../scss/LogoutBtn.scss';
const LogoutBtn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onLogout = ()=>{
    fetch(`${ApiAdress.LOCAL_MEMBER}/logout`, {
        method: "GET",
        credentials: 'include'
      })
      .then((res)=>{
        navigate(location.pathname);
      })
  }
  return (
    <button onClick={onLogout} className="LogoutBtn">로그아웃</button>
  )
}

export default LogoutBtn