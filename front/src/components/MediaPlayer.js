import React, { useContext, useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { Card, Typography, Button, Space, Slider, Avatar } from "antd";
import { darkTheme, lightTheme, UserContext } from "../App";
import EpisodeModal from "./EpisodeModal";
import { formatDuration } from "../pages/Episodes";
import { MdForward10, MdReplay10 } from "react-icons/md";

const { Title, Text } = Typography;

const cardStyle = {
  position: "fixed",
  bottom: 5,
  left: "50%",
  transform: "translateX(-50%)",
  width: 1000,
  borderRadius: 16,
  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
  color: "#fff",
  zIndex: 10,
  padding: "1px 16px",
};

function MediaPlayer() {
  const audioRef = useRef(null);
  const { isPlaying, setIsPlaying, mediaPlaying, darkMode } =
    useContext(UserContext);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubTime, setScrubTime] = useState(0);
  const [openEpisodeModal, setOpenEpisodeModal] = useState(false);
  const [episodeContent, setEpisodeContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const viewModal = (episode) => {
    setLoading(true);
    setOpenEpisodeModal(true);
    setEpisodeContent(episode);
    setTimeout(() => setLoading(false), 100);
  };

  // Play/pause sync with global state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const doPlay = async () => {
      try {
        await audio.play();
      } catch {
        // Autoplay blocked — revert UI
        setIsPlaying(false);
      }
    };
    if (isPlaying) doPlay();
    else audio.pause();
  }, [isPlaying, mediaPlaying, setIsPlaying]);

  // Sync audio metadata and playback progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setCurrentTime(audio.currentTime || 0);
      setScrubTime(0);
    };

    const handleTimeUpdate = () => {
      if (!isScrubbing) {
        setCurrentTime(audio.currentTime || 0);
      }
    };

    const handleEnded = () => {
      audio.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    // Handle cached audio (metadata already available)
    if (audio.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [mediaPlaying, isScrubbing, setIsPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value / 100;
  };

  // While dragging slider, show the preview time without committing
  const handleSeekChange = (value) => {
    setIsScrubbing(true);
    setScrubTime(value);
  };

  // On release, commit seek to audio and resume live updates
  const handleSeekAfterChange = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
    setCurrentTime(value);
    setIsScrubbing(false);
  };

  // Set audio volume when volume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume / 100;
    }
  }, [volume]);

  if (!mediaPlaying) return null;

  return (
    <>
      <Card
        style={{
          ...cardStyle,
          background: darkMode
            ? darkTheme.backgroundColor
            : lightTheme.backgroundColor,
        }}
        bodyStyle={{
          alignItems: "center",
          padding: "12px 5px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          {/* Cover */}
          <div
            style={{
              display: "flex",
              gap: 5,
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <div>
              <Avatar
                shape="square"
                size={80}
                src={mediaPlaying.cover}
                style={{ borderRadius: 8 }}
              />
            </div>
            <div>
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
            </div>
          </div>

          {/* seek */}
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
                  // onClick={() => seek(-10)}
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
                  // onClick={() => seek(-10)}
                />
              </Space>
            </div>
            {/* Seek bar */}
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 6 }}
            >
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

          {/* Volume */}
          <div
            style={{
              alignContent: "center",
              justifyContent: "flex-end",
              marginLeft: 10,
            }}
          >
            <Space style={{ width: 120 }} size="middle">
              <Volume2
                size={22}
                style={{
                  color: darkMode ? darkTheme.color : lightTheme.color,
                }}
              />
              <Slider
                min={0}
                max={100}
                value={volume}
                onChange={handleVolumeChange}
                style={{ width: 80 }}
              />
            </Space>
          </div>
        </div>

        {/* Audio */}
        <audio
          key={mediaPlaying?.id}
          ref={audioRef}
          src={mediaPlaying.audio}
          preload="metadata"
        />
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
