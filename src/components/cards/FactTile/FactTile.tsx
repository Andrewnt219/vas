import { VFC } from 'react';

type Props = {
  data: {
    key: string;
    value: string;
  };
};

const FactTile: VFC<Props> = ({ data }) => {
  const { key, value } = data;
  return (
    <div tw="bg-white  rounded-lg relative aspect-w-1 aspect-h-1 shadow-card md:rounded-4xl">
      <div tw="position-center flex flex-col   items-center  font-medium leading-tight space-y-1 md:space-y-3">
        <span tw="text-primary text-4xl md:text-8xl">{value}</span>
        <span tw="text-base md:text-4xl">{key}</span>
      </div>
    </div>
  );
};

export default FactTile;
