import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import ImageSearch from './ImageSearch';
import { Link } from "react-router-dom";

const Home = () => {
  const [images, setImages] = useState([]);
  const [isLoadind, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_APP_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className='container mx-auto'>

      <ImageSearch searchText={(text) => setTerm(text)} />

      {!isLoadind && images.length === 0 && (
        <h1 className='text-6xl text-center mx-auto mt-32'>No images found</h1>
      )}
      {isLoadind ? (
        <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1>
      ) : (
          <div className='grid grid-cols-3 gap-4'>
            {images.map((image, index) => (
              <Link to={"/" + image.id}>
                <ImageCard key={index} image={image} />
              </Link>
            ))}
          </div>
        )}
    </div>
  );
}

export default Home;
