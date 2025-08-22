import { Spin } from "antd";
import React from "react";

function Loader({ text, size }) {
  return <Spin fullscreen tip={text} size={size} />;
}

export default Loader;
