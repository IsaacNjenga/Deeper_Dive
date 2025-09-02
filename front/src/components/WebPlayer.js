import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import { useAuth } from "../context/AuthContext";
import { Card, Typography, Button, Space, Avatar } from "antd";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  CloudSyncOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const initialTrack = {
  name: "No Track Playing",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function WebPlayer() {
  const [player, setPlayer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(initialTrack);
  const [deviceId, setDeviceId] = useState(null);
  const [profile, setProfile] = useState(null);
  const { accessToken } = useAuth();
  //console.log(accessToken);

  // Load Spotify SDK and init player once token is available
  useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;

  script.onload = () => {
    console.log("✅ Spotify SDK script loaded");
  };

  document.body.appendChild(script);

  window.onSpotifyWebPlaybackSDKReady = () => {
    const spotifyPlayer = new window.Spotify.Player({
      name: "My Web Player",
      getOAuthToken: cb => {
        cb(accessToken); // must include `streaming` scope
      },
      volume: 0.5,
    });

    // 🔴 Add all error listeners
    spotifyPlayer.addListener("initialization_error", ({ message }) => {
      console.error("❌ Initialization error:", message);
    });
    spotifyPlayer.addListener("authentication_error", ({ message }) => {
      console.error("❌ Authentication error:", message);
    });
    spotifyPlayer.addListener("account_error", ({ message }) => {
      console.error("❌ Account error:", message);
    });
    spotifyPlayer.addListener("playback_error", ({ message }) => {
      console.error("❌ Playback error:", message);
    });

    // 🟢 Ready listener
    spotifyPlayer.addListener("ready", ({ device_id }) => {
      console.log("🎉 Ready with Device ID:", device_id);
    });

    // 🔴 Not Ready listener
    spotifyPlayer.addListener("not_ready", ({ device_id }) => {
      console.warn("⚠️ Device went offline:", device_id);
    });

    spotifyPlayer.connect();
  };

  // ✅ Cleanup: remove script + disconnect player
  return () => {
    if (window.spotifyPlayer) {
      window.spotifyPlayer.disconnect();
    }
    document.body.removeChild(script);
  };
}, [accessToken]);


  //https://api.spotify.com/v1/me
  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(`me?accessToken=${accessToken}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, [accessToken]);

  console.log("id", deviceId);

  // Transfer playback to this web player and play something
  const transferPlaybackHere = async () => {
    if (!deviceId) return;

    try {
      await axios.put(
        "https://api.spotify.com/v1/me/player",
        {
          device_ids: [deviceId],
          play: true,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      // Optionally start with a specific track
      await axios.put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          uris: ["spotify:track:4uLU6hMCjMI75M1A2tKUQC"], // example track
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    } catch (err) {
      console.error("Error transferring playback:", err);
    }
  };

  return (
    <>
      {profile ? (
        <Card
          style={{
            width: 380,
            borderRadius: "16px",
            backgroundColor: "#1e1e1e",
            color: "white",
          }}
          bodyStyle={{ padding: "20px" }}
          bordered={false}
        >
          <Space align="center" size="large">
            <Avatar
              shape="square"
              size={100}
              src={currentTrack.album.images[0]?.url || "/placeholder.jpg"}
              style={{ borderRadius: "12px" }}
            />
            <div>
              <Title level={4} style={{ margin: 0, color: "white" }}>
                {currentTrack?.name}
              </Title>
              <Text type="secondary">{currentTrack?.artists[0]?.name}</Text>
            </div>
          </Space>

          {!isActive ? (
            <Button
              type="primary"
              icon={<CloudSyncOutlined />}
              shape="round"
              block
              style={{
                marginTop: "20px",
                backgroundColor: "#1DB954",
                border: "none",
              }}
              onClick={transferPlaybackHere}
            >
              Connect Web Player
            </Button>
          ) : (
            <Space
              style={{
                marginTop: "30px",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                shape="circle"
                size="large"
                icon={<StepBackwardOutlined />}
                onClick={() => player.previousTrack()}
              />
              <Button
                type="primary"
                shape="round"
                size="large"
                icon={
                  isPaused ? <PlayCircleOutlined /> : <PauseCircleOutlined />
                }
                onClick={() => player.togglePlay()}
                style={{
                  backgroundColor: "#1DB954",
                  border: "none",
                  padding: "0 25px",
                }}
              >
                {isPaused ? "Play" : "Pause"}
              </Button>
              <Button
                shape="circle"
                size="large"
                icon={<StepForwardOutlined />}
                onClick={() => player.nextTrack()}
              />
            </Space>
          )}
        </Card>
      ) : (
        <Login />
      )}
    </>
  );
}

export default WebPlayer;
