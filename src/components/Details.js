import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [images, setImages] = useState([]);
  const [isLoadind, setIsLoading] = useState(true);
  const apiURL = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_GIPHY_APP_KEY;

  useEffect(() => {
    let image = {};
    fetch(`${apiURL}/${id}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((json) => {
        image = json.data;
        setData(image);
        fetch(`${apiURL}/trending?api_key=${apiKey}`)
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            setImages(json.data.filter((el) => el.id !== image.id));
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [id, apiKey, apiURL]);

  return (
    <div className='container mx-auto'>
      {!isLoadind && !data && (
        <h1 className='text-6xl text-center mx-auto mt-32'>No images found</h1>
      )}
      {isLoadind ? (
        <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1>
      ) : (
        <div className=''>
          <div className='mt-5 mb-5'>
            <Link to='/'>{'<  ' + data.title}</Link>
          </div>

          <div className='flex flex-wrap justify-center'>
            <div>
              <img
                src={`https://media.giphy.com/media/${data.id}/giphy.gif`}
                alt='...'
                className='shadow rounded max-w-full h-auto align-middle border-none'
              />
            </div>
          </div>

          <div className='m-10'>
            <Carousel slidesPerPage={3} arrows>
              {images.map((image, index) => (
                <Link to={'/' + image.id} key={index}>
                  <img
                    src={`https://media.giphy.com/media/${image.id}/giphy.gif`}
                    alt=''
                    className='h-48'
                  />
                </Link>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
