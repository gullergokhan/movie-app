"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import Image from 'next/image';
import customImage from "../../public/e3.PNG";
import { FaStar } from 'react-icons/fa';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);


  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    setWatchlist(savedMovies);
  }, []);

  const removeFromWatchlist = (movieId) => {
    const confirmation = window.confirm("Bu filmi watchlist'ten kaldırmak istediğinize emin misiniz?");
    if (confirmation) {
      const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
      setWatchlist(updatedWatchlist);
      localStorage.setItem('savedMovies', JSON.stringify(updatedWatchlist));
    } 
  };
  
 
  const displayMovies = watchlist.map((movie, index) => (
    <div className={styles.movieItem} key={index}>
      {/* <Link href={`/movie/${movie.id}`}> */}
        <div className={styles.movieContent}>
          <div className={styles.imageContainer}>
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              width={100}
              height={150}
            />
            <div className={styles.movieDetails}>
              <p>{movie.title}</p>
              <p><FaStar/> {movie.vote_average}</p>
            </div>
          </div>
          <div className={styles.deleteButton}>
            <button onClick={() => removeFromWatchlist(movie.id)}>Sil</button>
          </div>
        </div>
      {/* </Link> */}
    </div>
  ));



  return (
    <div className={styles.watchlistContainer}>
    {watchlist.length === 0 ? (
        <div className={styles.noMovies}>
       
          <div className={styles.imageContainer}>
            <Image src={customImage} alt="No Movies" width={120} height={120}  priority/>
            <p>There Is No Movie Yet!</p>
          </div>
        </div>       
     
      ) : (
        <>
           <div className={styles.movieGrid}>
          {displayMovies}
        </div>
         
        </>
      )}
    </div>
  );
}

export default Watchlist;
