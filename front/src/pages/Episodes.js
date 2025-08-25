import { Button, Card, Col, Image, Row, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import wam from "../assets/audio/wam.mp3";
import wam2 from "../assets/audio/wam2.mp3";
import wam3 from "../assets/audio/wam3.mp3";
import wam4 from "../assets/audio/wam4.mp3";
import { format } from "date-fns";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import Motion from "../components/motion";
import { darkTheme, lightTheme, UserContext } from "../App";
import Swal from "sweetalert2";
import MediaPlayer from "../components/MediaPlayer";
import Loader from "../components/Loader";
import ShinyText from "../components/ShinyText";
import EpisodeModal from "../components/EpisodeModal";

const { Title, Text } = Typography;

const initialEpisodes = [
  {
    id: 1,
    title: "How do I create this?",
    description:
      "I sit down with a behavioral scientist to unpack sustainable habit loops and work-life design.",
    timestamp: "2025-07-08",
    episode: 1,
    audio: wam,
    cover:
      "https://plus.unsplash.com/premium_photo-1668790459187-3b2a743253e1?w=900",
  },
  {
    id: 2,
    title: "How do I create this again?",
    description:
      "I sit down with a behavioral scientist to unpack sustainable habit loops and work-life design.",
    timestamp: "2025-07-08",
    episode: 2,
    audio: wam2,
    cover: "https://images.unsplash.com/photo-1590410790503-ff66c3e9e1e5?w=900",
  },
  {
    id: 3,
    title: "How do I create this once more?",
    description:
      "I sit down with a behavioral scientist to unpack sustainable habit loops and work-life design.",
    timestamp: "2025-07-08",
    episode: 3,
    audio: wam3,
    cover:
      "https://plus.unsplash.com/premium_photo-1664526283895-54f9de9e0d96?w=900",
  },
  {
    id: 4,
    title: "How do I create this: Part 1?",
    description:
      "I sit down with a behavioral scientist to unpack sustainable habit loops and work-life design.",
    timestamp: "2025-07-08",
    episode: 4,
    audio: wam4,
    cover: "https://images.unsplash.com/photo-1517384084767-6bc118943770?w=900",
  },
];

export const formatDuration = (totalSeconds) => {
  const seconds = Math.floor(totalSeconds); // ensure integer seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [hours, minutes, secs]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
};

function Episodes() {
  const {
    darkMode,
    mediaPlaying,
    playMedia,
    currentEp,
    setCurrentEp,
    isPlaying,
    setIsPlaying,
  } = useContext(UserContext);
  const [episodes, setEpisodes] = useState(initialEpisodes);
  const [loading, setLoading] = useState(false);
  const [openEpisodeModal, setOpenEpisodeModal] = useState(false);
  const [episodeContent, setEpisodeContent] = useState(null);

  const viewModal = (episode) => {
    setLoading(true);
    setOpenEpisodeModal(true);
    setEpisodeContent(episode);
    setTimeout(() => setLoading(false), 100);
  };

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

  if (loading) return <Loader text={"Please wait..."} size={"large"} />;

  return (
    <>
      <Motion>
        <div>
          <div style={{ textAlign: "center" }}>
            <ShinyText
              text={"Start Listening Today"}
              disabled={false}
              speed={3}
              className="custom-class"
            />
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
                          icon={
                            currentEp?.id === ep.id && isPlaying ? (
                              <PauseCircleOutlined style={{ fontSize: 28 }} />
                            ) : (
                              <PlayCircleOutlined style={{ fontSize: 28 }} />
                            )
                          }
                          size="large"
                          onClick={() => {
                            if (currentEp?.id === ep.id && isPlaying) {
                              setIsPlaying(false);
                            } else {
                              setLoading(true);
                              try {
                                setCurrentEp(ep);
                                playMedia(ep);
                                setIsPlaying(true);
                              } catch (error) {
                                console.log(error);
                                Swal.fire({
                                  icon: "error",
                                  title: "Error",
                                  text: "Something went wrong. Refresh the page and try again",
                                });
                              } finally {
                                setLoading(false);
                              }
                            }
                          }}
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
                    <div
                      style={{
                        marginTop: 8,
                        textAlign: "right",
                      }}
                    >
                      <Button
                        type="text"
                        style={{ fontFamily: "Raleway" }}
                        onClick={() => {viewModal(ep)}}
                      >
                        View More
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Motion>
      <MediaPlayer media={mediaPlaying} />
      <EpisodeModal
        openModal={openEpisodeModal}
        setOpenModal={setOpenEpisodeModal}
        loading={loading}
        episodeContent={episodeContent}
      />
    </>
  );
}

export default Episodes;
