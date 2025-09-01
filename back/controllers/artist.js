const artistId = "6LuN9FCkKOj5PcnpouEgny";

const artistData = async (req, res) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${req.accessToken}`,
        },
      }
    );

    const data = await response.json();
    if (response.ok) {
      res.status(200).json(data);
    } else {
      console.error("Error fetching artist data:", data);
      res.status(500).json({ message: "Error fetching artist data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { artistData };
