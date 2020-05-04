import React, { useState } from 'react';

const ImageSearch = ({ searchText }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    searchText(text);
  };

  return (
    <div className='max-w-sm rounder overflow-hidden my-10 mx-auto'>
      <form onSubmit={onSubmit} className='w-full max-w-sm'>
        <div className='flex items-center border-2 border-purple-800 bg-gray-600'>
          <input
            type='text'
            placeholder='Search your interests...'
            onChange={(e) => setText(e.target.value)}
            className='appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-white'
          />
          <button
            className='flex-shrink-0 bg-purple-800 hover:bg-purple-500 border-purple-800 hover:border-purple-500 text-sm border-4 text-white py-1 px-2 rounder'
            type='submit'
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageSearch;
