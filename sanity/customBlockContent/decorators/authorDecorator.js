import React from 'react';
import { FaPen } from 'react-icons/fa';

export const authorDecorator = {
	title: 'Author',
	value: 'author',
	blockEditor: {
		icon: () => <FaPen />,
		render: ({ children }) => (
			<figcaption style={{ textAlign: 'right' }}>&ndash; {children}</figcaption>
		),
	},
};
