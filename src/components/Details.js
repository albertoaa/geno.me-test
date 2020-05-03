import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [images, setImages] = useState([]);
  const [isLoadind, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_APP_KEY}&id=${id}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.hits[0]);

        fetch(
          `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_APP_KEY}&order=popular&image_type=photo&pretty=true`
        )
          .then((res) => res.json())
          .then((data) => {
            setImages(data.hits);
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [id]);

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
              <Link to='/'>{'<  ' + data.user}</Link>
            </div>

            <div class="flex flex-wrap justify-center">
              <div>
                <img src={data.webformatURL} alt="..." class="shadow rounded max-w-full h-auto align-middle border-none" />
              </div>
            </div>

            <div className='m-10'>
              <Carousel
                slidesPerPage={3}
                arrows
              >
                {images.map((image, index) => (
                  <Link to={'/' + image.id}>
                    <img src={image.webformatURL} alt='' class='h-48' />
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default Details;
