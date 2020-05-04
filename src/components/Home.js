import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import ImageSearch from './ImageSearch';
import { Link } from 'react-router-dom';

const Home = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [term, setTerm] = useState('');
  const [offset, setOffset] = useState(0);
  // const apiURL = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_APP_KEY}&q=${term}&image_type=photo&pretty=true`;
  const apiURL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_APP_KEY}`;

  useEffect(() => {
    fetch(`${apiURL}&offset=${offset}`)
      .then((res) => res.json())
      .then((json) => {
        setImages(json.data);
        setIsLoading(false);
        console.log(json);
      })
      .catch((err) => console.log(err));
  }, [offset, apiURL]);

  const loadMore = () => {
    setLoadingMore(true);
    fetch(`${apiURL}&offset=${images.length}`)
      .then((res) => res.json())
      .then((json) => {
        setImages([...images, ...json.data]);
        setIsLoading(false);
        setLoadingMore(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='container mx-auto'>
      <ImageSearch searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && (
        <h1 className='text-6xl text-center mx-auto mt-32'>No images found</h1>
      )}
      {isLoading ? (
        <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1>
      ) : (
        <div className='grid grid-cols-3 gap-4'>
          {images.map((image, index) => (
            <Link to={'/' + image.id} key={index}>
              <ImageCard image={image} />
            </Link>
          ))}
        </div>
      )}
      {loadingMore ? (
        <h1 className='text-6xl text-center mx-auto mt-32'>Loading More...</h1>
      ) : !isLoading ? (
        <div className='max-w-sm rounder text-center overflow-hidden my-10 mx-auto'>
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded'
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
