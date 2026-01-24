import { useEffect, useState } from "react";
function useFetch(url, method = "GET") {
  let [data, setData] = useState(null);
  let [postData, setPostData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;

    let option = {
      signal,
      method,
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    let fetchData = () => {
      fetch(url, option)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setError(null);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    };

    if (method === "POST" && postData) {
      option = {
        ...option,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      };
      fetchData();
    } else if (method === "GET") {
      fetchData();
    }

    return () => {
      abortController.abort();
    };
  }, [url, postData, method]);
  return { setPostData, data, loading, error };
}

export default useFetch;
