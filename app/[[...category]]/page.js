import React from "react";
import { HomeContainer } from "@/containers/home";

import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchGenres,
  fetchMoviesByGenre,
} from "@/services/movie";
 const API_URL ='https://api.themoviedb.org/3'

//  const getPopularMovies=async () => {
//    const rest = await fetch(`${API_URL}/movie/top_rated?api_key=${process.env.THE_MOVIE_DB_API_KEY}&page=1`);
//   const data=await rest.json()
//   console.log(data);

//  };


async function HomePage({ params }) {
  const pagePromises = [
    fetchPopularMovies(),
    fetchTopRatedMovies(),
    fetchGenres(),
  ];
  // await getPopularMovies();

  if (!!params.category?.length) {
    pagePromises.push(fetchMoviesByGenre(params.category[0]));
  }

  const [popularMovies, topRatedMovies, genres, selectedCategoryMovies] =
    await Promise.all(pagePromises);

  return (
    <HomeContainer
      categories={genres}
      popularMovies={popularMovies}
      topRatedMovies={topRatedMovies}
      selectedCategory={{
        id: params.category?.[0] ?? "",
        movies: selectedCategoryMovies ?? [],
      }}
    />
  );
}

export default HomePage;