'use client';

import { useRef, useState } from 'react';
import { Button, Input, Modal, Form, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { createAgent } from '@/redux/agents/agents.slice';
import useGrades from '@/hooks/useGrades';
import Image from 'next/image';
import { BiSolidImageAdd } from 'react-icons/bi';

const CreateAgent = ({ handlers }: { handlers: ModalsHandlers }) => {
	const inputImage = useRef(null);
	const [profilImage, setProfileImage] = useState<File>();
	const handleChangeImage = (e: any) => {
		setProfileImage(e.target.files[0]);
	};

	const dispatch = useAppDispatch();

	const { grades, status } = useGrades();

	const onSubmit = (values: any) => {
		const { phone, address, other, engagDate, birthDate, file, ...rest } =
			values;
		dispatch(
			createAgent({
				contacts: { phone, address, other },
				engagDate: new Date(engagDate.$d),
				file: profilImage,
				birthDate: new Date(birthDate.$d),
				...rest,
			})
		);
	};

	return (
		<Modal
			open={true}
			centered
			title='Nouvel agent'
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form onFinish={onSubmit} layout='vertical'>
				<div className='flex gap-5 w-full justify-between flex-wrap'>
					<Form.Item
						name='email'
						label='Adresse mail'
						rules={[{ required: true, type: 'email', message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Input size='small' placeholder='gloire@isagekb.com' />
					</Form.Item>
					<Form.Item
						name='names'
						label='Nom complet'
						rules={[
							{
								required: true,
								type: 'string',
								min: 9,
								message: '',
							},
						]}
						style={{ marginBottom: '6px' }}
					>
						<Input size='small' placeholder='Gloire Salva Mutaliko' />
					</Form.Item>
				</div>
				<div className='flex gap-5 w-full justify-between flex-wrap'>
					<Form.Item
						name='matricule'
						label='Numéro matricule'
						rules={[{ required: true, type: 'string', min: 9, message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Input size='small' placeholder='846-377-836N' />
					</Form.Item>
					<Form.Item
						name='function'
						label='Fonction'
						rules={[{ required: true, type: 'string', min: 2, message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Input size='small' placeholder='Ex. Enseignant' />
					</Form.Item>
				</div>
				<div className='flex gap-5 w-full justify-between flex-wrap'>
					<Form.Item
						name='sex'
						label='Sexe'
						rules={[{ required: true, type: 'string', message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Select
							placeholder='Choisir le sexe'
							size='small'
							optionLabelProp='label'
							options={[
								{ label: 'Féminin', value: 'Féminin' },
								{ label: 'Masculin', value: 'Masculin' },
							]}
							className='!w-[205px]'
						/>
					</Form.Item>
					<Form.Item
						name='status'
						label="Statut de l'agent"
						rules={[{ required: true, type: 'string', min: 5, message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Input size='small' placeholder='Permanent ou visiteur' />
					</Form.Item>
				</div>
				<div className='flex gap-5 w-full justify-between flex-wrap'>
					<Form.Item
						name='birthDate'
						label='Date de naissance'
						rules={[{ required: true, type: 'date', message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<DatePicker
							disabledDate={(current) => {
								return current > dayjs().subtract(20, 'year');
							}}
							className='!w-[205px]'
							size='small'
							placeholder='Sélectionner la date'
						/>
					</Form.Item>
					<Form.Item
						name='engagDate'
						label="Date d'engagement"
						rules={[{ required: true, type: 'date', message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<DatePicker
							className='!w-[205px]'
							size='small'
							placeholder='Sélectionner la date'
						/>
					</Form.Item>
				</div>
				<div className='flex gap-5 w-full justify-between flex-wrap'>
					<Form.Item
						name='acadTitle'
						label='Titre académique'
						rules={[{ required: true, type: 'string', min: 5, message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Input size='small' placeholder='ESU CT, ESU Ass ...' />
					</Form.Item>
					<Form.Item
						name='sifa'
						label='Numéro SIFA'
						rules={[{ required: true, message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Input size='small' placeholder='Ex. 204' />
					</Form.Item>
				</div>
				<div>
					<Form.Item
						name='gradeId'
						label='Grade'
						rules={[{ required: true, message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Select
							placeholder='Sélectionner un grade'
							optionLabelProp='label'
							options={grades.map((grade) => ({
								value: grade.id,
								label: grade.title,
							}))}
							size='small'
						/>
					</Form.Item>
				</div>
				<div>
					<Form.Item label='Contacts' style={{ marginBottom: '6px' }}>
						<div className='flex gap-2 flex-wrap lg:flex-nowrap'>
							<Form.Item
								name='phone'
								rules={[{ min: 10, message: '' }]}
								style={{ marginBottom: '6px' }}
							>
								<Input size='small' placeholder='Téléphone' />
							</Form.Item>
							<Form.Item
								name='address'
								rules={[{ min: 10, message: '' }]}
								style={{ marginBottom: '6px' }}
							>
								<Input size='small' placeholder='Adresse' />
							</Form.Item>
							<Form.Item
								name='other'
								rules={[{ min: 10, message: '' }]}
								style={{ marginBottom: '6px' }}
							>
								<Input size='small' placeholder='Autre' />
							</Form.Item>
						</div>
					</Form.Item>
				</div>
				<div>
					<Form.Item name='file' label='Photo de profil'>
						<div
							className={`flex justify-center items-center w-24 h-24 border border-dashed border-slate-400 bg-gray-200 rounded cursor-pointer`}
							//@ts-ignore
							onClick={() => inputImage.current?.click()}
						>
							<div className={`'relative'`}>
								{profilImage && (
									<Image
										width={100}
										height={100}
										src={
											profilImage
												? URL.createObjectURL(profilImage)
												: '/images/logo.png'
										}
										alt=''
										className='object-cover h-20 w-20'
									/>
								)}
								<div className='bg-black/10 w-24 h-24 absolute top-0 left-0 flex justify-center items-center'>
									<BiSolidImageAdd className='text-2xl text-cyan-950' />
								</div>
							</div>
						</div>
						<div className='!hidden'>
							<input
								type='file'
								hidden
								ref={inputImage}
								onChange={handleChangeImage}
							/>
						</div>
					</Form.Item>
				</div>
				<Form.Item style={{ marginBottom: '6px' }}>
					<div className='flex justify-end w-full gap-4'>
						<Button size='middle' onClick={() => handlers.close!('NEW_AGENT')}>
							Annuler
						</Button>
						<Button htmlType='submit' loading={status.isLoading}>
							Soumettre
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CreateAgent;
