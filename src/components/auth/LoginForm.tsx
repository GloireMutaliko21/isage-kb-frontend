'use client';
import Image from 'next/image';
import InputComponent from '../global/Input';
import PwdInput from '../global/PwdInput';
import Link from 'next/link';

const LoginForm = () => {
	return (
		<section className='flex flex-col gap-y-8 w-full lg:w-1/2'>
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
				<h1 className='font-bold text-4xl'>Bienvenue !</h1>
				<p className='font-extralight'>Connectez-vous pour commencer</p>
			</div>
			<div>
				<form action='' className='flex flex-col gap-3'>
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
							onChange={() => {}}
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
							onChange={() => {}}
						/>
					</div>
					<div className='text-sm w-full text-end hover:underline text-primary-800'>
						<Link href='/pwd'>Mot de passe oublié ?</Link>
					</div>
				</form>
			</div>
		</section>
	);
};

export default LoginForm;
