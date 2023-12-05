"use client";

import { useSearchParams } from "next/navigation";

import Canvas from "@/app/components/canvas";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const searchParam = useSearchParams();

  const srCode = searchParam.get("sr-code");
  const bg = searchParam.get("bg");
  const gender = searchParam.get("gender");
  const wear = searchParam.get("wear");
  const name = searchParam.get("name");
  const dept = searchParam.get("dept");
  const eyes = searchParam.get("eyes");
  const mouth = searchParam.get("mouth");
  const stickers = searchParam.get("stickers");
  let stickersArray: string[] = [];
  if (stickers) {
    stickersArray = stickers.split(",");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8">
          <div className="mr-auto place-self-center lg:col-span-7">
            {name && stickers && (
              <h1 className="font-extrabold leading-none text-3xl dark:text-white">
                {`Congrats ${name} (${srCode})!`}
              </h1>
            )}
            <br />
            {name && stickers && (
              <p className="font-extrabold leading-none text-2xl dark:text-white">
                {`Grab your ${stickersArray.length} WiiStickers here.`}
              </p>
            )}
            <p />
            <br />
            <div className="flex flex-wrap justify-center">
              {stickersArray.map((sticker) => {
                return (
                  <div className="flex flex-row p-1" key={sticker}>
                    <Canvas
                      name={name}
                      dept={dept}
                      key={sticker}
                      width={300}
                      height={300}
                      backgroundColor={bg}
                      background={`background_${sticker}`}
                      gender={gender}
                      wear={wear}
                      eyes={eyes}
                      mouth={mouth}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
