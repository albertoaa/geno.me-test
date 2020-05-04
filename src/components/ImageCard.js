import React from 'react';

const ImageCard = ({ image }) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg relative'>
      <img
        src={`https://media.giphy.com/media/${image.id}/giphy.gif`}
        alt=''
        className='w-full'
      />
      <div className='absolute bottom-0 right-0 text-right px-2 font-bold text-xl bg-gray-800 text-white'>
        {image.title}
      </div>
    </div>
  );
};

export default ImageCard;
