'use client';
import RoleCard from '@/components/admin/RoleCard';
import PageHeader from '@/components/global/PageHeader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import useRole from '@/hooks/useRole';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';

const Roles = () => {
	const dispatch = useAppDispatch();
	const { roles, status } = useRole();
	const CreateRoleBtn = () => {
		return (
			<div className=''>
				<button
					className='bg-secondary-600 p-2 text-white rounded-md text-sm'
					onClick={() => dispatch(openModal({ modal_ID: 'NEW_ROLE' }))}
				>
					Nouveau rôle
				</button>
			</div>
		);
	};

	const CreateAccessBtn = () => {
		return (
			<div className=''>
				<button
					className='bg-secondary-600 p-2 text-white rounded-md text-sm'
					onClick={() => dispatch(openModal({ modal_ID: 'CREATE_ACCESS' }))}
				>
					Attribuer accès
				</button>
			</div>
		);
	};

	const RemoveAccessBtn = () => {
		return (
			<div className=''>
				<button
					className='bg-red-600 p-2 text-white rounded-md text-sm'
					onClick={() => dispatch(openModal({ modal_ID: 'REMOVE_ACCESS' }))}
				>
					Supprrimer accès
				</button>
			</div>
		);
	};
	return (
		<main className='flex flex-col h-full'>
			<div className='flex w-full justify-between items-center pr-5 border-b'>
				<PageHeader title='Gestion des rôles' />
				<div className='flex gap-4'>
					<CreateRoleBtn />
					<CreateAccessBtn />
					<RemoveAccessBtn />
				</div>
			</div>
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<div
						className={`${
							roles.length > 2 && 'justify-center'
						} flex justify-start flex-wrap gap-2`}
					>
						{roles.map((role) => (
							<RoleCard key={role.id} role={role} loading={status.isLoading} />
						))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default Roles;
