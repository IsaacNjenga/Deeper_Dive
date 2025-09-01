import dotenv from "dotenv";
dotenv.config();

const podId = process.env.POD_ID;

const podcastData = async (req, res) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/shows/${podId}`, {
      headers: {
        Authorization: `Bearer ${req.accessToken}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      res.status(200).json({ success: true, episodes: data.episodes });
    } else {
      console.error("Error fetching podcast data:", data);
      res.status(500).json({ message: "Error fetching podcast data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { podcastData };
