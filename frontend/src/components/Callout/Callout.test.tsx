import { render } from '@testing-library/react';
import React from 'react';
import Callout from './Callout';
it('should pass', () => {
	const { getByText } = render(<Callout />);
	expect(getByText('Call')).toBeInTheDocument();
});
