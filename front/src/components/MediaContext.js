import React, { createContext, useContext, useState } from "react";

const MediaContext = createContext();

function MediaProvider({ children }) {
  const [mediaPlaying, setMediaPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  return (
    <MediaContext.Provider
      value={{
        mediaPlaying,
        setMediaPlaying,
        isPlaying,
        setIsPlaying,
        playlist,
        setPlaylist,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
}

export const useMedia = () => useContext(MediaContext);
export default MediaProvider;
