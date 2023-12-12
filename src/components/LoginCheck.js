import { useNavigate } from "react-router";
import ApiAdress from "../constants/ApiAddress";
import { useState } from 'react';

function useLoginCheck(nextPath) {

  `sessionId=${res.data.sessionId};max-age=1800;domain=post-react.onrender.com;path=/`;
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const checkLogin = () => {
    let sessionId;
    if(document.cookie) {
      sessionId = getSessionIdInLocal();
    }
    fetch(`${ApiAdress.LOCAL_MEMBER}/valid-login`, {
      sessionId
    },{
      credentials: "include",
      mode: "cors",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success !== undefined) {
          console.log(data);
          navigate("/login", { state: { nextPath, hello: "nice" } });
          throw new Error(data.message);
        }else{
          setIsChecked(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsChecked(false);
      });
  }
  function getSessionIdInLocal(){
    return document.cookie.split('=')[1];
  }




  return {checkLogin, isChecked};
}

export default useLoginCheck;
