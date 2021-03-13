import ContactForm from '@components/ContactForm/ContactForm';
import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import MainLayout from '@layouts/MainLayout';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

const ContactUs: VFC<Props> = ({}) => {
	return (
		<MainLayout title="Contact Us" tw="" css="grid-template-rows: auto 1fr">
			<h1
				id="contact-title"
				tw=" text-h1-variants grid-p-sm text-primary font-bold mb-2 xl:(mb-0 col-start-2 col-end-6 row-span-1)"
			>
				Let&apos;s connect
			</h1>
			<div tw="hidden xl:(block top-20 relative z-10 col-span-7 row-start-2 row-end-3 self-end)">
				<EnhancedImage
					src={require('images/contact-us.png')}
					width={4072}
					height={2861}
					layout="responsive"
					lqip={require('images/contact-us.png?lqip')}
					alt="3 friends who are opens for communication"
				/>
			</div>
			<ContactForm tw="row-span-2 grid-p-sm  relative  xl:( -left-32 col-span-5 z-20 )" />
		</MainLayout>
	);
};

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw``}
`;
export default ContactUs;
