import { useState, useEffect } from "react";

const KEY = "db56723f";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function FetchingMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong while fetching data!");
          const data = await res.json();
          if (data.Response === "False") throw new Error("The movie not found");

          setMovies(data.Search || []);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }

        if (query.length < 3) {
          setMovies([]);
          setError("");
          return;
        }
      }
    //   handleCloseMovie();
      FetchingMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return{movies, isLoading, error}
}
