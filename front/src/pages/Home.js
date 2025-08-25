import React, { useContext } from "react";
import Motion from "../components/motion.js";
import { Card, Col, Row, Tag, Typography, Button, Input, Image } from "antd";
import { darkTheme, lightTheme, UserContext } from "../App.js";
import GradientText from "../components/gradientText.js";

const { Title, Text, Paragraph } = Typography;
const img1 =
  "https://images.unsplash.com/photo-1581368135153-a506cf13b1e1?w=900";
const img2 =
  "https://images.unsplash.com/photo-1567596275753-92607c3ce1ae?w=900";
const img3 =
  "https://images.unsplash.com/photo-1593697820826-2e76c9720a99?w=900";
const avatarImg =
  "https://images.unsplash.com/photo-1594703276852-68829b071330?w=900";

const featuredLists = [
  {
    id: 1,
    image: img1,
    title: "Cold open",
    text: "Designing a Life You Don't Need a Vacation From",
  },
  {
    id: 2,
    image: img2,
    title: "Behavioral Scientist, Habit Labs",
    text: "Dr. Muriuki researches how tiny, repeatable actions compound into meaningful behavior change.",
  },
  {
    id: 3,
    image: img3,
    title: "Myth vs Reality",
    text: "I sit down with a behavioral scientist to unpack sustainable habit loops and work-life design.",
  },
];
function Home() {
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
                Go beyond the headlines.{" "}
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
                into the ideas shaping life & work
              </Title>
              <Text
                type="secondary"
                style={{
                  fontSize: 20,
                  color: "#85898d",
                  fontFamily: "Raleway",
                }}
              >
                Long-form conversations hosted by Jeremy Nyabila — with
                founders, artists, scientists, and leaders across Africa and the
                world.
              </Text>
              <div style={{ marginTop: 20 }}>
                <Button
                  type="primary"
                  size="large"
                  style={{ marginRight: 10, fontFamily: "Raleway" }}
                >
                  Listen Now
                </Button>
                <Button size="large">Subscribe</Button>
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
            }}
          >
            Featured Episodes
          </Title>
          <Row gutter={[16, 16]}>
            {featuredLists.map((ep) => (
              <Col xs={24} sm={12} md={8} key={ep}>
                <Card
                  hoverable
                  style={{ borderRadius: 12, height: "100%" }}
                  cover={
                    <div
                      style={{
                        background: "#e4e6eb",
                        borderRadius: 12,
                      }}
                    >
                      <Image
                        src={ep.image}
                        alt="pd_img"
                        style={{ height: "100%" }}
                      />
                    </div>
                  }
                  key={ep.id}
                >
                  <Card.Meta
                    title={`Episode ${ep.id}: ${ep.title}`}
                    description={ep.text}
                  />
                  <Button type="link" style={{ padding: 0, marginTop: 8 }}>
                    Listen →
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
            }}
          >
            About the Podcast
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
            <strong>A Deeper Dive</strong> is a podcast dedicated to exploring
            the stories, challenges, and insights shaping the future of Africa
            and the world. Each episode takes you beyond the headlines, offering
            fresh perspectives from leaders in business, science, art, and
            culture.
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
          <Title level={3}>Stay Updated</Title>
          <Text>Subscribe to get new episodes straight to your inbox</Text>
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
            <Button type="primary">Subscribe</Button>
          </div>
        </div>
      </Motion>
    </>
  );
}

export default Home;
