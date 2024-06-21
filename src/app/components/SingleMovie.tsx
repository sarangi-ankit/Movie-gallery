"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Breadcrumb from './Breadcrumb';
import Loader from './Loader';
import { motion } from 'framer-motion'; 

interface SingleMovieProps {
  imdbID: string;
}

const apiKey = '20e0eff7';

const SingleMovie: React.FC<SingleMovieProps> = ({ imdbID }) => {
  const [movieDetails, setMovieDetails] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
        const response = await axios.get(url);
        if (response.data.Response === 'True') {
          setMovieDetails(response.data);
        } else {
          console.error('Error:', response.data.Error);
        }
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setLoading(false);
      }
    };

    if (imdbID) {
      fetchMovieDetails();
    }
  }, [imdbID]);

  if (loading) {
    return <Loader />;
  }

  const breadcrumbPaths = [
    { label: 'MaileHereko', href: '/' },
    { label: 'Movies', href: '/movies' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-10 lg:p-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-64 md:h-80 lg:h-96 bg-cover bg-center relative rounded-b-lg"
        style={{ backgroundImage: `url(${movieDetails.Poster})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-b-lg"></div>
        <div className="absolute bottom-[-2rem] md:bottom-[-3rem] lg:bottom-[-4rem] left-4 md:left-8 lg:left-12 bg-gray-800 bg-opacity-75 p-4 md:p-6 lg:p-8 rounded">
          <Breadcrumb paths={breadcrumbPaths} />
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl font-bold text-white"
          >
            {movieDetails.Title}
          </motion.h1>
        </div>
      </motion.div>

      <div className="container mx-auto lg:p-20 md:p-10 p-4 flex flex-col md:flex-row mt-8">
        {movieDetails.Poster !== 'N/A' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:w-1/2 flex justify-center md:justify-start mb-4 md:mb-0"
          >
            <motion.img
              src={movieDetails.Poster}
              alt={movieDetails.Title}
              className="w-full md:w-3/4 lg:w-2/3 h-auto rounded-lg shadow-lg"
            />
          </motion.div>
        )}
        {/* Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:w-1/2 text-left mt-4 md:mt-0"
        >
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl font-bold mb-4"
          >
            {movieDetails.Title}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-4 text-sm md:text-base lg:text-lg text-gray-500"
          >
            {movieDetails.Plot}
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-2 text-sm md:text-base lg:text-lg"
          >
            <span className="text-xs md:text-sm lg:text-base px-2 py-1 bg-black text-yellow-600">
              <i className="fas fa-star"></i> {movieDetails.imdbRating}
            </span>
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-2 text-sm md:text-base lg:text-lg"
          >
            <span className="text-gray-500 text-xs md:text-sm lg:text-base">Type</span><br />
            {movieDetails.Type}
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mb-2 text-sm md:text-base lg:text-lg"
          >
            <span className="text-gray-500 text-xs md:text-sm lg:text-base">Release Date:</span><br />
            {movieDetails.Released}
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mb-2 text-sm md:text-base lg:text-lg"
          >
            <span className="text-gray-500 text-xs md:text-sm lg:text-base">Run Time</span><br />
            {movieDetails.Runtime}
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mb-2 text-sm md:text-base lg:text-lg"
          >
            <span className="text-gray-500 text-xs md:text-sm lg:text-base">Genre</span><br />
            {movieDetails.Genre}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default SingleMovie;
