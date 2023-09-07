'use client';
import type { CollapseProps } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { BiHome } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { RxDashboard } from 'react-icons/rx';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
	{
		key: '1',
		label: (
			<div className='flex gap-2 items-center justify-between text-[#737a87] hover:bg-secondary-50 py-2 -my-1 rounded-md px-2'>
				<div className='flex gap-2 items-center text-[#737a87]'>
					<BiHome className='text-xl' />
					<span className='text-sm'>Home</span>
				</div>
				<div>
					<IoIosArrowDown className='text-lg' />
				</div>
			</div>
		),
		children: <p>{text}</p>,
		showArrow: false,
		// style: { marginRight: -10, marginLeft: -5, marginBottom: 0 },
	},
	{
		key: '2',
		label: (
			<div className='flex gap-2 items-center justify-between text-[#737a87] hover:bg-secondary-50 py-2 -my-1 rounded-md px-2'>
				<div className='flex gap-2 items-center text-[#737a87]'>
					<RxDashboard className='text-lg' />
					<span className='text-sm'>Components</span>
				</div>
				<div>
					<IoIosArrowDown className='text-lg' />
				</div>
			</div>
		),
		children: <p>{text}</p>,
		showArrow: false,
		// style: { marginRight: -10, marginLeft: -5 },
	},
	{
		key: '3',
		label: (
			<div className='flex gap-2 items-center justify-between text-[#737a87] hover:bg-secondary-50 py-2 -my-1 rounded-md px-2'>
				<div className='flex gap-2 items-center text-[#737a87]'>
					<RxDashboard className='text-lg' />
					<span className='text-sm'>Components</span>
				</div>
				<div>
					<IoIosArrowDown className='text-lg' />
				</div>
			</div>
		),
		children: <p>{text}</p>,
		showArrow: false,
		// style: { marginRight: -10, marginLeft: -5 },
	},
];

const Sidebar = () => {
	const icon = ({ isActive }: any) => {
		// 'use server';
		return <CaretRightOutlined rotate={isActive ? 90 : 0} />;
	};
	return (
		<div className='h-screen z-10 w-80 bg-white overflow-y-auto relative py-2 border-r'>
			<Collapse
				ghost={true}
				accordion
				items={items}
				bordered={false}
				size='small'
				// expandIconPosition='end'
				// expandIcon={({
				// 	isActive,
				// 	style = {
				// 		fontSize: '16px',
				// 		// backgroundColor: 'red',
				// 		color: '#737a87',
				// 	},
				// 	className = `${isActive && '-rotate-180 duration-300'} `,
				// }) => <IoIosArrowDown style={style} className={className} />}
			/>
		</div>
	);
};

export default Sidebar;
