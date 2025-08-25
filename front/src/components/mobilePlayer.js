import { Button, Card, Slider, Space, Typography } from "antd";
import { Pause, Play } from "lucide-react";
import { MdForward10, MdReplay10 } from "react-icons/md";
import { darkTheme, lightTheme } from "../App";
import { formatDuration } from "../pages/Episodes";

const { Title, Text } = Typography;

const cardStyle = {
  position: "fixed",
  bottom: 5,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  borderRadius: 16,
  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
  color: "#fff",
  zIndex: 10000,
  padding: "1px 5px",
};

function MobilePlayer({
  togglePlay,
  duration,
  isScrubbing,
  scrubTime,
  handleSeekAfterChange,
  handleSeekChange,
  darkMode,
  isPlaying,
  currentTime,
  mediaPlaying,
  audioRef,
  viewModal,
  onRewind,
  onForward,
}) {
  return (
    <Card
      style={{
        ...cardStyle,
        background: darkMode
          ? darkTheme.backgroundColor
          : lightTheme.backgroundColor,
      }}
    >
      {/* Track Info */}
      <div style={{ flex: 1 }}>
        <Title
          level={5}
          style={{
            color: darkMode ? darkTheme.color : lightTheme.color,
            margin: 0,
            fontSize: 14,
            fontFamily: "Raleway",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={mediaPlaying.title}
        >
          {mediaPlaying.title}
        </Title>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text style={{ color: "#aaa", fontSize: 12 }}>
            Episode: {mediaPlaying.episode}
          </Text>
          <Button
            type="text"
            style={{ color: "#aaa", fontSize: 12 }}
            onClick={() => viewModal(mediaPlaying)}
          >
            View more
          </Button>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <div
          style={{
            margin: "auto",
            textAlign: "center",
          }}
        >
          {/* Controls */}
          <Space size="middle">
            <Button
              type="text"
              icon={
                <MdReplay10
                  size={28}
                  style={{
                    color: darkMode ? darkTheme.color : lightTheme.color,
                  }}
                />
              }
              onClick={onRewind}
            />

            <Button
              shape="circle"
              type="primary"
              size="large"
              onClick={togglePlay}
              style={{
                background: "#333",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              icon={
                isPlaying ? (
                  <Pause
                    size={22}
                    style={{
                      color: darkTheme.color,
                    }}
                  />
                ) : (
                  <Play
                    size={22}
                    style={{
                      color: darkTheme.color,
                    }}
                  />
                )
              }
            />
            <Button
              type="text"
              icon={
                <MdForward10
                  size={28}
                  style={{
                    color: darkMode ? darkTheme.color : lightTheme.color,
                  }}
                />
              }
              onClick={onForward}
            />
          </Space>
        </div>
        {/* Seek bar */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 6 }}>
          <Text style={{ color: "#aaa", fontSize: 11, marginRight: 6 }}>
            {formatDuration(isScrubbing ? scrubTime : currentTime)}
          </Text>
          <Slider
            min={0}
            max={duration || 0}
            step={0.1}
            value={isScrubbing ? scrubTime : currentTime}
            onChange={handleSeekChange}
            onAfterChange={handleSeekAfterChange}
            tooltip={{ open: false }}
            style={{ flex: 1 }}
          />
          <Text style={{ color: "#aaa", fontSize: 11, marginLeft: 6 }}>
            {formatDuration(duration)}
          </Text>
        </div>
      </div>
      <audio
        key={mediaPlaying?.id}
        ref={audioRef}
        src={mediaPlaying.audio}
        preload="metadata"
      />
    </Card>
  );
}

export default MobilePlayer;
