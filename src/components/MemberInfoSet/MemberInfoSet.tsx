import MemberInfo from '@components/MemberInfoSet/components/MemberInfo/MemberInfo';
import { sectionH1 } from '@styles/shared-css';
import { ComponentProps } from '@utils';
import React from 'react';

type Props = {
  className?: string;
  heading: string;
  members: ComponentProps<typeof MemberInfo>['data'][];
};

function MemberInfoSet({ className, heading, members }: Props) {
  return (
    <section
      aria-label={heading}
      className={className}
      tw="md:text-lg xl:text-2xl"
    >
      <header tw="mb-6 md:mb-lg xl:mb-20">
        <h2 css={sectionH1} tw="mx-0 after:(mx-0)">
          {heading}
        </h2>
      </header>

      <ul tw="grid grid-cols-12 gap-y-4 md:(gap-y-8 gap-x-4) xl:(gap-y-16 gap-x-8)">
        {members.map((member) => (
          <li tw="col-span-full md:col-span-4 2xl:col-span-3" key={member.id}>
            <MemberInfo data={member} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MemberInfoSet;
