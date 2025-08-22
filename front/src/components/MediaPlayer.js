import React, { useContext, useRef, useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Card, Typography, Button, Space, Slider, Avatar } from "antd";
import { darkTheme, lightTheme, UserContext } from "../App";
import EpisodeModal from "./EpisodeModal";

const { Title, Text } = Typography;

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

  // Duration, time updates, and ended handler
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      setDuration(audio.duration || 0);
      setCurrentTime(audio.currentTime || 0);
      setScrubTime(0);
    };
    const onTimeUpdate = () => {
      if (!isScrubbing) setCurrentTime(audio.currentTime || 0);
    };
    const onEnded = () => {
      // reset to start and switch to play icon
      audio.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    // set initial volume
    audio.volume = volume / 100;

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [isScrubbing, setIsPlaying, volume]);

  // Reset UI when a new media loads (optional but keeps things tidy)
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setIsScrubbing(false);
    setScrubTime(0);
  }, [mediaPlaying]);

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

  const formatTime = (secs) => {
    if (!Number.isFinite(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!mediaPlaying) return null;

  return (
    <>
      <Card
        style={{
          position: "fixed",
          bottom: 5,
          left: "50%",
          transform: "translateX(-50%)",
          width: 740,
          borderRadius: 16,
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          background: darkMode
            ? darkTheme.backgroundColor
            : lightTheme.backgroundColor,
          color: "#fff",
          zIndex: 10,
          padding: "1px 16px",
        }}
        bodyStyle={{
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
          gap: 12,
        }}
      >
        {/* Cover */}
        <Avatar
          shape="square"
          size={80}
          src={mediaPlaying.cover}
          style={{ borderRadius: 8 }}
        />

        {/* Track Info + Seek */}
        <div style={{ flex: 1, minWidth: 0 }}>
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
              gap: 12,
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

          {/* Seek bar */}
          <div style={{ display: "flex", alignItems: "center", marginTop: 6 }}>
            <Text style={{ color: "#aaa", fontSize: 11, marginRight: 6 }}>
              {formatTime(isScrubbing ? scrubTime : currentTime)}
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
              {formatTime(duration)}
            </Text>
          </div>
        </div>

        {/* Controls */}
        <Space size="middle">
          <Button
            type="text"
            icon={
              <SkipBack
                size={18}
                style={{
                  color: darkMode ? darkTheme.color : lightTheme.color,
                }}
              />
            }
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
              <SkipForward
                size={18}
                style={{
                  color: darkMode ? darkTheme.color : lightTheme.color,
                }}
              />
            }
          />
        </Space>

        {/* Volume */}
        <Space style={{ width: 120 }} size="middle">
          <Volume2
            size={20}
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

        {/* Audio */}
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
