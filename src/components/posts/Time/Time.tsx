import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { ReactNode } from 'react';
import 'twin.macro';
dayjs.extend(relativeTime);

type Props = {
  className?: string;
  time: dayjs.ConfigType | null;
  children?: ReactNode;
};

function Time({ className, time, children }: Props) {
  const dayjsTime = dayjs(time ?? new Date());

  return (
    <time
      className={className}
      dateTime={dayjsTime.format()}
      title={dayjsTime.format()}
      tw=""
    >
      {children ?? dayjsTime.fromNow()}
    </time>
  );
}

export default Time;
