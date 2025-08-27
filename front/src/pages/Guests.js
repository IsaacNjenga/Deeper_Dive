import React, { useContext, useEffect } from "react";
import Motion from "../components/motion";
import { darkTheme, lightTheme, UserContext } from "../App";
import { Card, Col, Image, Row, Typography, Button } from "antd";

const { Title, Text, Paragraph } = Typography;

const bannerImg =
  "https://images.pexels.com/photos/14218476/pexels-photo-14218476.jpeg";

const guestList = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1615572359976-1fe39507ed7b?w=900",
    name: "John Doe",
    title: "CEO - Safaricom",
    bio: "A leader in innovation and connectivity, sharing insights on technology's role in shaping Africa's future.",
  },
  {
    id: 2,
    img: "https://plus.unsplash.com/premium_photo-1702168673084-1d1042a93fde?w=900",
    name: "Jane Doe",
    title: "Musician",
    bio: "An award-winning artist, exploring the power of music in storytelling and cultural identity.",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1551692703-f4941f2f0f6a?w=900",
    name: "Davido",
    title: "Influencer",
    bio: "One of Africa’s top influencers, discussing social media trends, branding, and authentic audience engagement.",
  },
];

function Guests() {
  useEffect(() => {
    document.title = "Guests - A Deeper Dive";
  }, []);

  const { darkMode } = useContext(UserContext);

  return (
    <Motion>
      <div style={{ color: darkMode ? darkTheme.color : lightTheme.color }}>
        {/* Banner */}
        <div style={{ position: "relative" }}>
          <Image
            src={bannerImg}
            alt="banner"
            preview={false}
            width="100%"
            height={500}
            style={{ objectFit: "cover" }}
            className="ant2"
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "#fff",
            }}
          >
            <Title level={1} style={{ color: "#fff", fontFamily: "Raleway" }}>
              Our Esteemed Guests
            </Title>
            <Paragraph
              style={{
                color: "#eee",
                maxWidth: 600,
                textAlign: "center",
                fontFamily: "Raleway",
              }}
            >
              From business leaders to creatives, our guests bring unique
              perspectives, stories, and expertise that spark meaningful
              conversations and deeper understanding.
            </Paragraph>
          </div>
        </div>

        {/* Guest Cards */}
        <div style={{ textAlign: "center", margin: "40px 20px" }}>
          <Row gutter={[24, 24]}>
            {guestList.map((g) => (
              <Col xs={24} sm={12} md={8} key={g.id}>
                <Card
                  hoverable
                  style={{
                    height: "100%",
                    borderRadius: 12,
                    background: "rgba(0,0,0,0)",
                    //boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    border: "none",
                  }}
                  cover={
                    <Image
                      src={g.img}
                      alt={g.name}
                      style={{
                        height: 300,
                        objectFit: "cover",
                        borderRadius: "16px 16px 0 0",
                      }}
                      preview={false}
                      className="ant2"
                    />
                  }
                >
                  <Card.Meta
                    title={
                      <Title
                        level={4}
                        style={{
                          margin: 0,
                          color: darkMode ? darkTheme.color : lightTheme.color,
                          fontFamily: "Raleway",
                        }}
                      >
                        {g.name}
                      </Title>
                    }
                    description={
                      <>
                        <Text
                          type="secondary"
                          style={{ fontFamily: "Roboto", color: "#aaa" }}
                        >
                          {g.title}
                        </Text>
                        <Paragraph
                          style={{
                            marginTop: 10,
                            fontSize: 14,
                            color: darkMode
                              ? darkTheme.color
                              : lightTheme.color,
                          }}
                        >
                          {g.bio}
                        </Paragraph>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Title
            level={3}
            style={{
              fontFamily: "Raleway",
              color: darkMode ? darkTheme.color : lightTheme.color,
            }}
          >
            Want to be our next guest?
          </Title>
          <Paragraph
            style={{
              maxWidth: 600,
              margin: "0 auto",
              color: darkMode ? darkTheme.color : lightTheme.color,
              fontSize: 20,
            }}
          >
            We’re always looking for inspiring voices and fresh perspectives. If
            you’d like to share your story or collaborate, reach out to us.
          </Paragraph>
          <Button
            type="primary"
            style={{
              marginTop: 20,
              borderRadius: 24,
              padding: "0 24px",
              height: 40,
              background: "#f70535",
              border: "none",
              fontWeight: 600,
              color: darkTheme.color,
            }}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </Motion>
  );
}

export default Guests;
