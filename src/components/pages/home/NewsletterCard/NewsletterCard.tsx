import Card from '@components/cards/Card';
import Button from '@components/common/Button/Button';
import axios from 'axios';
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';

type Props = { className?: string };

function NewsletterCard({ className }: Props) {
  const [email, setEmail] = useState('');

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();

    axios.post('/api/email/subscribe', {
      email,
    });
  };

  // TODO clear input, show success modal
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setEmail(ev.target.value);
  };

  return (
    <Card className={className} title="Newsletter" tw="bg-skin-light">
      <p>
        Make sure to subscribe to our newsletter and be the first to know the
        news.
      </p>

      <form onSubmit={handleFormSubmit} tw="flex flex-col mt-md">
        <label>
          Your email address
          {/* TODO autocomplete */}
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
    </Card>
  );
}

export default NewsletterCard;
