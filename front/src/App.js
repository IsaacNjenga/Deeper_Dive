import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Episodes from "./pages/Episodes";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import Guests from "./pages/Guests";
import { AnimatePresence } from "framer-motion";
import { useMedia } from "./context/MediaContext";
import MediaPlayer from "./components/MediaPlayer";
import axios from "axios";
import WebPlayer from "./components/WebPlayer";
import Callback from "./pages/Callback";
//import Cookies from "universal-cookie";

//const cookies = new Cookies();
export const UserContext = createContext();

export const lightTheme = {
  backgroundColor: "#f2f5fa",
  color: "#090c11",
  secondary: "#85898d",
};
export const darkTheme = {
  backgroundColor: "#090c11",
  color: "#f2f5fa",
  secondary: "#85898d",
};

//const mode = cookies.get("mode");
//axios.defaults.baseURL = "http://localhost:3001/api";
axios.defaults.baseURL = "https://deeper-dive-server.vercel.app/api";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [darkMode, setDarkMode] = useState(true);
  const [currentEp, setCurrentEp] = useState(null);
  const [playlistDrawer, setPlaylistDrawer] = useState(false);

  const { setMediaPlaying, setIsPlaying } = useMedia();

  const togglePlaylistDrawer = () => {
    setPlaylistDrawer(!playlistDrawer);
  };

  const playMedia = (media) => {
    setMediaPlaying(media);
    setIsPlaying(true);
  };

  const pauseMedia = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          isMobile,
          setDarkMode,
          darkMode,
          playMedia,
          pauseMedia,
          currentEp,
          setCurrentEp,
          togglePlaylistDrawer,
          playlistDrawer,
        }}
      >
        <AnimatePresence mode="wait">
          App
          {/*<Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/episodes" element={<Episodes />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/guests" element={<Guests />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/player" element={<WebPlayer />} />
            </Route>
          </Routes>*/}
        </AnimatePresence>
        <MediaPlayer />
      </UserContext.Provider>
    </>
  );
}

export default App;
