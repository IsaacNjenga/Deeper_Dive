import  { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function useGetToken() {
  const [token, setToken] = useState("");
  const [tokenLoading, setTokenLoading] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      setTokenLoading(true);
      try {
        const res = await axios.get("/token");
        if (res.data.success) {
          setToken(res.data.accessToken);
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to retrieve token",
        });
      } finally {
        setTokenLoading(false);
      }
    };
    getToken();
  }, []);

  return { token, tokenLoading };
}

export default useGetToken;
