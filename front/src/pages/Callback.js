import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { darkTheme, lightTheme, UserContext } from "../App";
import axios from "axios";

function Callback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(UserContext);
  const { setAccessToken, setRefreshToken, setExpiresIn } = useAuth();

  useEffect(() => {
    const code = params.get("code");
    if (!code) return;

    // const queryParams = new URLSearchParams(location.search);
    // const code = queryParams.get("code");

    const fetchTokens = async () => {
      try {
        const { data } = await axios.post(
          "https://deeper-dive-server.vercel.app/api/callback",
          { code }
        );
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setExpiresIn(data.expires_in);
        navigate("/episodes");
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    fetchTokens();
  }, [params, navigate, setAccessToken, setRefreshToken, setExpiresIn]);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "10%",
        color: darkMode ? darkTheme.color : lightTheme.color,
      }}
    >
      Redirecting you to home...
    </div>
  );
}

export default Callback;
