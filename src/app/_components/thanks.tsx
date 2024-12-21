"use client";

import dynamic from "next/dynamic";
import bird from "./bird.json";
import Link from "next/link";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type Props = {
  hash?: string;
};

export const Thanks = ({ hash }: Props) => {
  const messagePath = `/${hash}`;
  return (
    <section className="item-center m-6 flex w-full flex-col justify-center space-y-6 md:max-w-2xl">
      <h2 className="text-2xl font-bold">ありがとう、技術ブログ</h2>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex h-64 w-64 items-center justify-center">
          <Lottie animationData={bird} loop={true} />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold">ありがとうございます！</h3>
          <p className="text-foreground">
            あなたの感謝の気持ちを受け付けました。
          </p>
          <p className="text-foreground">
            入力された情報を確認の上、
            <Link
              href={messagePath}
              className="inline-flex items-center text-link hover:text-link-hover hover:underline"
            >
              こちらのリンク
            </Link>
            を著者に伝えさせていただきます。
          </p>
        </div>
      </div>
    </section>
  );
};
