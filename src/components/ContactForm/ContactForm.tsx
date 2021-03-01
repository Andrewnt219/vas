import InputGroup, { InputGroupProps } from '@components/InputGroup/InputGroup';
import type { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import type { UseFormMethods } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import 'twin.macro';

type ContactFields = {
	'first-name': string;
	'last-name': string;
	phone: string;
};

// TODO with translation, probably better to move to hooks
function getTextFields(
	register: UseFormMethods<ContactFields>['register'],
	errors: UseFormMethods<ContactFields>['errors'],
	t: Translate
): InputGroupProps<ContactFields>['data'][] {
	return [
		{
			labelText: t('contact-us:form.first-name'),
			name: 'first-name',
			error: errors['first-name'],
			register: register({ required: t('contact-us:form.errors.required') }),
		},
		{
			labelText: t('contact-us:form.last-name'),
			register: register({
				required: t('contact-us:form.errors.required'),
			}),
			name: 'last-name',
			error: errors['last-name'],
		},
		{
			labelText: t('contact-us:form.phone'),
			register: register({
				maxLength: {
					value: 10,
					message: t('contact-us:form.errors.maxLength', { length: 10 }),
				},
				required: t('contact-us:form.errors.required'),
			}),
			name: 'phone',
			error: errors['phone'],
		},
	];
}
type Props = { className?: string };

function ContactForm({ className }: Props) {
	const { register, handleSubmit, errors } = useForm<ContactFields>();
	const { t } = useTranslation('contact-us');

	const textFields = getTextFields(register, errors, t);

	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});

	return (
		<form
			aria-labelledby="contact-form-title"
			onSubmit={onSubmit}
			noValidate
			className={className}
		>
			<h2 id="contact-form-title">We would love to hear from you</h2>

			{textFields.map((fieldData) => (
				<InputGroup key={fieldData.name} data={fieldData} />
			))}

			<button>Submit</button>
		</form>
	);
}

export default ContactForm;
