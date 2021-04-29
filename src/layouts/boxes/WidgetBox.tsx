import React, { ReactNode } from 'react';

type Props = { className?: string; title: ReactNode; children: ReactNode };

function WidgetBox({ className, title, children }: Props) {
  return (
    <article className={className} tw="p-5 md:(p-7 pt-6) xl:(p-12 pt-9)">
      <h2 tw="text-larger font-black mb-5">{title}</h2>
      {children}
    </article>
  );
}

export default WidgetBox;
