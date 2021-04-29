import Button from '@components/Button/Button';
import WidgetBox from '@layouts/boxes/WidgetBox';
import axios from 'axios';
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';

type Props = { className?: string };

function NewsletterBox({ className }: Props) {
  const [email, setEmail] = useState('');

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();

    axios.post('/api/contact', {
      email,
      subject: 'Subscribe to newsletter',
      message: `User ${email} subscribe to newsletter`,
    });
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setEmail(ev.target.value);
  };

  return (
    <WidgetBox className={className} title="Newsletter" tw="bg-skin-light">
      <p>
        Make sure to subscribe to our newsletter and be the first to know the
        news.
      </p>

      <form onSubmit={handleFormSubmit} tw="flex flex-col mt-sm">
        <label>
          Your email address
          <input
            onChange={handleInputChange}
            value={email}
            type="email"
            required
            placeholder="john.doe@example.com"
            tw="pb-2 my-2 border-b w-full outline-none bg-transparent placeholder-black placeholder-opacity-50"
          />
        </label>

        <Button variant="contain">Subscribe</Button>
      </form>
    </WidgetBox>
  );
}

export default NewsletterBox;
