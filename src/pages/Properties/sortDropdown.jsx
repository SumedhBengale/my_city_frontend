import React, { useState } from 'react';

const SortDropdown = () => {
    const [option, setOption] = useState('p-lh');
  const [isOpen, setIsOpen] = useState(false);

    const selectOption = (option) => {
        setOption(option);
        setIsOpen(false);
    }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <button
        className='px-4 text-zinc-900 text-opacity-40 rounded-md'
        onClick={toggleDropdown}
      >
        {
            option === 'p-lh' ? 'Price(Low to High)' : option === 'p-hl' ? 'Price(High to Low)' : 'Rating(High to Low)'
        }
        {
            //Down arrow svg

            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v9.19l2.72-2.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0l-4.25-4.25a.75.75 0 111.06-1.06l2.72 2.72V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
</svg>
        }
      </button>
      {isOpen && (
        <div className='absolute top-10 right-0 w-full border border-black bg-white shadow-lg rounded-md'>
          <ul>
            <li className='px-4 py-2 hover:bg-zinc-600 hover:text-white cursor-pointer' onClick={()=>selectOption('p-lh')}>{'Price(Low to High)'}</li>
            <li className='px-4 py-2 hover:bg-zinc-600 hover:text-white cursor-pointer' onClick={()=>selectOption('p-hl')}>{'Price(High to Low)'}</li>
            <li className='px-4 py-2 hover:bg-zinc-600 hover:text-white cursor-pointer' onClick={()=>selectOption('r-hl')}>{'Price(High to Low)'}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
