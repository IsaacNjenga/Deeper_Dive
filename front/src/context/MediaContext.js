import React, { createContext, useContext, useState } from "react";

const MediaContext = createContext();

function MediaProvider({ children }) {
  const [mediaPlaying, setMediaPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  const playEpisode = (episode) => {
    setMediaPlaying(episode);
    setIsPlaying(true);
  };

  return (
    <MediaContext.Provider
      value={{
        mediaPlaying,
        setMediaPlaying,
        isPlaying,
        setIsPlaying,
        playlist,
        setPlaylist,
        currentIndex,
        setCurrentIndex,
        isPlayingAll,
        setIsPlayingAll,
        playEpisode,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
}

export const useMedia = () => useContext(MediaContext);
export default MediaProvider;
