import React, { useContext, useState } from "react";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";

import {
  AppleFilled,
  InstagramFilled,
  SpotifyFilled,
  TikTokOutlined,
  XOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import { darkTheme, lightTheme, UserContext } from "../App";
import Swal from "sweetalert2";
import "../assets/css/footer.css";

const { Title } = Typography;

const iconStyle = { fontSize: 25 };

function FooterSection() {
  const [form] = Form.useForm();
  const { isMobile, darkMode } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log(values);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Thank you for your response",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "error",
        text: "There was an error. Try refreshing and try again",
      });
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  const inputStyle = {
    height: 40,
    borderRadius: 16,
    padding: 15,
    width: "100%",
    border: "1px solid #a7b4c0",
    fontFamily: "Raleway",
    background: darkMode
      ? darkTheme.backgroundColor
      : lightTheme.backgroundColor,
    color: darkMode ? darkTheme.color : lightTheme.color,
  };

  const cardStyle = {
    borderRadius: 20,
    border: "1px solid #a7b4c0",
    boxShadow: "0 2px 8px 2px rgba(0,0,0,0.29)",
    marginBottom: 10,
    background: darkMode
      ? darkTheme.backgroundColor
      : lightTheme.backgroundColor,
  };

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
            <Title
              level={3}
              style={{
                textAlign: "center",
                fontFamily: "Raleway",
                color: darkMode ? darkTheme.color : lightTheme.color,
              }}
            >
              Contact the show
            </Title>
            <Form form={form} onFinish={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  gap: isMobile ? 0 : 20,
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <div style={{ width: "100%" }}>
                  <Form.Item title="Name" name="name">
                    <Input
                      placeholder="Your name"
                      style={inputStyle}
                      className="custom-input"
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "100%" }}>
                  <Form.Item name="email_address">
                    <Input
                      placeholder="Email"
                      style={inputStyle}
                      className="custom-input"
                    />
                  </Form.Item>
                </div>
              </div>
              <Form.Item name="subject">
                <Input
                  placeholder="Subject"
                  style={inputStyle}
                  className="custom-input"
                />
              </Form.Item>
              <Form.Item name="body">
                <Input.TextArea
                  placeholder="Message, guest suggestion, or question"
                  rows={4}
                  style={{
                    borderRadius: 16,
                    padding: 15,
                    width: "100%",
                    border: "1px solid #a7b4c0",
                    fontFamily: "Raleway",
                    background: darkMode
                      ? darkTheme.backgroundColor
                      : lightTheme.backgroundColor,
                    color: darkMode ? darkTheme.color : lightTheme.color,
                  }}
                  className="custom-input"
                />
              </Form.Item>
              <Button
                type="primary"
                style={{
                  borderRadius: 20,
                  padding: 20,
                  width: isMobile ? "100%" : "20%",
                }}
                htmlType="submit"
                loading={loading}
                block={isMobile ? true : false}
              >
                {loading ? "Uploading..." : "Send"}
              </Button>
            </Form>
          </Card>
        </div>

        <div style={{ width: isMobile ? "100%" : "40%", margin: "0 auto" }}>
          <Card style={cardStyle}>
            <Title
              level={3}
              style={{
                textAlign: "center",
                marginBottom: 24,
                fontFamily: "Raleway",
                color: darkMode ? darkTheme.color : lightTheme.color,
              }}
            >
              Follow on all platforms
            </Title>

            <Row gutter={[16, 16]} justify="center">
              {[
                {
                  icon: <InstagramFilled style={iconStyle} />,
                  label: "Instagram",
                  color: "#ee2a7b",
                  link: "https://www.instagram.com/",
                },
                {
                  icon: <TikTokOutlined style={iconStyle} />,
                  label: "TikTok",
                  color: darkMode ? darkTheme.color : lightTheme.color,
                  link: "https://www.tiktok.com/",
                },
                {
                  icon: <YoutubeFilled style={iconStyle} />,
                  label: "YouTube",
                  color: "#FF0000",
                  link: "https://www.youtube.com/",
                },
                {
                  icon: <XOutlined style={iconStyle} />,
                  label: "X",
                  color: darkMode ? darkTheme.color : lightTheme.color,
                  link: "https://x.com/home?lang=en",
                },
                {
                  icon: <SpotifyFilled style={iconStyle} />,
                  label: "Spotify",
                  color: "#1DB954",
                  link: "https://open.spotify.com/",
                },

                {
                  icon: <AppleFilled style={iconStyle} />,
                  label: "Apple Music",
                  color: "#999999",
                  link: "https://music.apple.com/us/new",
                },
              ].map((item, index) => (
                <Col xs={12} sm={8} md={8} lg={8} key={index}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 3,
                      padding: "12px 12px",
                      borderRadius: 12,
                      background: darkMode
                        ? darkTheme.backgroundColor
                        : lightTheme.backgroundColor,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.19)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontWeight: 500,
                      color: item.color,
                      border: "1px solid #fff",
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
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: item.color,
                      }}
                    >
                      {item.icon} <span>{item.label}</span>
                    </a>
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
