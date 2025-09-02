import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import { useAuth } from "../context/AuthContext";

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
  console.log(accessToken);

  // Load Spotify SDK and init player once token is available
  useEffect(() => {
    if (!accessToken) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: "Deeper Dive Web Player",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      setPlayer(spotifyPlayer);

      // Device ready
      spotifyPlayer.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      spotifyPlayer.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID offline", device_id);
      });

      // Track state
      spotifyPlayer.addListener("player_state_changed", (state) => {
        if (!state) return;

        setCurrentTrack(state.track_window.current_track);
        setIsPaused(state.paused);

        spotifyPlayer.getCurrentState().then((s) => {
          setIsActive(!!s);
        });
      });

      spotifyPlayer.connect();
    };

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, [accessToken]);

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
        <>
          <p>{profile.display_name}</p>
          <div className="flex flex-col items-center p-4 bg-gray-900 text-white rounded-2xl shadow-lg w-[350px]">
            <div className="flex items-center space-x-4">
              <img
                src={currentTrack.album.images[0]?.url || "/placeholder.jpg"}
                alt="Album cover"
                className="w-24 h-24 rounded-lg shadow"
              />
              <div>
                <h2 className="text-lg font-bold">{currentTrack?.name}</h2>
                <p className="text-sm text-gray-300">
                  {currentTrack?.artists[0]?.name}
                </p>
              </div>
            </div>

            {!isActive ? (
              <button
                className="mt-4 px-4 py-2 bg-green-600 rounded-full hover:bg-green-700"
                onClick={transferPlaybackHere}
              >
                Connect Web Player
              </button>
            ) : (
              <div className="flex items-center justify-center mt-6 space-x-6">
                <button
                  className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600"
                  onClick={() => player.previousTrack()}
                >
                  ⏮
                </button>
                <button
                  className="px-6 py-2 bg-green-600 rounded-full hover:bg-green-700"
                  onClick={() => player.togglePlay()}
                >
                  {isPaused ? "▶️ Play" : "⏸ Pause"}
                </button>
                <button
                  className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600"
                  onClick={() => player.nextTrack()}
                >
                  ⏭
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default WebPlayer;
