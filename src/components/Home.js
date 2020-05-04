import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import ImageSearch from './ImageSearch';
import { Link } from 'react-router-dom';

const Home = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const apiURL = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_GIPHY_APP_KEY;

  useEffect(() => {
    fetch(`${apiURL}/trending?api_key=${apiKey}&offset=0`)
      .then((res) => res.json())
      .then((json) => {
        setImages(json.data);
        setIsLoading(false);
        // console.log(json);
      })
      .catch((err) => console.log(err));
  }, [apiKey, apiURL]);

  const loadMore = () => {
    setLoadingMore(true);
    fetch(`${apiURL}/trending?api_key=${apiKey}&offset=${images.length}`)
      .then((res) => res.json())
      .then((json) => {
        setImages([...images, ...json.data]);
        setIsLoading(false);
        setLoadingMore(false);
      })
      .catch((err) => console.log(err));
  };

  const searchText = (text) => {
    fetch(
      text.length === 0
        ? `${apiURL}/trending?api_key=${apiKey}`
        : `${apiURL}/search?api_key=${apiKey}&q=${text}`
    )
      .then((res) => res.json())
      .then((json) => {
        setImages(json.data);
        setIsLoading(false);
        setLoadingMore(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='mx-auto'>
      <div className='w-screen bg-gray-400 h-20 bg-purple-800 text-white text-center'>
        <span className='inline-block mt-2 text-4xl'>
          Pop<span className='text-green-400'>Gifs</span>!
        </span>
      </div>
      <ImageSearch searchText={searchText} />

      {!isLoading && images.length === 0 && (
        <h1 className='text-6xl text-center mx-auto mt-32'>No images found</h1>
      )}
      {isLoading ? (
        <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1>
      ) : (
        <div className='grid grid-cols-3 gap-4 mx-20 text-center'>
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
