import dotenv from "dotenv";
dotenv.config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const generateString = (length) => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const spotifyAuth = async (req, res) => {
  try {
    const scope = "streaming user-read-email user-read-private";
    const state = generateString(16);

    const authParameters = new URLSearchParams({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: "https://deeper-dive.vercel.app/callback",
      state: state,
    });

    const authUrl = `https://accounts.spotify.com/authorize?${authParameters.toString()}`;
    res.redirect(authUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const spotifyCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: "https://deeper-dive.vercel.app/callback",
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      json: true,
    };

    const response = await fetch(authOptions.url, {
      method: "POST",
      headers: authOptions.headers,
      body: new URLSearchParams(authOptions.form),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, data: response.data });
    } else {
      throw new Error(data.error || "Failed to retrieve access token");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
        client_id: client_id,
        client_secret: client_secret,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error refreshing access token" });
  }
};

export { spotifyAuth, spotifyCallback, refreshToken };
