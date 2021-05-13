import { Result } from '@common';
import mailchimp from '@mailchimp/mailchimp_marketing';
import { apiHanler } from '@src/server/utils/api-utils';
import { createResult, createResultError } from '@utils/create-utils';
import { NextApiRequest, NextApiResponse } from 'next';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

const post = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<string>>
) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json(createResultError('Email is required'));
  }

  await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
    email_address: email,
    status: 'subscribed',
  });

  return res.status(201).json(createResult('OK!'));
};

export default apiHanler({ post });
