import React from "react";
import LoadingGif from "../Componenets/Images/giphy.gif";

export default function Loading() {
  return (
    <div className="loadingGif">
      <img src={LoadingGif} alt="loading" />
    </div>
  );
}
