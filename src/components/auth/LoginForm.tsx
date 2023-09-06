'use client';
import Image from 'next/image';
import InputComponent from '../global/Input';
import PwdInput from '../global/PwdInput';
import Link from 'next/link';
import { Divider } from 'antd';

const LoginForm = () => {
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
					<div className='text-sm w-full text-end hover:underline text-primary-900'>
						<Link href='/pwd'>Mot de passe oublié ?</Link>
					</div>
					<div>
						<button
							className='mb-6 bg-primary-900 hover:bg-primary-800 hover:shadow-md duration-300 text-white font-medium flex justify-center items-center gap-2 border w-full py-3 rounded-lg'
							// onClick={handleSubmit}
						>
							Se connecter
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
