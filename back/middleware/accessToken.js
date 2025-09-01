import dotenv from "dotenv";
dotenv.config();

const client = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;

const generateToken = async (req, res, next) => {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: client,
        client_secret: secret,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      req.accessToken = data.access_token;
      next();
    //   return res.status(200).json({ accessToken: data.access_token });
    } else {
      console.error("Error fetching access token:", data);
      return res.status(500).json({ message: "Error generating access token" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error generating access token" });
  }
};

export default generateToken;
