import React, { useState, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import api from "../apiService";
import MovieList from "../components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import Highlight from "../components/Highlight";
import HomeCarousel from "../components/HomeCarousel";
import PublicNavbar from "../components/PublicNavbar";

const HomePage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingHighlight, setLoadingHighlight] = useState(false);
  const [movies, setMovies] = useState([]);
  const [conf, setConf] = useState();
  const [highlightId, setHighlightId] = useState(undefined);
  const [showHighlight, setShowHighlight] = useState(false);
  const [highlightTrailer, setHighlightTrailer] = useState(undefined);
  const [genres, setGenres] = useState([]);
  const [availableGenreIds, setAvailableGenreIds] = useState(new Set());
  const [availableGenres, setAvailableGenres] = useState([]);

  const highlightMovie =
    movies && movies.filter((movie) => movie.id === highlightId)[0];

  const handleScroll = () => {
    if (window.scrollY > 400) {
      document.querySelector(".public-nav").classList.add("nav-scroll");
    } else {
      document.querySelector(".public-nav").classList.remove("nav-scroll");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await api.get("/trending/movies/week");
        const config = await api.get("/configuration");
        setMovies(data.results);
        setConf(config.images);
      } catch (error) {
        setErrorMsg(`FETCH MOVIES ERROR: ${error.message}`);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (!highlightId) return;
      setLoadingHighlight(true);

      try {
        const data = await api.get(`/movie/${highlightId}/videos`);
        try {
          const trailers = data.results.filter((video) =>
            video.type.toLowerCase().includes("trailer")
          );
          setHighlightTrailer(trailers[trailers.length - 1].key);
        } catch {
          setHighlightTrailer(undefined);
        }
      } catch (error) {
        setErrorMsg(`FETCH TRAILER ERROR: ${error.message}`);
      }

      setLoadingHighlight(false);
    };
    fetchTrailer();
  }, [highlightId]);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);

      try {
        const data = await api.get("/genre/movie/list");
        console.log("..", data.genres);
        setGenres(data.genres);
      } catch (error) {
        setErrorMsg(`FETCH GENRES ERROR: ${error.message}`);
      }

      movies &&
        setAvailableGenreIds(
          movies
            .map((movie) => movie.genre_ids)
            .reduce(
              (accumulator, currentValue) =>
                new Set([...accumulator, ...currentValue]),
              new Set()
            )
        );

      setLoading(false);
    };
    fetchGenres();
  }, [movies]);

  useEffect(() => {
    genres &&
      setAvailableGenres(
        genres.filter((genre) => availableGenreIds.has(genre.id))
      );
  }, [genres, availableGenreIds]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", function () {
      window.scrollTo(window.scrollX, window.scrollY - 50);
    });
    return () => {
      window.removeEventListener("hashchange", function () {
        window.scrollTo(window.scrollX, window.scrollY - 50);
      });
    };
  }, []);

  return (
    <>
      {!loading && conf && (
        <>
          <PublicNavbar availableGenres={availableGenres} />

          <Container fluid className="page-body">
            <HomeCarousel
              loading={loading}
              movies={movies}
              conf={conf}
              setHighlightId={setHighlightId}
              setShowHighlight={setShowHighlight}
            />
            {genres.map((genre) => (
              <MovieList
                key={genre.id}
                loading={loading}
                movies={movies}
                conf={conf}
                genre={genre}
                setHighlightId={setHighlightId}
                setShowHighlight={setShowHighlight}
              />
            ))}

            {showHighlight && !loadingHighlight && (
              <Highlight
                showHighlight={showHighlight}
                setShowHighlight={setShowHighlight}
                conf={conf}
                highlightMovie={highlightMovie}
                highlightTrailer={highlightTrailer}
                availableGenres={availableGenres}
              />
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default HomePage;
