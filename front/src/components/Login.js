import { SpotifyFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { darkTheme, lightTheme, UserContext } from "../App";

function Login() {
  const [loading, setLoading] = useState(false);
  const { darkMode } = useContext(UserContext);

  const onLogin = async () => {
    setLoading(true);
    try {
      window.location.href = "http://localhost:3001/api/auth";
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <Button
        type="primary"
        style={{
          fontFamily: "Raleway",
          background: !darkMode
            ? lightTheme.backgroundColor
            : darkTheme.backgroundColor,
          fontSize: 20,
          color: "#1cb450",
          padding: 20,
          border: "1px solid #1cb450",
        }}
        onClick={onLogin}
        loading={loading}
        icon={<SpotifyFilled style={{ color: "#1cb450", fontSize: 20 }} />}
        iconPosition="end"
      >
        {loading ? "Signing in..." : "Sign in with Spotify"}
      </Button>
    </div>
  );
}

export default Login;

//https://deeper-dive.vercel.app/?code=AQDKYNa9_8cWEcer5QSB8xHGXkpS89qQOk5lo6CzoEuq2djhunMQACclNvaIXG7J0-J5C1IEZ8Y4rskcH3_zRyS-CC63gL5LbewDQQPie-dzf7RM-ygRoxkStso44QKY_GYYsRNYhXFkNDMTdFa8DL51lcG0JhGA6l02NeKXbtMhYFMw9pYR1UfRWFgssFrcg1e4JkXqXn66KiMMzmTgBAZ4hjVAzP9flfe4huFm56swUQ&state=ETKdKuG66GXBIa1u
