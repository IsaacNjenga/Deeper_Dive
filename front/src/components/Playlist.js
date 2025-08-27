import React, { useContext, useEffect } from "react";
import { darkTheme, lightTheme, UserContext } from "../App";
import { List, Avatar, Button, Typography } from "antd";
import {
  PlayCircleOutlined,
  DeleteOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import { useMedia } from "./MediaContext";

const { Text } = Typography;

function Playlist({ playlist }) {
  const { darkMode } = useContext(UserContext);
  const { setMediaPlaying, setIsPlaying, setPlaylist, isPlaying } = useMedia();

  useEffect(() => {
    const savedPlaylist = JSON.parse(localStorage.getItem("playlist"));
    if (savedPlaylist) setPlaylist(savedPlaylist);
  }, []);

  const playEpisode = (episode) => {
    setMediaPlaying(episode);
    setIsPlaying(true);
  };

  const removeFromPlaylist = (id) => {
    setPlaylist((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("playlist", JSON.stringify(updated));
      return updated;
    });
  };

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
      <h2 style={{ marginBottom: "15px" }}>My Playlist</h2>
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
                      }}
                    />
                  ) : (
                    <PlayCircleOutlined
                      style={{
                        color: darkMode ? darkTheme.color : lightTheme.color,
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
                icon={<DeleteOutlined />}
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
            }}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.cover} shape="square" size="large" />}
              title={
                <Text
                  strong
                  style={{
                    color: darkMode ? darkTheme.color : lightTheme.color,
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
