"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import MovieList from '../components/MovieList';

const apiKey = "20e0eff7"

const fetchData = async (searchTerm: string, page: number = 1) => {
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&page=${page}&apikey=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.Response === 'True') {
      return response.data.Search;
    } else {
      console.error('Error:', response.data.Error);
      return [];
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

const fetchAllPages = async (searchTerm: string, maxPages: number = 5) => {
  const results = [];
  for (let page = 1; page <= maxPages; page++) {
    const pageResults = await fetchData(searchTerm, page);
    if (pageResults.length === 0) break;
    results.push(...pageResults);
  }
  return results;
};

const Movies: React.FC = () => {
  const [allData, setAllData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const searchTerms = ['avenger', 'friends', 'loki', 'sanchi', 'star wars'];
    const maxPages = 5;
    const dataPromises = searchTerms.map(term => fetchAllPages(term, maxPages));

    const fetchAllData = async () => {
      const data = (await Promise.all(dataPromises)).flat();
      setAllData(data);
      setLoading(false);
    };

    fetchAllData();
  }, []);
  // console.log("alldata",allData)
  return (
    <div className="min-h-screen flex flex-col items-left justify-left bg-gray-900 text-white lg:p-20 md:p-16 p-10">
      <div className='mt-6'>
        <h1 className="text-5xl font-bold mb-4">MaileHereko</h1>
        <p className="text-sm text-left max-w-lg text-gray-400">
          List of movies and TV shows I, Pramod Poudel, have watched to date.
          <br />
          Explore what I have watched and also feel free to make a suggestion.
        </p>
      </div>
     
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MovieList title="All" items={allData} />
        </div>
      )}
    </div>
  );
};

export default Movies;
