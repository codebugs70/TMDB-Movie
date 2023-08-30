import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { v4 } from "uuid";
import { API_KEY, API_URL, MOVIE_CARDIMG } from "../../utils/config";
import Button from "../button/Button";
import MovieItem from "./MovieItem";
/* ====================================================== */

const MovieList = ({ category }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      if (!category) return;
      const res = await axios(`${API_URL}/${category}?api_key=${API_KEY}`);
      const results = res.data.results;
      setMovies(results);
    }
    fetchMovies();
  }, [category]);

  return (
    <div>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        loop={true}
        centeredSlides={true}
        grabCursor={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {movies.length > 0 &&
          movies.map((item) => {
            return (
              <SwiperSlide key={v4()}>
                <MovieItem data={item}></MovieItem>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default MovieList;