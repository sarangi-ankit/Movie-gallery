"use client";

import { usePathname } from 'next/navigation';
import SingleMovie from '@/app/components/SingleMovie';

const MovieDetailsPage = () => {
  const pathname = usePathname();

 
  const pathSegments = pathname.split('/');
  const id = pathSegments[pathSegments.length - 1]; 

  console.log("path", pathname);
  console.log("id", id);

  if (!id) {
    return <p>Loading...</p>;
  }

  return <SingleMovie imdbID={id as string} />;
};

export default MovieDetailsPage;
