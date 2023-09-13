import { Card, Skeleton } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { FcGraduationCap } from 'react-icons/fc';
import Link from 'next/link';

const { Meta } = Card;

const CardGrade = ({ grade, loading }: { grade: Grade; loading: boolean }) => {
	return (
		<Card
			style={{ width: 300, marginTop: 16 }}
			actions={[
				<EditOutlined key='edit' />,
				<Link key={`${grade.id}-${grade.title}`} href={`./g/${grade.id}`}>
					Plus
				</Link>,
			]}
			className='shadow cursor-pointer duration-300 scale-95 hover:scale-100'
		>
			<Skeleton loading={loading} avatar active>
				<Meta
					avatar={<FcGraduationCap className='text-4xl' />}
					title={grade.title}
					description={
						<p className='text-sm'>
							Salaire de base:{' '}
							<span className='font-bold text-secondary-800'>
								{grade.baseSalary}
							</span>
						</p>
					}
				/>
			</Skeleton>
		</Card>
	);
};

export default CardGrade;
