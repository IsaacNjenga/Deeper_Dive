import React, { useContext } from "react";
import Motion from "../components/motion";
import { darkTheme, lightTheme, UserContext } from "../App";

function Guests() {
  const { darkMode } = useContext(UserContext);
  return (
    <Motion>
      <div style={{ color: darkMode ? darkTheme.color : lightTheme.color }}>
        Guests
      </div>
    </Motion>
  );
}

export default Guests;
