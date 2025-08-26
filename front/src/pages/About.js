import React, { useContext } from "react";
import Motion from "../components/motion";
import { darkTheme, lightTheme, UserContext } from "../App";
import { Image, Typography } from "antd";

const { Title, Paragraph } = Typography;

const img =
  "https://images.unsplash.com/photo-1620932934088-fbdb2920e484?w=900";

function About() {
  const { isMobile, darkMode } = useContext(UserContext);

  return (
    <Motion>
      <Title
        style={{
          color: darkMode ? darkTheme.color : lightTheme.color,
          fontFamily: "Raleway",
          fontSize: "5rem",
          textAlign: "center",
          margin: 0,
        }}
      >
        About Me
      </Title>
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: 10,
          margin: 20,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <div
          style={{
            width: isMobile ? "100%" : "60%",
            padding: "0px 10px",
          }}
        >
          <Image
            src={img}
            alt="img"
            preview={false}
            style={{
              borderRadius: 2,
              filter: "grayscale(100%)",
              transition: "filter 0.3s ease",
            }}
          />
        </div>
        <div
          style={{
            width: isMobile ? "100%" : "40%",
            alignContent: "center",
          }}
        >
          <Paragraph
            style={{
              color: darkMode ? darkTheme.color : lightTheme.color,
              fontSize: "1.6rem",
              padding: isMobile ? "0px 0px" : "0px 25px",
              textAlign: "justify",
            }}
          >
            Pharetra magna ac placerat vestibulum lectus mauris ultrices. Ut
            pharetra sit amet aliquam id diam maecenas ultricies mi.
            Sollicitudin ac orci phasellus egestas tellus rutrum. Venenatis cras
            sed felis eget. Amet risus nullam eget felis eget nunc. Lacus
            vestibulum sed arcu non odio euismod. Consectetur adipiscing elit
            duis tristique.
          </Paragraph>
        </div>
      </div>
    </Motion>
  );
}

export default About;
