import { useNavigate } from "react-router";
import ApiAdress from "../constants/ApiAddress";
import { useState } from 'react';

function useLoginCheck(nextPath) {

  
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const checkLogin = () => {
    fetch(`${ApiAdress.LOCAL_MEMBER}/valid-login`, {
      credentials: 'include'
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success !== undefined) {
          console.log(data);
          navigate("/login", { state: { nextPath} });
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





  return {checkLogin, isChecked};
}

export default useLoginCheck;
