import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImageCard from './ImageCard';
import ImageSearch from './ImageSearch';
import { Link } from 'react-router-dom';

import allActions from '../state/actions';

const Home = () => {
  const images = useSelector((state) => state.images.trending);
  const loading = useSelector((state) => state.images.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.imagesActions.fetchImages(0, ''));
  }, [dispatch]);

  // const loadMore = () => {
  //   const offset = images.length;
  //   dispatch(allActions.imagesActions.fetchImages(offset, ''));
  // };

  const searchText = (text) => {
    dispatch(allActions.imagesActions.fetchImages(0, text));
  };

  return (
    <div className='mx-auto'>
      <div className='w-screen bg-gray-400 h-20 bg-purple-800 text-white text-center'>
        <span className='inline-block mt-2 text-4xl'>
          Pop<span className='text-green-400'>Gifs</span>!
        </span>
      </div>
      <ImageSearch searchText={searchText} />

      {!loading && images.length === 0 && (
        <h1 className='text-6xl text-center mx-auto mt-32'>No images found</h1>
      )}
      {loading ? (
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
      {/* {!loading ? (
        <div className='max-w-sm rounder text-center overflow-hidden my-10 mx-auto'>
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded'
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      ) : null} */}
    </div>
  );
};

export default Home;
