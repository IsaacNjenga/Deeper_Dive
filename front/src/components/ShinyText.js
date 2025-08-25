import { Typography } from "antd";
import "../assets/css/shinyText.css";

const { Title } = Typography;

const ShinyText = ({ text, disabled = false, speed = 3, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{ animationDuration }}
    >
      <Title
        level={2}
        style={{
          color: "#484789",
          marginBottom: 0,
          fontFamily: "Raleway",
        }}
      >
        {text}
      </Title>
    </div>
  );
};

export default ShinyText;
