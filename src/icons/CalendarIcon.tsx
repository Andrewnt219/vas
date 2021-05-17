import React, { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & { className?: string };

function CalendarIcon({ className, ...props }: Props) {
  return (
    <svg
      {...props}
      className={className}
      viewBox="0 0 68 68"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.2578 27.8906C19.2578 29.3577 18.0686 30.5469 16.6016 30.5469C15.1345 30.5469 13.9453 29.3577 13.9453 27.8906C13.9453 26.4236 15.1345 25.2344 16.6016 25.2344C18.0686 25.2344 19.2578 26.4236 19.2578 27.8906ZM42.3672 27.8906C42.3672 26.4236 41.178 25.2344 39.7109 25.2344C38.2439 25.2344 37.0547 26.4236 37.0547 27.8906C37.0547 29.3577 38.2439 30.5469 39.7109 30.5469C41.178 30.5469 42.3672 29.3577 42.3672 27.8906ZM53.9219 27.8906C53.9219 26.4236 52.7327 25.2344 51.2656 25.2344C49.7986 25.2344 48.6094 26.4236 48.6094 27.8906C48.6094 29.3577 49.7986 30.5469 51.2656 30.5469C52.7327 30.5469 53.9219 29.3577 53.9219 27.8906ZM19.2578 39.4453C19.2578 37.9783 18.0686 36.7891 16.6016 36.7891C15.1345 36.7891 13.9453 37.9783 13.9453 39.4453C13.9453 40.9124 15.1345 42.1016 16.6016 42.1016C18.0686 42.1016 19.2578 40.9124 19.2578 39.4453ZM16.6016 48.3438C15.1345 48.3438 13.9453 49.533 13.9453 51C13.9453 52.467 15.1345 53.6562 16.6016 53.6562C18.0686 53.6562 19.2578 52.467 19.2578 51C19.2578 49.533 18.0686 48.3438 16.6016 48.3438ZM30.8125 27.8906C30.8125 26.4236 29.6233 25.2344 28.1562 25.2344C26.6892 25.2344 25.5 26.4236 25.5 27.8906C25.5 29.3577 26.6892 30.5469 28.1562 30.5469C29.6233 30.5469 30.8125 29.3577 30.8125 27.8906ZM30.8125 39.4453C30.8125 37.9783 29.6233 36.7891 28.1562 36.7891C26.6892 36.7891 25.5 37.9783 25.5 39.4453C25.5 40.9124 26.6892 42.1016 28.1562 42.1016C29.6233 42.1016 30.8125 40.9124 30.8125 39.4453ZM28.1562 48.3438C26.6892 48.3438 25.5 49.533 25.5 51C25.5 52.467 26.6892 53.6562 28.1562 53.6562C29.6233 53.6562 30.8125 52.467 30.8125 51C30.8125 49.533 29.6233 48.3438 28.1562 48.3438ZM68 51.9297C68 60.7909 60.7909 68 51.9297 68C43.0684 68 35.8594 60.7909 35.8594 51.9297C35.8594 43.0684 43.0684 35.8594 51.9297 35.8594C60.7909 35.8594 68 43.0684 68 51.9297ZM62.6875 51.9297C62.6875 45.9977 57.8615 41.1719 51.9297 41.1719C45.9979 41.1719 41.1719 45.9977 41.1719 51.9297C41.1719 57.8616 45.9979 62.6875 51.9297 62.6875C57.8615 62.6875 62.6875 57.8616 62.6875 51.9297ZM55.7812 49.2734H54.5859V46.4844C54.5859 45.0173 53.3967 43.8281 51.9297 43.8281C50.4626 43.8281 49.2734 45.0173 49.2734 46.4844V51.9297C49.2734 53.3967 50.4626 54.5859 51.9297 54.5859H55.7812C57.2483 54.5859 58.4375 53.3967 58.4375 51.9297C58.4375 50.4626 57.2483 49.2734 55.7812 49.2734ZM57.375 5.3125H53.9219V2.65625C53.9219 1.1892 52.7327 0 51.2656 0C49.7986 0 48.6094 1.1892 48.6094 2.65625V5.3125H36.5234V2.65625C36.5234 1.1892 35.3342 0 33.8672 0C32.4001 0 31.2109 1.1892 31.2109 2.65625V5.3125H19.2578V2.65625C19.2578 1.1892 18.0686 0 16.6016 0C15.1345 0 13.9453 1.1892 13.9453 2.65625V5.3125H10.625C4.76638 5.3125 0 10.0789 0 15.9375V57.375C0 63.2336 4.76638 68 10.625 68H30.9453C32.4124 68 33.6016 66.8108 33.6016 65.3438C33.6016 63.8767 32.4124 62.6875 30.9453 62.6875H10.625C7.69569 62.6875 5.3125 60.3043 5.3125 57.375V15.9375C5.3125 13.0082 7.69569 10.625 10.625 10.625H13.9453V13.2812C13.9453 14.7483 15.1345 15.9375 16.6016 15.9375C18.0686 15.9375 19.2578 14.7483 19.2578 13.2812V10.625H31.2109V13.2812C31.2109 14.7483 32.4001 15.9375 33.8672 15.9375C35.3342 15.9375 36.5234 14.7483 36.5234 13.2812V10.625H48.6094V13.2812C48.6094 14.7483 49.7986 15.9375 51.2656 15.9375C52.7327 15.9375 53.9219 14.7483 53.9219 13.2812V10.625H57.375C60.3043 10.625 62.6875 13.0082 62.6875 15.9375V31.0781C62.6875 32.5452 63.8767 33.7344 65.3438 33.7344C66.8108 33.7344 68 32.5452 68 31.0781V15.9375C68 10.0789 63.2336 5.3125 57.375 5.3125Z"
        fill="#EA1D25"
      />
    </svg>
  );
}

export default CalendarIcon;
