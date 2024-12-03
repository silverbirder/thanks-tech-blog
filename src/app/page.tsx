// import { HydrateClient } from "@/trpc/server";
import { Top } from "@/app/_components/top";

export default async function Page() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // void api.post.getLatest.prefetch();

  return (
    // <HydrateClient>
    <Top />
    // </HydrateClient>
  );
}
