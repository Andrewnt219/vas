import FormGroup from '@components/FormGroup/FormGroup';
import { InputLabel } from '@components/InputLabel/InputLabel';
import TextField from '@components/TextField/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';
import 'twin.macro';

type FieldValues = {
	'first-name': string;
};
type Props = { className?: string };

function ContactForm({ className }: Props) {
	const { register, handleSubmit, errors } = useForm<FieldValues>();

	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});

	return (
		<form onSubmit={onSubmit} noValidate>
			<FormGroup error={errors['first-name']}>
				<InputLabel htmlFor="first-name">First Name</InputLabel>

				<TextField
					name="first-name"
					ref={register({ required: 'This field is required' })}
				/>
			</FormGroup>
			<button>Submit</button>
		</form>
	);
}

export default ContactForm;
