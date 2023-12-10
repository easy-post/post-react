import React from "react";
import '../scss/Loading.scss';

const Loading = () => {
  return (
    <div className="loading--wrap">
      <div className="loading--circle">
        <img src={process.env.PUBLIC_URL + 'images/utility/loading.png'} alt="" />
      </div>
    </div>
  );
};

export default Loading;
