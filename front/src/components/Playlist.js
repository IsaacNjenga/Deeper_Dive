import React, { useContext, useEffect } from "react";
import { darkTheme, lightTheme, UserContext } from "../App";
import { List, Avatar, Button, Typography } from "antd";
import {
  PlayCircleOutlined,
  DeleteOutlined,
  PauseCircleOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import { useMedia } from "./MediaContext";

const { Text } = Typography;

function Playlist({ playlist }) {
  const { darkMode } = useContext(UserContext);
  const {
    setIsPlaying,
    setPlaylist,
    isPlaying,
    setCurrentIndex,
    setIsPlayingAll,
    playEpisode,
  } = useMedia();

  useEffect(() => {
    const savedPlaylist = JSON.parse(localStorage.getItem("playlist"));
    if (savedPlaylist) setPlaylist(savedPlaylist);
  }, []);

  // const playEpisode = (episode) => {
  //   setMediaPlaying(episode);
  //   setIsPlaying(true);
  // };

  const removeFromPlaylist = (id) => {
    setPlaylist((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("playlist", JSON.stringify(updated));
      return updated;
    });
  };

  const handlePlayAll = () => {
    if (playlist.length > 0) {
      setCurrentIndex(0);
      setIsPlayingAll(true);
      playEpisode(playlist[0]);
    }
  };

  // const handleEpisodeEnd = () => {
  //   if (isPlayingAll && currentIndex < playlist.length - 1) {
  //     const nextIndex = currentIndex + 1;
  //     setCurrentIndex(nextIndex);
  //     playEpisode(playlist[nextIndex]);
  //   } else {
  //     setIsPlayingAll(false);
  //   }
  // };

  if (!playlist || playlist.length === 0) {
    return (
      <div
        style={{
          color: darkMode ? darkTheme.color : lightTheme.color,
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        No content in the playlist.
      </div>
    );
  }

  return (
    <div
      style={{
        color: darkMode ? darkTheme.color : lightTheme.color,
        padding: "10px",
      }}
    >
      <h2 style={{ marginBottom: "15px", fontFamily: "Raleway" }}>
        My Playlist
      </h2>

      <div style={{ marginBottom: "15px" }}>
        <Button
          type="text"
          icon={
            <PlaySquareOutlined
              style={{
                color: darkMode ? darkTheme.color : lightTheme.color,
                fontSize: 18,
              }}
            />
          }
          style={{
            color: darkMode ? darkTheme.color : lightTheme.color,
            fontFamily: "Raleway",
            background: darkMode
              ? darkTheme.backgroundColor
              : lightTheme.backgroundColor,
            border: "1px solid #333",
          }}
          onClick={handlePlayAll}
        >
          Play All
        </Button>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={playlist}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="text"
                icon={
                  isPlaying ? (
                    <PauseCircleOutlined
                      style={{
                        color: darkMode ? darkTheme.color : lightTheme.color,
                        fontSize: 18,
                      }}
                    />
                  ) : (
                    <PlayCircleOutlined
                      style={{
                        color: darkMode ? darkTheme.color : lightTheme.color,
                        fontSize: 18,
                      }}
                    />
                  )
                }
                onClick={() => {
                  if (isPlaying) {
                    setIsPlaying(false);
                  } else {
                    playEpisode(item);
                  }
                }}
              />,
              <Button
                type="text"
                danger
                icon={<DeleteOutlined style={{ fontSize: 18 }} />}
                onClick={() => removeFromPlaylist(item.id)}
              />,
            ]}
            style={{
              borderRadius: "8px",
              padding: "8px",
              marginBottom: "10px",
              background: darkMode ? "#1a1d24" : "#fff",
              boxShadow: darkMode
                ? "0 2px 6px rgba(0,0,0,0.4)"
                : "0 2px 6px rgba(0,0,0,0.1)",
              border: "1px solid #333",
            }}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.cover} shape="square" size="large" />}
              title={
                <Text
                  strong
                  style={{
                    color: darkMode ? darkTheme.color : lightTheme.color,
                    fontFamily: "Raleway",
                  }}
                >
                  {item.title}
                </Text>
              }
              description={
                <Text
                  type="secondary"
                  ellipsis
                  style={{
                    color: darkMode ? darkTheme.color : lightTheme.color,
                    fontFamily: "Roboto",
                  }}
                >
                  Episode: {item.episode}
                </Text>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Playlist;
