"use client";
import React, { useState,useEffect } from 'react';
import Image from "next/image";
import { FaStar,FaLayerGroup,FaBookmark,FaCalendar,FaClock } from 'react-icons/fa';
import {getMovieReviews,getMovieCasts}  from "@/services/movie";
import styles from "./styles.module.css";
import customImage from "../../public/e5.PNG";

function FeaturedMovie({ movie = {}}) {
  const { id, poster_path, title, overview, genres, release_date, runtime,vote_average  } = movie;
  console.log(movie);
  const [activeTab, setActiveTab] = useState('cast');
  const [castsData, setCastsData] = useState(null); 
  const [reviews, setReviews] = useState([]); 

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const fetchedCastsData = await getMovieCasts(id);
        console.log('Movie Casts:', fetchedCastsData);
        setCastsData(fetchedCastsData); 

        const fetchedReviewsData = await getMovieReviews(id);
        console.log('Movie Reviews:', fetchedReviewsData.results);
        setReviews(fetchedReviewsData.results); 
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    if (activeTab === 'cast' || activeTab === 'reviews') {
      fetchMovieData();
    }
  }, [id, activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName === activeTab ? '' : tabName);
  };

  const addToLater = () => {
    const movieData = {
      id,
      title,
      overview,
      poster_path,
      vote_average
    };

    if (typeof window !== 'undefined') {
      let savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
      savedMovies.push(movieData);
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      alert('Movie added to your list!');
    } else {
      console.log('Local storage is not supported!');
    }
  };
  const maxReviewsToShow = 3;
  return (
    <><div className={styles.movieWrapper}>
      <h1 className={styles.movieTitle}>{title}</h1>
      
      <div className={styles.additionalInfo}>
        <p><FaLayerGroup /> {genres.map(genre => genre.name).join(', ')}</p>
        <p><FaCalendar /> {new Date(release_date).toLocaleDateString('en-US')}</p>
        <p><FaClock/> {runtime} minutes</p>
        <p><FaStar/>{vote_average}</p>
      </div>
      <div className={styles.addContainer}>
        <button className={styles.addButton} onClick={addToLater}>
          <FaBookmark />
        </button>
      </div>
      <div className={styles.moviePoster}>
        <div className={styles.moviePosterOverlay}></div>
        <Image
          unoptimized
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={title}
          
          fill />
      </div>

    </div><div className={styles.categoriesMain}>
        <div className={`${styles.categoryMain} ${activeTab === 'aboutMovie' ? styles.activeTab : ''}`} onClick={() => handleTabClick('aboutMovie')}>
         About Movie
        </div>
        <div className={`${styles.categoryMain} ${activeTab === 'reviews' ? styles.activeTab : ''}`} onClick={() => handleTabClick('reviews')}>
         Reviews
        </div>
        <div className={`${styles.categoryMain} ${activeTab === 'cast' ? styles.activeTab : ''}`} onClick={() => handleTabClick('cast')}>
          Cast
        </div>
      </div><div >
        {activeTab === 'aboutMovie' && (
          <div>
            {overview}
          </div>
        )}
       {activeTab === 'reviews' && (
  <div className={styles.reviewsContainer}>
    {reviews.length > 0 ? (
      <div className={styles.reviewList}>
        {reviews.slice(0, maxReviewsToShow).map((review, index) => (
          <div key={index} className={styles.reviewCard}>
            <div className={styles.userIcon}>
              <Image src={customImage} alt="User Icon" />
            </div>
            <div className={styles.reviewContent}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>No reviews available.</p>
    )}
  </div>
)}
   {activeTab === 'cast' && castsData && (
  <div className={styles.castContainer}>
    {castsData.cast
      .filter(actor => actor.profile_path) 
      .map((actor, index) => (
        <div key={index} className={styles.castCard}>
          <div className={styles.castImage}>
            <Image
              src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
              alt={actor.name}
              width={70}
              height={70}
            />
          </div>
          <p className={styles.castName}>{actor.name}</p>
        </div>
      ))}
  </div>
)}


      </div></>
  );
}

export { FeatureMovieLoading } from "./loading";
export { FeaturedMovie };
