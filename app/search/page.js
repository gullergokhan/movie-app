"use client";import { useState } from 'react';
import { getMoviesByTitle, getSingleMovie } from "@/services/movie";
import { FaBookmark, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import customImage from "../../public/e4.PNG";
import Link from "next/link";
import { FaStar, FaCalendar, FaClock,FaHome,FaUser,FaCog } from 'react-icons/fa';
import styles from './styles.module.css'

function SearchPage() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await getMoviesByTitle(value);

      if (res.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);

        const detailedResults = await Promise.all(
          res.map(async (result) => {
            try {
              const detailedMovie = await getSingleMovie(result.id);
              return detailedMovie;
            } catch (error) {
              console.error("Error fetching detailed movie information:", error);
              return null;
            }
          })
        );

        setResults(detailedResults.filter(result => result && result.poster_path));
      }
    } catch (error) {
      console.error("Error happened while fetching movies by title", error);
    }
  };

  return (
    <><div>
      <form action="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="You can search for movies using this field"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          style={{ width: '80%' }} />
        <button type="submit" style={{ backgroundColor: '#242A32', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}>
          <FaSearch style={{ color: '#0296E5' }} />
        </button>
      </form>
      {notFound ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
          <Image src={customImage} alt="Not Found" width={50} height={50} />
          <h2>We Are Sorry, We Could not Find The Movie</h2>
          <span>Please try searching for a different movie title</span>
        </div>
      ) : (
        <div>
          <h2>Search Results</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {results.map((result, index) => (
              <div key={index} style={{ width: 'calc(33.33% - 20px)', margin: '10px', border: '1px solid #0296E5', borderRadius: '5px', padding: '10px', boxSizing: 'border-box', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  {result.poster_path && (
                    <div style={{ marginRight: '20px' }}>
                      <Link href={`/movie/${result.id}`}>
                        <Image src={`https://image.tmdb.org/t/p/original/${result.poster_path}`} alt={result.title} width={100} height={100} />
                      </Link>
                    </div>
                  )}
                  <div>
                    <h3>
                      <Link href={`/movie/${result.id}`}>
                        {result.title}
                      </Link>
                    </h3>
                    <p><FaCalendar /> {new Date(result.release_date).toLocaleDateString('en-US')}</p>
                    <p><FaStar />{result.vote_average}</p>
                    <p><FaClock /> {result.runtime} minutes</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div><div className={styles.categoriesMain} >
        <Link href="/" className={styles.categoryMain}>
          <FaHome /> Home
        </Link>
        <Link href="/search" className={styles.categoryMain}>
          <FaSearch /> Search
        </Link>
        <Link href="/watchlist" className={styles.categoryMain}>
          <FaBookmark/> Watchlist
        </Link>
      </div></>
);
}

export default SearchPage;
