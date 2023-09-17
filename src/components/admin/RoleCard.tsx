import { useAppDispatch } from '@/hooks/useAppDispatch';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';
import { getRoleById } from '@/redux/roles/role.slice';
import { Card, Skeleton } from 'antd';
import { LiaUserLockSolid } from 'react-icons/lia';

const { Meta } = Card;
const RoleCard = ({ role, loading }: { role: Role; loading: boolean }) => {
	const dispatch = useAppDispatch();

	return (
		<Card
			style={{ width: 300 }}
			actions={[
				<button
					key={`${role.id}-${role.title}`}
					onClick={() => {
						dispatch(getRoleById(role.id));
						dispatch(openModal({ modal_ID: 'NEW_ROLE' }));
					}}
				>
					Modifier
				</button>,
				<button
					key={`${role.id}-${role.createdAt}`}
					onClick={() => {
						dispatch(getRoleById(role.id));
						dispatch(openModal({ modal_ID: 'ROLE_DETAILS' }));
					}}
				>
					Détails
				</button>,
			]}
			size='default'
			className='shadow cursor-pointer duration-300 scale-95 hover:scale-100'
		>
			<Skeleton loading={loading} avatar active>
				<Meta
					avatar={<LiaUserLockSolid className='text-3xl text-slate-500' />}
					title={<p className='capitalize text-slate-600'>{role.title}</p>}
				/>
			</Skeleton>
		</Card>
	);
};

export default RoleCard;
