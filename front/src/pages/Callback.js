import React from "react";
import { useParams } from "react-router-dom";

function Callback() {
  const { code } = useParams();

  console.log(code);
  return <div>Redirecting you to home</div>;
}

export default Callback;
