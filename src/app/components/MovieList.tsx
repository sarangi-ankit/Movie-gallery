import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDebounce } from 'use-debounce';
import { motion } from 'framer-motion';

interface MovieListProps {
    title: string;
    items: any[];
}

const MovieList: React.FC<MovieListProps> = ({ items }) => {
    const [searchText, setSearchText] = useState<string>('');
    const [debouncedSearchText] = useDebounce(searchText, 500);
    const [filterType, setFilterType] = useState<string>('All');
    const [displayedItems, setDisplayedItems] = useState<number>(10); 

    const handleFilterChange = (type: string) => {
        setFilterType(type);
    };

    const filteredItems = items.filter(item => {
        const matchesSearchText = item.Title.toLowerCase().includes(debouncedSearchText.toLowerCase());
        const matchesFilterType = filterType === 'All' || item.Type.toLowerCase() === filterType.toLowerCase();
        return matchesSearchText && matchesFilterType;
    });

    
    const loadMoreItems = () => {
        const currentItemCount = displayedItems;
        const nextItemCount = currentItemCount + 10;
        setDisplayedItems(nextItemCount);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
            ) {
                loadMoreItems();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [displayedItems]); 

    return (
        <div className="mt-8">
             <div className="relative mb-4 w-full">
                <input
                    type="text"
                    placeholder="Search Movies or TV Shows"
                    className="lg:w-1/3 md:w-1/2 w-full py-4 text-sm sm:text-base md:text-sm text-white pl-10 pr-20 bg-transparent rounded-lg border-2 border-gray-700"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
                </div>
            </div>
            <div className="relative mb-8 w-full md:w-auto mt-4 md:mt-6 lg:mt-8">
                <div className='flex lg:w-1/3 md:w-1/2 w-full lg:text-[14px] md:text-[12px] text-[10px] items-center justify-left px-8 py-2 gap-12 custom-background rounded-lg font-semibold'>
                    <div
                        onClick={() => handleFilterChange('All')}
                        className={`cursor-pointer ${filterType === 'All' ? 'bg-indigo-600 text-white rounded-lg px-4 py-2 gap-12' : 'text-gray-500'}`}
                    >
                        All
                    </div>
                    <div
                        onClick={() => handleFilterChange('movie')}
                        className={`cursor-pointer ${filterType === 'movie' ? 'bg-indigo-600 text-white rounded-lg px-4 py-2 gap-12' : 'text-gray-500'}`}
                    >
                        Movies
                    </div>
                    <div
                        onClick={() => handleFilterChange('series')}
                        className={`cursor-pointer ${filterType === 'series' ? 'bg-indigo-600 text-white rounded-lg px-4 py-2' : 'text-gray-500'}`}
                    >
                        TV Shows
                    </div>
                </div>
            </div>
            <h2 className="text-3xl font-bold mt-10 mb-4 text-gray-500">
                {filterType.toUpperCase()}{" "}
                <span className='text-sm'>({filteredItems.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.length > 0 ? (
                    filteredItems.slice(0, displayedItems).map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            className="rounded-lg overflow-hidden shadow-lg"
                        >
                            <ItemCard title={item.Title} year={item.Year} poster={item.Poster} id={item.imdbID} />
                        </motion.div>
                    ))
                ) : (
                    <h1 className='text-white'>No Items Found ...</h1>
                )}
            </div>
        </div>
    );
};

export default MovieList;
