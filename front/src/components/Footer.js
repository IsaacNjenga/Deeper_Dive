import React, { useContext } from "react";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";

import {
  AppleOutlined,
  InstagramOutlined,
  SpotifyOutlined,
  TikTokOutlined,
  XOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { UserContext } from "../App";

const { Title } = Typography;

const inputStyle = {
  height: 40,
  borderRadius: 16,
  padding: 15,
  width: "100%",
  border: "1px solid #a7b4c0",
};

const cardStyle = { borderRadius: 20 };

const iconStyle = { fontSize: 25 };

function FooterSection() {
  const { isMobile } = useContext(UserContext);

  return (
    <footer style={{ marginBottom: 30 }}>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 10,
          margin: "0px 15px",
          padding: "0 10px",
        }}
      >
        <div style={{ width: isMobile ? "100%" : "60%" }}>
          <Card style={cardStyle}>
            <Title level={3} style={{ textAlign: "center" }}>
              Contact the show
            </Title>
            <Form>
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ width: "100%" }}>
                  <Form.Item>
                    <Input placeholder="Your name" style={inputStyle} />
                  </Form.Item>
                </div>
                <div style={{ width: "100%" }}>
                  <Form.Item>
                    <Input placeholder="Email" style={inputStyle} />
                  </Form.Item>
                </div>
              </div>
              <Form.Item>
                <Input placeholder="Subject" style={inputStyle} />
              </Form.Item>
              <Form.Item>
                <Input.TextArea
                  placeholder="Message, guest suggestion, or question"
                  rows={4}
                  style={{
                    borderRadius: 16,
                    padding: 15,
                    width: "100%",
                    border: "1px solid #a7b4c0",
                  }}
                />
              </Form.Item>
              <Button type="primary" style={{ borderRadius: 20 }}>
                Send
              </Button>
            </Form>
          </Card>
        </div>

        <div style={{ width: isMobile ? "100%" : "42%", margin: "0 auto" }}>
          <Card
            style={{
              ...cardStyle,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
              Follow on All Platforms
            </Title>

            <Row gutter={[16, 16]} justify="center">
              {[
                {
                  icon: <InstagramOutlined style={iconStyle} />,
                  label: "Instagram",
                  color: "#ee2a7b",
                },
                {
                  icon: <TikTokOutlined style={iconStyle} />,
                  label: "TikTok",
                  color: "#000000",
                },
                {
                  icon: <XOutlined style={iconStyle} />,
                  label: "X",
                  color: "#1DA1F2",
                },
                {
                  icon: <SpotifyOutlined style={iconStyle} />,
                  label: "Spotify",
                  color: "#1DB954",
                },
                {
                  icon: <YoutubeOutlined style={iconStyle} />,
                  label: "YouTube",
                  color: "#FF0000",
                },
                {
                  icon: <AppleOutlined style={iconStyle} />,
                  label: "Apple Music",
                  color: "#999999",
                },
              ].map((item, index) => (
                <Col xs={12} sm={8} md={8} lg={8} key={index}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "12px 16px",
                      borderRadius: 12,
                      backgroundColor: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.19)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontWeight: 500,
                      color: item.color,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 14px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px rgba(0,0,0,0.05)";
                    }}
                  >
                    {item.icon} <span>{item.label}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
