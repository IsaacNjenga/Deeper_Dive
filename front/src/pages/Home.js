import React, { useContext } from "react";
import Motion from "../components/motion.js";
import { Card, Col, Row, Tag, Typography, Button, Input, Image } from "antd";
import { darkTheme, lightTheme, UserContext } from "../App.js";
import GradientText from "../components/gradientText.js";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;
const img1 =
  "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=900";
const img2 =
  "https://images.unsplash.com/photo-1619344501177-cb47c4a94c59?w=900";
const img3 =
  "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=900";
const avatarImg =
  "https://images.unsplash.com/photo-1594703276852-68829b071330?w=900";

const featuredLists = [
  {
    id: 1,
    image: img1,
    title: "The Power Of Yet",
    text: "Do you have a growth or fixed mindset? Life can be challenging and it is crucial to develop a growth mindset in every aspect of life.",
    url: "https://open.spotify.com/episode/4y6pjFXwP8cX2DysnzrPJn",
  },
  {
    id: 2,
    image: img2,
    title: "I Landed My Dream Job, But...",
    text: "Take a deeper dive on how my passion for fitness and wellness has developed since childhood and how I declined my dream job as a fitness trainer.",
    url: "https://open.spotify.com/episode/6LTLDIWyUjo0wqetNcZPRy",
  },
  {
    id: 3,
    image: img3,
    title: "A 22 Year Old Freshman",
    text: "Take a deep breath and dive into my the first episode of the pod. I talk about being a 22 year old freshman navigating uni life.",
    url: "https://open.spotify.com/episode/4007zXeTB8hsKW8lg5lXHu",
  },
];

function Home() {
  const navigate = useNavigate();
  const { isMobile, darkMode } = useContext(UserContext);

  return (
    <>
      <Motion>
        <div style={{ margin: "40px 10px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 20,
              margin: "0px 10px",
            }}
          >
            <div style={{ width: isMobile ? "100%" : "60%", marginTop: 30 }}>
              <Tag
                style={{
                  borderRadius: 15,
                  background: "#ed0141",
                  color: "whitesmoke",
                  padding: 6,
                  fontWeight: "bold",
                  borderColor: "rgba(0,0,0,0)",
                  fontFamily: "Raleway",
                }}
              >
                New episode every other Friday!
              </Tag>
              <Title
                style={{
                  color: darkMode ? darkTheme.color : lightTheme.color,
                  fontWeight: 800,
                  fontSize: isMobile ? 48 : 56,
                }}
              >
                Go beneath the surface.{" "}
                <span>
                  <GradientText
                    colors={[
                      "#ff3b30", // vivid apple red
                      "#ff6b00", // orange glow
                      "#b22222", // firebrick
                      "#ff1744", // hot pinkish red
                      "#ff4500", // flame orange
                    ]}
                    animationSpeed={8}
                    showBorder={false}
                    className="custom-class"
                  >
                    Dive Deeper
                  </GradientText>
                </span>{" "}
                into the stories, trauma and ideas shaping a young man's life.
              </Title>
              <Text
                type="secondary"
                style={{
                  fontSize: 20,
                  color: "#85898d",
                  fontFamily: "Raleway",
                }}
              >
                Long-form conversations hosted by Jeremy Nyabila — with a range
                of exciting guests from all over.
              </Text>
              <div style={{ marginTop: 20 }}>
                <Button
                  type="primary"
                  size="large"
                  style={{ marginRight: 10, fontFamily: "Raleway" }}
                  onClick={() => navigate("/episodes")}
                >
                  Listen Now
                </Button>
                <Button size="large">
                  <a
                    href="https://open.spotify.com/show/2i1gNQLoqN2MhxaLIomtQe?si=QZzKbvtPT0mcjR2colcVAQ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Subscribe
                  </a>
                </Button>
              </div>
            </div>

            <div
              style={{
                background: "rgba(0,0,0,0)",
                width: isMobile ? "100%" : "40%",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(0,0,0,0)",
              }}
            >
              <div
                style={{
                  borderRadius: 12,
                  width: "100%",
                  margin: "auto",
                }}
              >
                <Image
                  src={avatarImg}
                  alt="_img"
                  style={{
                    borderRadius: 12,
                    objectFit: "cover",
                  }}
                  preview={false}
                  className="ant2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Episodes */}
        <div style={{ margin: "60px 20px" }}>
          <Title
            level={2}
            style={{
              fontWeight: "bold",
              color: darkMode ? darkTheme.color : lightTheme.color,
              fontFamily: "Raleway",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            Featured Episodes
          </Title>
          <Row gutter={[16, 16]}>
            {featuredLists.map((ep) => (
              <Col xs={24} sm={12} md={8} key={ep}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 12,
                    height: "100%",
                    background: "rgba(0,0,0,0)",
                    border: "none",
                  }}
                  cover={
                    <Image
                      src={ep.image}
                      alt="pd_img"
                      style={{
                        height: 300,
                        objectFit: "contain",
                      }}
                      preview={false}
                      className="ant2"
                    />
                  }
                  key={ep.id}
                >
                  <Card.Meta
                    title={
                      <Title
                        level={isMobile ? 5 : 4}
                        style={{
                          color: darkMode ? darkTheme.color : lightTheme.color,
                          fontFamily: "Raleway",
                          margin: 0,
                        }}
                      >
                        {ep.title}
                      </Title>
                    }
                    description={
                      <Paragraph
                        style={{
                          color: darkMode ? darkTheme.color : lightTheme.color,
                          fontFamily: "Roboto",
                          margin: 0,
                          fontSize: 16,
                        }}
                      >
                        {ep.text}
                      </Paragraph>
                    }
                  />
                  <Button type="link" style={{ padding: 0, marginTop: 8 }}>
                    <a
                      href={ep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: darkMode ? darkTheme.color : lightTheme.color,
                        fontFamily: "Raleway",
                        fontSize: 18,
                      }}
                    >
                      Listen →
                    </a>
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div style={{ margin: "60px 20px", textAlign: "center" }}>
          <Title
            level={2}
            style={{
              color: darkMode ? darkTheme.color : lightTheme.color,
              fontFamily: "Roboto",
              textDecoration: "underline",
            }}
          >
            About The Podcast
          </Title>
          <Paragraph
            style={{
              maxWidth: 700,
              margin: "0 auto",
              fontSize: 18,
              color: darkMode ? darkTheme.color : lightTheme.color,
              fontFamily: "Raleway",
            }}
          >
            <strong>A Deeper Dive</strong> is a podcast dedicated to tackle deep
            seated traumas, issues and challenges facing a young man’s life. It
            is dedicated to initiate tough conversations and inspire people to
            live in their truth by fostering vulnerability and transparency.
          </Paragraph>
        </div>

        {/* Newsletter / Subscribe */}
        <div
          style={{
            margin: "60px 20px",
            padding: "40px 20px",
            background: "#f4f8ff",
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          <Title level={3} style={{ fontFamily: "Raleway" }}>
            Stay Updated
          </Title>
          <Text style={{ fontFamily: "Raleway" }}>
            Subscribe to get new episodes straight to your inbox
          </Text>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <Input placeholder="Enter your email" style={{ width: 280 }} />
            <Button type="primary" style={{ fontFamily: "Raleway" }}>
              Subscribe
            </Button>
          </div>
        </div>
      </Motion>
    </>
  );
}

export default Home;
