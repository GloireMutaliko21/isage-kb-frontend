'use client';
import { useSearchParams } from 'next/navigation';
import { Button, Form, Input } from 'antd';
import { AiFillLock } from 'react-icons/ai';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { defineUserPwd } from '@/redux/auth/auth.slice';

const Page = () => {
	const { status } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const searchParams = useSearchParams();
	const token = searchParams.get('t');

	const [form] = Form.useForm();

	const onSubmit = (values: any) => {
		const { username, password, confirmPassword } = values;
		dispatch(
			defineUserPwd({
				confirmPassword,
				password,
				username,
				token: token!,
				form,
			})
		);
	};

	return (
		<div className='h-screen w-full flex items-center justify-center bg-slate-50'>
			<div className='bg-white p-2 lg:px-16 lg:py-12 border rounded-xl'>
				<h1 className='text-secondary-600 font-black'>ISAGE-KB</h1>
				<div className='my-6'>
					<p className='text-slate-800 font-bold text-2xl mb-2'>
						Mots de passe !
					</p>
					<p className='text-slate-600 font-light text-xs'>
						Bienvenue, Définissez votre mot de passe ou{' '}
						<Link
							href={'/login'}
							className='text-secondary-600 font-semibold underline'
						>
							Connectez-vous
						</Link>
					</p>
				</div>
				<div className='mt-5 w-full'>
					<Form onFinish={onSubmit} layout='vertical' form={form}>
						<Form.Item
							name='username'
							label="Nom d'utilisateur"
							rules={[{ required: true, type: 'string', min: 9, message: '' }]}
							style={{ marginBottom: '6px' }}
						>
							<Input placeholder='GloireSalva123' />
						</Form.Item>
						<Form.Item
							name='password'
							label='Mot de passe'
							rules={[{ required: true, type: 'string', min: 9, message: '' }]}
							style={{ marginBottom: '6px' }}
						>
							<Input.Password
								prefix={<AiFillLock className='text-lg text-gray-500 mr-2' />}
								placeholder='*********'
							/>
						</Form.Item>
						<Form.Item
							name='confirmPassword'
							label='Confirmer mot de passe'
							rules={[{ required: true, type: 'string', min: 9, message: '' }]}
						>
							<Input.Password
								prefix={<AiFillLock className='text-lg text-gray-500 mr-2' />}
								placeholder='*********'
							/>
						</Form.Item>
						<Form.Item style={{ marginBottom: '6px' }}>
							<Button
								htmlType='submit'
								loading={status.isLoading}
								className='!bg-secondary-700 !text-white !w-full !border-none hover:!shadow-lg hover:!bg-secondary-500'
							>
								Soumettre
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Page;
