import InputGroup from '@components/InputGroup/InputGroup';
import axios from 'axios';
import { useContactForm } from './hooks/useContactForm';

type FormProps = { className?: string };

function ContactForm({ className }: FormProps) {
	const [formMethods, textFields] = useContactForm();

	const onSubmit = formMethods.handleSubmit((data) => {
		axios
			.post('/api/contact', data)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	});

	return (
		<form
			aria-labelledby="contact-form-title"
			onSubmit={onSubmit}
			noValidate
			className={className}
		>
			<h2 id="contact-form-title">We would love to hear from you</h2>
			<InputGroup data={textFields['first-name']} />
			<InputGroup data={textFields['last-name']} />
			<InputGroup data={textFields['email']} />
			<InputGroup data={textFields['subject']} />
			<InputGroup isTextArea data={textFields['message']} />
			<button>Submit</button>
		</form>
	);
}

export default ContactForm;
