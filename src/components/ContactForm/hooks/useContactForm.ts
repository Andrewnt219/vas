import useTranslation from 'next-translate/useTranslation';
import type {
	FieldError,
	UseFormRegisterReturn,
	UseFormReturn,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';

type ContactFields = {
	'first-name': string;
	'last-name': string;
	email: string;
	subject: string;
	message: string;
};

type Value = {
	labelText: string;
	error?: FieldError;
	register: UseFormRegisterReturn;
};

type TextFields = Record<keyof ContactFields, Value>;
export const useContactForm = (): [
	formMethods: UseFormReturn<ContactFields>,
	textFields: TextFields
] => {
	const formMethods = useForm<ContactFields>();
	const { register, formState } = formMethods;
	const { errors } = formState;
	const { t } = useTranslation('contact-us');

	const textFields: TextFields = {
		'first-name': {
			labelText: t('contact-us:form.first-name'),
			error: errors['first-name'],
			register: register('first-name', {
				required: t('common:form.errors.required'),
			}),
		},
		'last-name': {
			labelText: t('contact-us:form.last-name'),
			register: register('last-name', {
				required: t('common:form.errors.required'),
			}),
			error: errors['last-name'],
		},
		email: {
			labelText: t('contact-us:form.email'),
			register: register('email', {
				required: t('common:form.errors.required'),
			}),
			error: errors['email'],
		},
		message: {
			labelText: t('contact-us:form.message'),
			register: register('message', {
				required: t('common:form.errors.required'),
			}),
			error: errors['message'],
		},
		subject: {
			labelText: t('contact-us:form.subject'),
			register: register('subject', {
				required: t('common:form.errors.required'),
			}),

			error: errors['subject'],
		},
	};

	return [formMethods, textFields];
};
