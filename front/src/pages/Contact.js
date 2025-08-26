import React, { useContext } from "react";
import Motion from "../components/motion";
import { darkTheme, lightTheme, UserContext } from "../App";
import { Card, Col, Row, Typography } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function Contact() {
  const { darkMode } = useContext(UserContext);

  const iconStyle = {
    borderRadius: "50%",
    border: `2px solid ${darkMode ? darkTheme.color : lightTheme.color}`,
    padding: 10,
    fontSize: "2.5rem",
    color: darkMode ? darkTheme.color : lightTheme.color,
  };

  const details = [
    {
      id: 1,
      name: "Email",
      contact: "john@email.com",
      icon: <MailOutlined style={iconStyle} />,
    },
    {
      id: 2,
      name: "Phone",
      contact: "+254 740 900-068",
      icon: <PhoneOutlined style={iconStyle} />,
    },
  ];
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
        Contact
      </Title>
      <div
        style={{
          color: darkMode ? darkTheme.color : lightTheme.color,
        }}
      >
        {/* contact details */}
        <div style={{ margin: 10, padding: "30px 40px" }}>
          <Row gutter={[16, 16]} style={{ justifyContent: "center" }}>
            {details.map((d) => (
              <Col key={d.id} xs={24} sm={12} md={8}>
                <Card
                  key={d.id}
                  hoverable
                  style={{
                    minHeight: 250,
                    height: "100%",
                    borderRadius: 12,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    background: darkMode
                      ? darkTheme.backgroundColor
                      : lightTheme.backgroundColor,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                      margin: 10,
                      padding: 10,
                    }}
                  >
                    <div style={{ marginBottom: 10 }}>
                      <Text>{d.icon}</Text>
                    </div>
                    <div>
                      <Text
                        style={{
                          fontFamily: "Raleway",
                          fontSize: "22px",
                          marginTop: 10,
                          color: darkMode ? darkTheme.color : lightTheme.color,
                        }}
                      >
                        {d.contact}
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        {/* accordion */}
        <div></div>
      </div>
    </Motion>
  );
}

export default Contact;
