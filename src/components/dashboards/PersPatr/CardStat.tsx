const CardStat = ({
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
		<div className='px-5 py-3 bg-white rounded-md flex justify-between items-center'>
			<div>
				<p className='text-[#737a87] text-sm'>{title.toLocaleUpperCase()}</p>
				<div className='flex gap-2 2xl:gap-5 items-baseline'>
					<p className='text-lg'>{value}</p>
					<p className='bg-secondary-50 text-secondary-600 text-xs px-3 py-px rounded-md'>
						{decoration}
					</p>
				</div>
			</div>
			<div className='text-slate-400 text-4xl'>{icon}</div>
		</div>
	);
};

export default CardStat;
