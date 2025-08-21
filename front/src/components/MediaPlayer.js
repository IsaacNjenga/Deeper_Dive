import React, { useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Card, Typography, Button, Space, Slider, Avatar } from "antd";
import wam from "../assets/audio/wam.mp3";

const { Title, Text } = Typography;

function MediaPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    audioRef.current.volume = value / 100;
  };

  return (
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
        src="/cover.jpg"
        style={{ borderRadius: 8, marginRight: 12 }}
      />

      {/* Track Info */}
      <div style={{ flex: 1 }}>
        <Title level={5} style={{ color: "#fff", margin: 0, fontSize: 14 }}>
          Wait A Minute!
        </Title>
        <Text style={{ color: "#aaa", fontSize: 12 }}>Willow Smith</Text>
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
      <audio ref={audioRef} src={wam} preload="metadata" />
    </Card>
  );
}

export default MediaPlayer;
