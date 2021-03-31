import Button from '@components/Button/Button';
import InputGroup from '@components/InputGroup/InputGroup';
import { InputLabel } from '@components/InputLabel/InputLabel';
import TextField from '@components/TextField/TextField';
import axios from 'axios';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { useContactForm } from './hooks/useContactForm';

type FormProps = { className?: string };

function ContactForm({ className }: FormProps) {
	const [formMethods, textFields] = useContactForm();

	const { t } = useTranslation();
	const [error, setError] = useState<string>('');

	const onSubmit = formMethods.handleSubmit((data) => {
		axios
			.post('/api/contact', data)
			.catch(() => setError(t`contact-us:form.sent-fail`));
	});

	return (
		<form
			aria-labelledby="contact-form-title"
			onSubmit={onSubmit}
			noValidate
			className={className}
			tw="text-body pt-5 pb-10 px-5 rounded-xl bg-white shadow-card space-y-2 md:(text-2xl space-y-4 pt-10 pb-20 px-10) xl:(p-20 rounded-4xl grid grid-cols-2 gap-x-14)"
		>
			{formMethods.formState.isSubmitSuccessful ? (
				<div tw="text-h3-variants col-span-full self-center">
					<h2>{t`contact-us:submit-response.title`}</h2>
					<p tw="text-primary">{t`contact-us:submit-response.subtitle`}</p>
				</div>
			) : (
				<>
					<Trans
						i18nKey="contact-us:title"
						components={[
							<h2
								id="contact-form-title"
								key="h2"
								tw="text-h3-variants xl:col-span-full"
							/>,
							<span key="span" tw="text-primary" />,
							<br key="span" />,
						]}
					/>

					<p tw="mb-10! xl:col-span-full">{t`contact-us:subtitle`}</p>

					{error && <p tw="text-primary col-span-2">{error}</p>}

					<InputGroup error={textFields['first-name'].error}>
						<InputLabel
							isRequired
							htmlFor={textFields['first-name'].register.name}
						>
							{textFields['first-name'].labelText}
						</InputLabel>

						<TextField
							autoComplete="given-name"
							{...textFields['first-name'].register}
						/>
					</InputGroup>

					<InputGroup error={textFields['last-name'].error}>
						<InputLabel
							isRequired
							htmlFor={textFields['last-name'].register.name}
						>
							{textFields['last-name'].labelText}
						</InputLabel>

						<TextField
							autoComplete="family-name"
							{...textFields['last-name'].register}
						/>
					</InputGroup>

					<InputGroup error={textFields['email'].error}>
						<InputLabel isRequired htmlFor={textFields['email'].register.name}>
							{textFields['email'].labelText}
						</InputLabel>

						<TextField autoComplete="email" {...textFields['email'].register} />
					</InputGroup>

					<InputGroup error={textFields['subject'].error}>
						<InputLabel
							isRequired
							htmlFor={textFields['subject'].register.name}
						>
							{textFields['subject'].labelText}
						</InputLabel>

						<TextField
							autoComplete="subject"
							{...textFields['subject'].register}
						/>
					</InputGroup>

					<InputGroup error={textFields['message'].error} tw="col-span-full">
						<InputLabel htmlFor={textFields['message'].register.name}>
							{textFields['message'].labelText}
						</InputLabel>

						<TextField
							autoComplete="message"
							as="textarea"
							{...textFields['message'].register}
						/>
					</InputGroup>

					<Button variant="contain" tw="mt-5!">
						{t`contact-us:form.submit-button`}
					</Button>
				</>
			)}
		</form>
	);
}

export default ContactForm;
