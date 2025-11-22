import React from "react";
import { RotatingLines } from "react-loader-spinner";

function Loading() {
  return (
    <div>
      <RotatingLines
        width="100px"
        height="100px"
        strokeWidth="3"
        strokeColor="#fe5d42"
      />
    </div>
  );
}

export default Loading;
