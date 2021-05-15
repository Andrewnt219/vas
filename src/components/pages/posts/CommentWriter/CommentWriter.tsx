import Button from '@components/common/Button/Button';
import InputGroup from '@components/forms/InputGroup/InputGroup';
import { InputLabel } from '@components/forms/InputLabel/InputLabel';
import TextField from '@components/forms/TextField/TextField';
import { isEmail } from '@utils/validate-utils';
import useTranslation from 'next-translate/useTranslation';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { uid } from 'uid';

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
          {t('posts:comments.form.comment.label')}
        </InputLabel>
        <TextField
          id={getUniqueId('body')}
          as="textarea"
          {...register('body', { required: t('common:form.errors.required') })}
        />
      </InputGroup>

      <InputGroup error={errors.name}>
        <InputLabel htmlFor={getUniqueId('name')} isRequired>
          {t('posts:comments.form.name.label')}
        </InputLabel>
        <TextField
          id={getUniqueId('name')}
          autoComplete="given-name"
          {...register('name', { required: t('common:form.errors.required') })}
        />
      </InputGroup>

      <InputGroup error={errors.email}>
        <InputLabel htmlFor={getUniqueId('email')} isRequired>
          {t('posts:comments.form.email.label')}
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
        tw="flex flex-row-reverse items-baseline justify-end"
      >
        <InputLabel htmlFor={getUniqueId('isSaved')}>
          {t('posts:comments.form.save-info.label')}
        </InputLabel>

        <input
          tw="mr-1.5"
          id={getUniqueId('isSaved')}
          type="checkbox"
          {...register('isSaved')}
        />
      </InputGroup>

      <Button tw="mt-4" variant="contain" disabled={isSubmitting}>
        {isSubmitting
          ? t('posts:comments.form.submit.sending')
          : t('posts:comments.form.submit.text')}
      </Button>
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

  const getUniqueId = useCallback(
    (id: keyof T) => `${writerId}-${id}`,
    [writerId]
  );

  return [getUniqueId, writerId];
};
export default CommentWriter;
