import { Input } from 'antd';

const InputComponent = ({
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
	onChange: () => any;
}) => {
	return (
		<Input
			size={size}
			name={name}
			placeholder={placeholder}
			onChange={onChange}
			prefix={prefix}
		/>
	);
};

export default InputComponent;
