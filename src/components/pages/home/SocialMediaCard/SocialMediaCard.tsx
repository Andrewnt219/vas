import Card from '@components/cards/Card';
import { Link } from '@data/common-data';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import tw, { css } from 'twin.macro';

const icon = css`
  ${tw`w-12 h-12  flex items-center justify-center rounded-full transition-transform hover:(transform -translate-y-1) focus-within:(transform -translate-y-1)`}
`;
type Props = { className?: string };

function SocialMediaBox({ className }: Props) {
  const { t } = useTranslation();

  return (
    <Card
      className={className}
      tw="bg-skin-dark text-white"
      title={t('common:aside.social.title')}
    >
      <p>{t('common:aside.social.description')}</p>

      <ul tw="mt-4 flex space-x-2" aria-label="List of our social medias">
        <li css={icon} style={{ background: '#3e5b98' }}>
          <a target="_blank" rel="noopener noreferrer" href={Link.FACEBOOK}>
            <FaFacebookF />
          </a>
        </li>

        <li css={icon} style={{ background: '#0072b1' }}>
          <a target="_blank" rel="noopener noreferrer" href={Link.LINKED_IN}>
            <FaLinkedinIn />
          </a>
        </li>

        <li css={icon} style={{ background: '#f00' }}>
          <a target="_blank" rel="noopener noreferrer" href={Link.YOUTUBE}>
            <FaYoutube />
          </a>
        </li>
      </ul>
    </Card>
  );
}

export default SocialMediaBox;
