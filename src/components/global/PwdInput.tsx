import { Input } from 'antd';

const PwdInput = ({
	size,
	placeholder,
	name,
	prefix = <></>,
	onChange,
}: {
	size: any;
	placeholder: string;
	name: string;
	prefix?: React.ReactNode | React.ReactElement;
	onChange: any;
}) => {
	return (
		<Input.Password
			size={size}
			name={name}
			placeholder={placeholder}
			onChange={onChange}
			prefix={prefix}
		/>
	);
};

export default PwdInput;
