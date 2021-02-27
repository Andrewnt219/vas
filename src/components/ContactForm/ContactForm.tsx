import InputGroup, { InputGroupProps } from '@components/InputGroup/InputGroup';
import React from 'react';
import type { UseFormMethods } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import 'twin.macro';

type ContactFields = {
	'first-name': string;
	'last-name': string;
	phone: string;
};
type Props = { className?: string };

function ContactForm({ className }: Props) {
	const { register, handleSubmit, errors } = useForm<ContactFields>();

	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});

	const textFields = getTextFields(register, errors);

	return (
		<form onSubmit={onSubmit} noValidate className={className}>
			{textFields.map((fieldData) => (
				<InputGroup key={fieldData.name} data={fieldData} />
			))}

			<button>Submit</button>
		</form>
	);
}

// TODO with translation, probably better to move to hooks
function getTextFields(
	register: UseFormMethods<ContactFields>['register'],
	errors: UseFormMethods<ContactFields>['errors']
): InputGroupProps<ContactFields>['data'][] {
	return [
		{
			labelText: 'First Name',
			name: 'first-name',
			error: errors['first-name'],
			register: register({ required: 'Required' }),
		},
		{
			labelText: 'Last Name',
			register: register({
				maxLength: { value: 4, message: 'Too long' },
				required: 'Required',
			}),
			name: 'last-name',
			error: errors['last-name'],
		},
	];
}

export default ContactForm;
