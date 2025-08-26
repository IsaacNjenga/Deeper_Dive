import React, { createContext, useContext, useState } from "react";

const MediaContext = createContext();

function MediaProvider({ children }) {
  const [mediaPlaying, setMediaPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <MediaContext.Provider
      value={{ mediaPlaying, setMediaPlaying, isPlaying, setIsPlaying }}
    >
      {children}
    </MediaContext.Provider>
  );
}

export const useMedia = () => useContext(MediaContext);
export default MediaProvider;

