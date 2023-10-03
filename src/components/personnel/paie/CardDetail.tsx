import { CiBadgeDollar } from 'react-icons/ci';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';

const CardDetail = ({
	title,
	modalKey,
}: {
	title: string;
	modalKey: string;
}) => {
	const dispatch = useAppDispatch();
	return (
		<div
			onClick={() => dispatch(openModal({ modal_ID: modalKey }))}
			className='p-5 flex flex-col justify-center items-center gap-y-3 hover:border-t-4 border-t-4 hover:rounded-t border-transparent hover:border-primary-500 scale-x-95 hover:scale-x-100 hover:bg-slate-100 duration-300 shadow cursor-pointer'
		>
			<div className='text-6xl text-primary-500'>
				<CiBadgeDollar />
			</div>
			<div className='text-base text-secondary-900'>
				<p>{title}</p>
			</div>
		</div>
	);
};

export default CardDetail;
