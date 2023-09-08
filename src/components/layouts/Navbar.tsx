import React from 'react';

const Navbar = () => {
	return (
		<div className='bg-white md:w-full w-full flex justify-between items-center p-7 border-b'>
			<div className='hidden md:flex gap-x-4 [&>.active]:border-b-4 border-white text-sm'></div>
		</div>
	);
};

export default Navbar;
