const Card = ({
	title,
	value,
	decoration,
	icon,
}: {
	title: string;
	value: string;
	decoration: React.ReactNode;
	icon: React.ReactNode;
}) => {
	return (
		<div className='px-2 py-3 bg-white rounded-md flex justify-between items-center'>
			<div>
				<p className='text-[#737a87]'>{title.toLocaleUpperCase()}</p>
				<div className='flex gap-2 items-end'>
					<p className='text-lg'>{value}</p>
					<p className='bg-secondary-200 text-xs px-1'>{decoration}</p>
				</div>
			</div>
			<div className='text-[#737a87] text-2xl'>{icon}</div>
		</div>
	);
};

export default Card;
