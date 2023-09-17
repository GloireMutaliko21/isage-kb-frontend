import React from 'react';

const PageHeader = ({
	title,
	actionButton,
}: {
	title: string;
	actionButton?: React.ReactNode;
}) => {
	return (
		<div className='border-b flex justify-between items-center p-5'>
			<p className='text-2xl font-semibold'>{title}</p>
			{actionButton && (
				<div className='bg-secondary-600 hover:bg-secondary-500 hover:shadow-lg duration-300 p-3 py-2 text-sm text-white rounded-md flex gap-2 justify-center items-center'>
					{actionButton}
				</div>
			)}
		</div>
	);
};

export default PageHeader;
