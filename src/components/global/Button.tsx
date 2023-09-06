import { Button } from 'antd';

const ButtonComponent = ({
	label,
	type,
	onClick,
}: {
	label: string;
	type?: any;
	onClick: () => void;
}) => {
	return (
		<Button
			type={type}
			onClick={onClick}
			className='bg-primary-900 hover:shadow-xl'
		>
			{label}
		</Button>
	);
};

export default ButtonComponent;
