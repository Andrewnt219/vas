import { Response } from '@api-response';
import sgMail from '@lib/sendgrid';
import { MailDataRequired } from '@sendgrid/mail';
import { NextApiHandler } from 'next';

// TODO sendgrid
const handler: NextApiHandler<Response<string>> = async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(405).json({
			data: null,
			error: { message: 'Only GET' },
		});
	}

	const { email, subject, message } = req.body;

	if (!email || !subject || !message) {
		return res.status(404).json({
			data: null,
			error: { message: 'Missing data' },
		});
	}

	const msg: MailDataRequired = {
		to: process.env.SENDGRID_SENDER as string,
		from: process.env.SENDGRID_SENDER as string,
		subject: `[From ${email}] ${subject}`,
		text: message,
	};

	try {
		await sgMail.send(msg);
		return res.status(200).json({ data: 'Sent', error: null });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ data: null, error: { message: 'Fail to send email' } });
	}
};

export default handler;
