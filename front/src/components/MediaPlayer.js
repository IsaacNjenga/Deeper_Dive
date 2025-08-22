import React, { useContext, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Card, Typography, Button, Space, Slider, Avatar } from "antd";
import { UserContext } from "../App";
import EpisodeModal from "./EpisodeModal";

const { Title, Text } = Typography;

function MediaPlayer() {
  const audioRef = useRef(null);
  const { isPlaying, setIsPlaying, mediaPlaying } = useContext(UserContext);
  const [volume, setVolume] = useState(3);
  const [openEpisodeModal, setOpenEpisodeModal] = useState(false);
  const [episodeContent, setEpisodeContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const viewModal = (episode) => {
    setLoading(true);
    setOpenEpisodeModal(true);
    setEpisodeContent(episode);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  React.useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, mediaPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    audioRef.current.volume = value / 100;
  };

  if (!mediaPlaying) return null;

  return (
    <>
      <Card
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 580,
          borderRadius: 16,
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          background: "#1f1f1f",
          color: "#fff",
          zIndex: 10,
          padding: "12px 16px",
        }}
        bodyStyle={{
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
        }}
      >
        {/* Cover Art */}
        <Avatar
          shape="square"
          size={56}
          src={mediaPlaying.cover}
          style={{ borderRadius: 8, marginRight: 12 }}
        />

        {/* Track Info */}
        <div style={{ flex: 1, paddingRight: "10px" }}>
          <Title
            level={5}
            style={{
              color: "#fff",
              margin: 0,
              fontSize: 14,
              fontFamily: "Raleway",
            }}
          >
            {mediaPlaying.title}
          </Title>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#aaa", fontSize: 12, fontFamily: "Roboto" }}>
              Episode: {mediaPlaying.episode}{" "}
            </Text>
            <Button
              type="text"
              style={{
                color: "#aaa",
                fontSize: 12,
                fontFamily: "Roboto",
              }}
              onClick={() => viewModal(mediaPlaying)}
            >
              <div
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                View more
              </div>
            </Button>
          </div>
        </div>

        {/* Controls */}
        <Space size="middle">
          <Button type="text" icon={<SkipBack size={18} color="#fff" />} />
          <Button
            shape="circle"
            type="primary"
            size="large"
            onClick={togglePlay}
            style={{
              background: "#52c41a",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            icon={isPlaying ? <Pause size={20} /> : <Play size={20} />}
          />
          <Button type="text" icon={<SkipForward size={18} color="#fff" />} />
        </Space>

        {/* Volume */}
        <Space style={{ marginLeft: 12, width: 100 }}>
          <Volume2 size={16} color="#fff" />
          <Slider
            min={0}
            max={100}
            value={volume}
            onChange={handleVolumeChange}
            style={{ width: 80 }}
          />
        </Space>

        {/* Audio element */}
        <audio ref={audioRef} src={mediaPlaying.audio} preload="metadata" />
      </Card>
      <EpisodeModal
        openModal={openEpisodeModal}
        setOpenModal={setOpenEpisodeModal}
        loading={loading}
        episodeContent={episodeContent}
      />
    </>
  );
}

export default MediaPlayer;
