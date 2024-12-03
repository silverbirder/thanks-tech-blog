// import { HydrateClient } from "@/trpc/server";

export default async function Page() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // void api.post.getLatest.prefetch();

  return (
    // <HydrateClient>
    <main className="flex w-full max-w-2xl flex-grow items-center justify-center">
      ありがとう、技術ブログ
    </main>
    // </HydrateClient>
  );
}
