import React, { useContext } from "react";
import Motion from "../components/motion";
import { darkTheme, lightTheme, UserContext } from "../App";

function About() {
  const { darkMode } = useContext(UserContext);
  return (
    <Motion>
      <div style={{ color: darkMode ? darkTheme.color : lightTheme.color }}>
        About
      </div>
    </Motion>
  );
}

export default About;
