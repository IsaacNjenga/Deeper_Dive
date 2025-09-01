const fetchEpisodes = async (req, res) => {
  try {
    return res.status(200).json({ message: "Episodes fetched successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { fetchEpisodes };
