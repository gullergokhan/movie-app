"use client";
import { useState } from 'react';
import { getMoviesByTitle, getSingleMovie } from "@/services/movie";
import { FaSearch } from 'react-icons/fa';
import ModalComponent from './modals';
import Image from 'next/image';
import customImage from "../../public/e4.PNG";
import Link from "next/link";
import { FaStar,FaLayerGroup,FaCalendar,FaClock } from 'react-icons/fa';

function SearchComponent() {
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await getMoviesByTitle(value);

      if (res.length === 0) {
        setNotFound(true);
        setShowModal(true);
      } else {
        setResults(res);
        setShowModal(true);

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

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="You can search for movies using this field"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          style={{ width: '80%' }}
        />
        <button type="submit" style={{ backgroundColor: '#242A32', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}>
          <FaSearch style={{ color: '#0296E5' }} />
        </button>
      </form>
      {showModal && (
        <ModalComponent closeModal={closeModal}>
          {notFound ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Image src={customImage} alt="Not Found" width={50} height={50} />
              <h2>We Are Sorry, We Cant Find The Movie</h2>
              <span>Find your movie by typing its title</span>
            </div>
          ) : (
            
            <div>
              <h2>Search Results</h2>
              {results.map((result, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              {result.poster_path && (
               <div style={{ marginRight: '20px' }}>
                 <Image src={`https://image.tmdb.org/t/p/original/${result.poster_path}`} alt={result.title} width={100} height={100} />
                         </div>
             )}
             <div>
               <h3>
                 <Link href={`/movie/${result.id}`}>
                   {result.title}
                  </Link>
                </h3>
                         <p><FaCalendar /> {new Date(result.release_date).toLocaleDateString('en-US')}</p>
                         <p><FaStar/>{result.vote_average}</p>
                <p><FaClock/> {result.runtime} minutes</p>
              </div>
            </div>
          ))}
            </div>
          )}
        </ModalComponent>
      )}
    </div>
  );
}

export default SearchComponent;