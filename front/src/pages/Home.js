import React, { useContext } from "react";
import Motion from "../components/motion.js";
import { Tag, Typography } from "antd";
import { UserContext } from "../App.js";

const { Title, Text } = Typography;
function Home() {
  const { isMobile } = useContext(UserContext);
  return (
    <>
      <Motion>
        <div style={{ margin: "20px 5px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 10,
              margin: "0 10px",
            }}
          >
            <div style={{ width: isMobile ? "100%" : "70%" }}>
              <Tag style={{ borderRadius: 15, background: "#f4f8ff" }}>
                New episode every other Friday
              </Tag>
              <Title style={{ color: "white", fontWeight: 800, fontSize: 60 }}>
                Go beyond the headlines.{" "}
                <span style={{ color: "#ed0141" }}>Dive Deeper</span> into the
                ideas shaping life & work
              </Title>
              <Text type="secondary" style={{ fontSize: 20, color: "#85898d" }}>
                Long- form conversations hosted by Jeremy Nyabila — with
                founders, artists, scientists and leaders across Africa and the
                world
              </Text>
            </div>
            <div
              style={{
                background: "whitesmoke",
                width: "40%",
                borderRadius: 12,
              }}
            >
              media player here
            </div>
          </div>
        </div>
      </Motion>
    </>
  );
}

export default Home;
