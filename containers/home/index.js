"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { Categories } from '@/components/categories';
import { MoviesSection } from '@/components/movies-section';
import styles from './styles.module.css';
import 'swiper/swiper-bundle.css'; // Import Swiper's bundle CSS
import SearchComponent from '@/components/search';

const MovieImage = ({ src, alt, width, height }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  ) : null;
};

const HomeContainer = ({
  popularMovies,
  topRatedMovies,
  categories,
  selectedCategory,
}) => {
  const swiperParams = {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
      clickable: true,
    },
  };
  
  return (
    <>
        <SearchComponent /><br/>
        <h1>What do you want to watch?</h1>   
      <div>
      <Swiper {...swiperParams}>
          {topRatedMovies.slice(0, 10).map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <Link href={`/movie/${movie.id}`}>
                <div>
                 
                  <MovieImage
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={400}
                  />
                  <h3>{movie.title}</h3>
                  <p className={styles.imageNumber} >{index + 1}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
         <Categories categories={categories.slice(1, 20)} />
        {!!selectedCategory.movies.length && (
          <MoviesSection
            title={
              categories.find(({ id }) => id === +selectedCategory.id)
                ?.name
            }
            movies={selectedCategory.movies.slice(1, 11)}
          />
        )} 
        <MoviesSection
          title="Popular Films"
          movies={popularMovies.slice(1, 11)}
        />
      </div>
      <div className={styles.categoriesMain}>
        <Link href="/" className={styles.categoryMain}>
          <FaHome /> Home
        </Link>
        <Link href="/search" className={styles.categoryMain}>
          <FaUser /> Search
        </Link>
        <Link href="/watchlist" className={styles.categoryMain}>
          <FaCog /> Watchlist
        </Link>
      </div>
    </>
  );
};

export { HomeContainer };
