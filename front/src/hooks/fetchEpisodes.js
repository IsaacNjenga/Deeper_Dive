import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function useFetchEpisodes() {
  const [episodes, setEpisodes] = useState([]);
  const [episodesLoading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        const res = await axios.post("podcast");
        if (res.data.success) {
          setEpisodes(res.data.episodes);
        }
      } catch (error) {
        console.log("Error fetching episodes:", error);
        const errorMessage =
          error.response?.data?.error ??
          "An unexpected error occurred. Please try again later.";
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, [refreshKey]);

  return {
    episodes,
    episodesLoading,
    episodeRefresh: () => setRefreshKey((prev) => prev + 1),
  };
}

export default useFetchEpisodes;
