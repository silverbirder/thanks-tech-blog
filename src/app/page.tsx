// import { HydrateClient } from "@/trpc/server";
import { Top } from "@/app/_components/top";

export default async function Page() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // void api.post.getLatest.prefetch();

  return (
    // <HydrateClient>
    <main className="flex w-full max-w-2xl flex-grow items-center justify-center">
      <Top />
    </main>
    // </HydrateClient>
  );
}
