import ContactForm from '@components/ContactForm/ContactForm';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

const ContactUs: VFC<Props> = ({}) => {
	return (
		<Container>
			<ContactForm />
		</Container>
	);
};

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw``}
`;
export default ContactUs;
