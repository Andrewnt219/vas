import React from 'react';
import { hrefField } from '../../fields/blockContent/href';

export const linkAnnotation = {
	title: 'URL',
	name: 'link',
	type: 'object',
	blockEditor: {
		render: ({ children }) => (
			<span style={{ color: '#e31c3d' }}>{children}</span>
		),
	},
	fields: [hrefField],
};
