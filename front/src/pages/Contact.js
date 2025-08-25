import React, { useContext } from "react";
import Motion from "../components/motion";
import { darkTheme, lightTheme, UserContext } from "../App";

function Contact() {
  const { darkMode } = useContext(UserContext);
  return (
    <Motion>
      <div style={{ color: darkMode ? darkTheme.color : lightTheme.color }}>
        Contact
      </div>
    </Motion>
  );
}

export default Contact;
