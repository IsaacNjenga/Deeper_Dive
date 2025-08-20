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

export const UserContext = createContext();

function App() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <UserContext.Provider value={{ isMobile, setMode, mode }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/episodes" element={<Episodes />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/guests" element={<Guests />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </UserContext.Provider>
    </>
  );
}

export default App;
