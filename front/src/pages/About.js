import React, { useContext } from "react";
import Motion from "../components/motion";
import { darkTheme, lightTheme, UserContext } from "../App";
import { Carousel, Image, Typography } from "antd";
import "../assets/css/about.css";
import Img1 from "../assets/images/image0.jpeg";
import Img2 from "../assets/images/image2.jpeg";
import Img3 from "../assets/images/image3.jpeg";
import Img4 from "../assets/images/image4.jpeg";
import Img5 from "../assets/images/image5.jpeg";

const { Title, Paragraph } = Typography;

// const img =
//   "https://images.unsplash.com/photo-1620932934088-fbdb2920e484?w=900";
// const img2 =
//   "https://images.unsplash.com/photo-1531558297330-791932f4f398?w=900";
// const img3 =
//   "https://images.unsplash.com/photo-1648522168784-067e98df88c0?w=900";
// const img4 =
//   "https://images.unsplash.com/photo-1660832458429-526d0601054f?q=80&w=900";

const images = [Img1, Img2, Img3, Img4, Img5];
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
            width: isMobile ? "100%" : "55%",
            padding: "0px 10px",
          }}
        >
          <Carousel dots={false} autoplay autoplaySpeed={3500} fade>
            {images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt="img"
                preview={false}
                style={{
                  borderRadius: 12,
                  filter: "grayscale(100%)",
                  transition: "filter 0.3s ease",
                  height: "100%",
                  objectFit: "cover",
                }}
                className="ant-image-img"
              />
            ))}
          </Carousel>
        </div>
        <div
          style={{
            width: isMobile ? "100%" : "45%",
            //alignContent: "center",
          }}
        >
          <Paragraph
            style={{
              color: darkMode ? darkTheme.color : lightTheme.color,
              fontSize: "1.6rem",
              padding: isMobile ? "0px 0px" : "0px 25px",
              textAlign: isMobile ? "left" : "justify",
            }}
          >
            I am a visionary, my sole purpose — <b>inspire</b> people to lead
            healthier lives <i>physically</i>, <i>emotionally</i>,{" "}
            <i>mentally</i> and <i>spiritually</i>. I am the host of A Deeper
            Dive podcast, a platform which aims to go beyond the surface and
            talk about issues facing young men through my lens. My{" "}
            <b>mission</b> is to inspire people to be bold and share their story
            by initiating tough conversations.
          </Paragraph>
          <Paragraph
            style={{
              color: darkMode ? darkTheme.color : lightTheme.color,
              fontSize: "1.6rem",
              padding: isMobile ? "0px 0px" : "0px 25px",
              textAlign: isMobile ? "left" : "justify",
            }}
          >
            I am also the founder of Misfits, a fitness brand that is committed
            to empowering individuals. Currently, I am pursuing a Bachelor's
            Degree in Data Science and Analytics at USIU-Africa.
          </Paragraph>
        </div>
      </div>
    </Motion>
  );
}

export default About;
