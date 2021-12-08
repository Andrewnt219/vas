import MainLayout from "@components/pages/MainLayout";
import { getCountdown } from "@utils/date-utils";
import { padZero } from "@utils/number-utils";
import useTranslation from "next-translate/useTranslation";
import tw from "twin.macro";

import { useEffect, useState } from "react";

const button = tw` text-black background[#FFFFFF] transition-all hover:(filter saturate-150) py-xs px-sm mt-md rounded md:(py-sm px-lg mt-2xl text-sm) xl:( py-md px-xl rounded-xl)`;

const EVENT_DATE = new Date("2022-01-01T15:00:00Z");
function calculateDistance() {
  return EVENT_DATE.getTime() - new Date().getTime();
}

type Props = { className?: string };

function Christmas2021LandingPage({ className }: Props) {
  const { t } = useTranslation();
  const [distance, setDistance] = useState<number>(calculateDistance);

  const { days, hours, minutes, seconds } = getCountdown(distance);

  useEffect(() => {
    const timerId = setInterval(() => setDistance(calculateDistance()), 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <MainLayout
      title="Christmas 2021"
      className={className}
      tw="pb-0! md:text-lg xl:(text-xl overflow-x-hidden)"
    >
      <header tw="col-span-full">
        <div
          tw="relative"
          css={`
            @media only screen and (min-width: 1280px) {
              background-image: url("${require("images/Background.jpg")}");
              aspect-ratio: 1280 / 640;
            }

            background-image: url("${require("images/Background-mobile.jpg")}");
            aspect-ratio: 768 / 1280;

            background-repeat: no-repeat;
            background-size: 100% 100%;
            width: 100%;
          `}
        >
          <div tw="absolute-cover text-white flex flex-col text-center items-center justify-center md:text-base lg:text-3xl sm:text-base">
            <div tw="color[#FFD13C]">
              <p> {t("Merry Christmas")}</p>
              <p tw="text-larger">{t("2021")}</p>
            </div>
            <div tw="mt-lg flex justify-evenly w-full max-w-xl md:mt-2xl">
              <CountDownBlock
                tw="text-black"
                count={days}
                unit={t("days", { count: days })}
              />
              <CountDownBlock
                count={hours}
                unit={t("hours", {
                  count: hours,
                })}
              />
              <CountDownBlock
                count={minutes}
                unit={t("minutes", {
                  count: minutes,
                })}
              />
              <CountDownBlock
                count={seconds}
                unit={t("seconds", {
                  count: seconds,
                })}
              />
            </div>

            <button css={button}>
              <a href="/" target="_blank" rel="noreferrer noopener">
                {t("Learn More")}
              </a>
            </button>
          </div>
        </div>
      </header>
    </MainLayout>
  );
}

type CountDownBlockProps = {
  count: number;
  unit: string;
};
function CountDownBlock({ count, unit }: CountDownBlockProps) {
  return (
    <div tw="flex flex-col items-center background[rgba(255, 255, 255, 0.1)] w-1/5 rounded-xl p-8">
      <span tw="text-2xl font-bold md:text-6xl lg:text-6xl">
        {padZero(count)}
      </span>
      <span tw="text-sm">{unit}</span>
    </div>
  );
}

export default Christmas2021LandingPage;
