import Link from 'next/link';
import React from 'react';

interface ItemCardProps {
    id: string;
    title: string;
    year: string;
    poster: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ id, title, poster }) => {
    return (
        <div className="bg-gray-800 p-4 rounded shadow-md">
            <div className="flex flex-col h-full">
                <div className="flex-shrink-0">
                    <Link href={`/movies/movieDetails/${id}`}>

                        {poster !== 'N/A' && <img src={poster} alt={title} className="w-full h-[400px] rounded-lg" />}
                    </Link>
                </div>
                <div className="flex-grow flex flex-col justify-between mt-4 py-4">
                    <Link href={`/movies/movieDetails/${id}`}>
                        <p className="text-lg font-bold text-white hover:text-gray-300">
                            {title}
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
