import { Result } from '@api-response';
import sgMail from '@lib/sendgrid';
import { MailDataRequired } from '@sendgrid/mail';
import { apiHanler } from '@src/server/utils/api-utils';
import { NextApiHandler } from 'next';

// TODO sendgrid
const post: NextApiHandler<Result<string>> = async (req, res) => {
	const { email, subject, message } = req.body;

	if (!email || !subject || !message) {
		return res.status(400).json({
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

export default apiHanler({ post });
