import Card from '@components/cards/Card';
import Button from '@components/common/Button/Button';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';

type Props = { className?: string };

function NewsletterCard({ className }: Props) {
  const { t } = useTranslation();

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
    <Card
      className={className}
      title={t('common:aside.newsletter.title')}
      tw="bg-skin-light"
    >
      <p>{t('common:aside.newsletter.description')}</p>

      <form onSubmit={handleFormSubmit} tw="flex flex-col mt-md">
        <label>
          {t('common:aside.newsletter.form.email.label')}
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

        <Button variant="contain">
          {t('common:aside.newsletter.form.submit')}
        </Button>
      </form>
    </Card>
  );
}

export default NewsletterCard;
