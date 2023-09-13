import React from 'react';

const singlegrade = ({ params }: { params: { id: string } }) => {
	return <div>{params.id}</div>;
};

export default singlegrade;
