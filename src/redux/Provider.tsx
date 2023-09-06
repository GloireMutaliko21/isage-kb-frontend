'use client';
import { Provider } from 'react-redux';
import store from './store';
import React from 'react';

const MainProvider = ({
	children,
}: {
	children:
		| React.ReactNode
		| React.ReactNode[]
		| React.ReactElement
		| React.ReactElement[];
}) => {
	return <Provider store={store}>{children}</Provider>;
};

export default MainProvider;
