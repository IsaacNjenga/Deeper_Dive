import { Button, Card, Col, Image, Row, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import wam from "../assets/audio/wam.mp3";
import { format } from "date-fns";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import Motion from "../components/motion";
import { darkTheme, lightTheme, UserContext } from "../App";

const { Title, Text } = Typography;

const initialEpisodes = [
  {
    id: 1,
    title: "How do I create this?",
    description: "A little description here to serve the template",
    timestamp: "2025-07-08",
    episode: 1,
    audio: wam,
    cover:
      "https://plus.unsplash.com/premium_photo-1668790459187-3b2a743253e1?w=900",
  },
  {
    id: 2,
    title: "How do I create this again?",
    description: "A little description here to serve the template",
    timestamp: "2025-07-08",
    episode: 2,
    audio: wam,
    cover: "https://images.unsplash.com/photo-1590410790503-ff66c3e9e1e5?w=900",
  },
  {
    id: 3,
    title: "How do I create this once more?",
    description: "A little description here to serve the template",
    timestamp: "2025-07-08",
    episode: 3,
    audio: wam,
    cover:
      "https://plus.unsplash.com/premium_photo-1664526283895-54f9de9e0d96?w=900",
  },
  {
    id: 4,
    title: "How do I create this: Part 1?",
    description: "A little description here to serve the template",
    timestamp: "2025-07-08",
    episode: 4,
    audio: wam,
    cover: "https://images.unsplash.com/photo-1517384084767-6bc118943770?w=900",
  },
];

export const formatDuration = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
};

function Episodes() {
  const { darkMode } = useContext(UserContext);
  const [episodes, setEpisodes] = useState(initialEpisodes);

  // Load durations dynamically
  useEffect(() => {
    initialEpisodes.forEach((ep, idx) => {
      const audio = new Audio(ep.audio);
      audio.onloadedmetadata = () => {
        setEpisodes((prev) =>
          prev.map((e) =>
            e.id === ep.id ? { ...e, duration: Math.round(audio.duration) } : e
          )
        );
      };
    });
  }, []);

  return (
    <Motion>
      <div>
        <div style={{ textAlign: "center" }}>
          <Title
            level={3}
            style={{ color: "#484789", marginBottom: 0, fontFamily: "Raleway" }}
          >
            Start Listening Today
          </Title>
          <Title
            style={{
              color: darkMode ? darkTheme.color : lightTheme.color,
              marginTop: 0,
              fontFamily: "Raleway",
            }}
          >
            Latest Episodes
          </Title>
        </div>

        <div style={{ margin: 10, padding: "30px 40px" }}>
          <Row gutter={[16, 16]}>
            {episodes.map((ep) => (
              <Col key={ep.id} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  style={{
                    height: "100%",
                    borderRadius: 12,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                  cover={
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: 200,
                        overflow: "hidden",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                      }}
                    >
                      <Image
                        src={ep.cover}
                        alt="pod_cover"
                        preview={false}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />

                      {/* Play Button Overlay */}
                      <Button
                        shape="circle"
                        icon={<PlayCircleOutlined style={{ fontSize: 28 }} />}
                        size="large"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "#f70535",
                          color: "#fff",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                          zIndex: 2,
                        }}
                      />
                    </div>
                  }
                >
                  {/* Meta info */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      type="secondary"
                      style={{ fontSize: 13, fontFamily: "Roboto" }}
                    >
                      <CalendarOutlined />{" "}
                      {format(new Date(ep.timestamp), "PPP")}
                    </Text>
                    <Text
                      type="secondary"
                      style={{ fontSize: 13, fontFamily: "Roboto" }}
                    >
                      <ClockCircleOutlined />{" "}
                      {ep.duration ? `${formatDuration(ep.duration)}` : "…"}
                    </Text>
                  </div>

                  {/* Title + description */}
                  <Card.Meta
                    title={
                      <Title
                        level={5}
                        style={{
                          marginBottom: 4,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontFamily: "Raleway",
                        }}
                      >
                        Episode {ep.episode}: {ep.title}
                      </Title>
                    }
                    description={
                      <Text
                        type="secondary"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          fontFamily: "Raleway",
                        }}
                      >
                        {ep.description}
                      </Text>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Motion>
  );
}

export default Episodes;
