import ContactForm from '@components/ContactForm/ContactForm';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

const ContactUs: VFC<Props> = ({}) => {
	return (
		<Container>
			<h1 id="contact-title">Let&apos;s connect</h1>
			<ContactForm />
		</Container>
	);
};

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw``}
`;
export default ContactUs;
