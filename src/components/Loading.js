import React from "react";
import '../scss/Loading.scss';

const Loading = () => {
  const EXPORT_HOST = "https://post-react.onrender.com";
  return (
    <div className="loading--wrap">
      <div className="loading--circle">
        <img src={EXPORT_HOST + '/images/utility/loading.png'} alt="" />
      </div>
    </div>
  );
};

export default Loading;
