import React from 'react';
import { RiArticleFill } from 'react-icons/ri';
import post from '../../schemas/post';

export const internalLinkAnnotation = {
	name: 'internalLink',
	type: 'object',
	title: 'Internal Link',
	blockEditor: {
		icon: () => <RiArticleFill />,
		render: ({ children }) => (
			<span style={{ color: '#2d53fe' }}>{children}</span>
		),
	},

	fields: [
		{
			name: 'post',
			type: 'reference',
			to: [{ type: post.name }],
		},
	],
};
