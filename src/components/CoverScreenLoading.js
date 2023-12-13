import React from "react";
import '../scss/CoverScreenLoading.scss';

const CoverScreenLoading = ({children}) => {
  const EXPORT_HOST = "https://post-react.onrender.com";
  return (
    <div className="cover--loading--wrap">
      <div className="cover--loading--circle">
        <img src={EXPORT_HOST + '/images/utility/loading.png'} alt="" />
      </div>
      {children}
    </div>
  );
};

export default CoverScreenLoading;
