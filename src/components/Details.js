import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import allActions from '../state/actions';

const Details = () => {
  let { id } = useParams();
  const images = useSelector((state) => state.images.trending);
  const filteredImages = images.filter((image) => image.id !== id);
  const selectedImage = images.filter((image) => image.id === id)[0];
  const dispatch = useDispatch();

  useEffect(() => {
    if (images.length === 0) {
      console.log('fetching images');
      dispatch(allActions.imagesActions.fetchImages(0, ''));
    }
  }, [dispatch]);

  return (
    <div className='mx-auto'>
      <div className='w-screen bg-gray-400 h-20 bg-purple-800 text-white text-center'>
        <span className='inline-block mt-2 text-4xl'>
          Pop<span className='text-green-400'>Gifs</span>!
        </span>
      </div>
      {images.length > 0 ? (
        <div className=''>
          <div className='mt-5 mb-5'>
            <Link to='/'>{'<  ' + selectedImage.title}</Link>
          </div>

          <div className='flex flex-wrap justify-center'>
            <div>
              <img
                src={`https://media.giphy.com/media/${selectedImage.id}/giphy.gif`}
                alt='...'
                className='shadow rounded max-w-full h-auto align-middle border-none'
              />
            </div>
          </div>

          <div className='m-10'>
            <Carousel slidesPerPage={3} arrows>
              {filteredImages.map((image, index) => (
                <Link to={'/' + image.id} key={index}>
                  <div className='max-w-sm rounded overflow-hidden shadow-lg relative'>
                    <img
                      src={`https://media.giphy.com/media/${image.id}/giphy.gif`}
                      alt=''
                      className='h-48'
                    />
                    <div className='absolute bottom-0 right-0 text-right px-2 font-bold text-sm bg-gray-800 text-white'>
                      {image.title}
                    </div>
                  </div>
                </Link>
              ))}
            </Carousel>
          </div>
        </div>
      ) : (
        <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1>
      )}
    </div>
  );
};

export default Details;
