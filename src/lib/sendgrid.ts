import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API as string);

export default sgMail;
