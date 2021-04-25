import InputGroup from '@components/InputGroup/InputGroup';
import { InputLabel } from '@components/InputLabel/InputLabel';
import TextField from '@components/TextField/TextField';
import { percentageToHex } from '@utils/css-utils';
import { isEmail } from '@utils/validate-utils';
import useTranslation from 'next-translate/useTranslation';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import tw, { css, theme } from 'twin.macro';
import { uid } from 'uid';

const button = css`
	${tw`px-6 py-2 text-white bg-primary font-black border border-transparent transition-colors`}
	box-shadow: 0 10px 15px 0 ${theme`colors.primary` + percentageToHex(20)};

	:hover,
	:focus {
		${tw`bg-white  border-primary text-primary`}
	}

	:active {
		box-shadow: none;
	}
`;

/* -------------------------------------------------------------------------- */

export type CommentForm = {
	isSaved: boolean;
	email: string;
	name: string;
	body: string;
};
type Props = {
	className?: string;
	onFormSubmitted: (data: CommentForm, reset: () => void) => void;
};

function CommentWriter({ className, onFormSubmitted }: Props) {
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors, isSubmitting },
	} = useForm<CommentForm>();
	const [getUniqueId] = useWriterId();
	const { t } = useTranslation();
	const onSubmitted = handleSubmit((data) => {
		onFormSubmitted(data, reset);
	});

	return (
		<form className={className} noValidate onSubmit={onSubmitted} tw="">
			<InputGroup error={errors.body}>
				<InputLabel isRequired htmlFor={getUniqueId('body')}>
					Comment
				</InputLabel>
				<TextField
					id={getUniqueId('body')}
					as="textarea"
					{...register('body', { required: t('common:form.errors.required') })}
				/>
			</InputGroup>

			<InputGroup error={errors.name}>
				<InputLabel htmlFor={getUniqueId('name')} isRequired>
					Name
				</InputLabel>
				<TextField
					id={getUniqueId('name')}
					autoComplete="given-name"
					{...register('name', { required: t('common:form.errors.required') })}
				/>
			</InputGroup>

			<InputGroup error={errors.email}>
				<InputLabel htmlFor={getUniqueId('email')} isRequired>
					Email
				</InputLabel>
				<TextField
					id={getUniqueId('email')}
					autoComplete="email"
					{...register('email', {
						required: t('common:form.errors.required'),
						validate: (value) => isEmail(value) || 'Invalid email',
					})}
				/>
			</InputGroup>

			<InputGroup
				error={errors.isSaved}
				tw="flex flex-row-reverse items-baseline"
			>
				<InputLabel htmlFor={getUniqueId('isSaved')}>
					Save my name, email, and website in this browser for the next time I
					comment.
				</InputLabel>

				<input
					tw="mr-1.5"
					id={getUniqueId('isSaved')}
					type="checkbox"
					{...register('isSaved')}
				/>
			</InputGroup>

			<button css={button} disabled={isSubmitting}>
				{isSubmitting ? 'Sending' : 'Submit Comment'}
			</button>
		</form>
	);
}

const useWriterId = <T extends Record<string, any>>(): [
	getUniqueId: (id: keyof T) => string,
	writerId: string
] => {
	const [writerId, setWriterId] = useState<string>('');

	useEffect(() => {
		setWriterId(uid(8));
	}, []);

	const getUniqueId = useCallback((id: keyof T) => `${writerId}-${id}`, [
		writerId,
	]);

	return [getUniqueId, writerId];
};
export default CommentWriter;
