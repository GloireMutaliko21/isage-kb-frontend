'use client';
import Image from 'next/image';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import InputComponent from '../global/Input';
import PwdInput from '../global/PwdInput';
import Link from 'next/link';
import { Divider } from 'antd';
import type { InputRef } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { loginUser } from '@/redux/auth/auth.slice';
import useAuth from '@/hooks/useAuh';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
	const dispatch = useAppDispatch();

	const [data, setData] = useState({
		email: '',
		password: '',
	});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		const { email, password } = data;

		const payload = {
			email,
			password,
		};

		dispatch(loginUser(payload));
	};
	const handleChange = (e: any) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	// Account Verification
	const { user } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (user.session || localStorage.getItem('session-user')) router.push('/');
	});

	return (
		<section className='flex flex-col gap-y-8 w-full md:px-10 2xl:px-24 py-0 md:py-6 2xl:py-14'>
			<div className='mb-6'>
				<div className='w-12 h-12'>
					<Image
						src='/images/logo.png'
						alt='Logo'
						width={500}
						height={500}
						className='w-full h-full object-cover'
					/>
				</div>
			</div>

			<div className='leading-loose'>
				<h1 className='font-extrabol text-4xl text-primary-900'>
					Connectez-vous ici !
				</h1>
				<p className='font-extralight'>
					Saisissez vos identifiants pour commencer
				</p>
			</div>

			<div>
				<form className='flex flex-col gap-3' onSubmit={submit}>
					<div>
						<div className='mb-1'>
							<label htmlFor='' className='font-semibold'>
								<span>Email</span>
								<span className='text-red-600 text-2xl'>*</span>
							</label>
						</div>
						<InputComponent
							size='large'
							name='email'
							placeholder='user@isagekb.com'
							onChange={handleChange}
						/>
					</div>
					<div>
						<div className='mb-1'>
							<label htmlFor='' className='font-semibold'>
								<span>Mot de passe</span>
								<span className='text-red-600 text-2xl'>*</span>
							</label>
						</div>
						<PwdInput
							size='large'
							name='password'
							placeholder='******'
							onChange={handleChange}
						/>
					</div>
					<div className='text-sm w-full text-end hover:underline text-primary-900'>
						<Link href='/pwd'>Mot de passe oublié ?</Link>
					</div>
					<div>
						<button
							className='mb-6 bg-primary-900 hover:bg-primary-800 hover:shadow-md duration-300 text-white font-medium flex justify-center items-center gap-2 border w-full py-3 rounded-lg'
							// onClick={handleSubmit}
						>
							{user.status.isLoading ? (
								<span
									hidden={user.status.isLoading}
									className='w-6 h-6 inline-block animate-spin border border-transparent border-t-neutral-200 rounded-full'
								/>
							) : (
								<span className='h-6'>Se connecter</span>
							)}
						</button>
					</div>
				</form>
			</div>

			<div>
				<Divider></Divider>
				<div className='flex justify-center text-center text-sm gap-1'>
					<p>Vous n&apos;avez pas de compte ? </p>
					<Link
						href='/requestAccount'
						className='hover:underline text-primary-900'
					>
						Contactez un admin
					</Link>
				</div>
			</div>
		</section>
	);
};

export default LoginForm;
