const episodeId = '54GtGW97GQB5PQZadgu1Wi'

const fetchEpisodes = async (req, res) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/episodes/${episodeId}`, {
      headers: {
        Authorization: `Bearer ${req.accessToken}`,
      },
    }); 
    const data = await response.json();
    if (response.ok) {
      return res.status(200).json(data);
    } else {
      console.error("Error fetching episode data:", data);
      return res.status(500).json({ error: "Error fetching episode data" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { fetchEpisodes };
