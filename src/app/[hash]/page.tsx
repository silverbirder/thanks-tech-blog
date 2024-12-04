import { ThanksForYou } from "@/app/_components/thanks-for-you";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

type Props = {
  params?: Promise<{
    hash?: string;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const { blog } = await api.techBlog.getByHash({ hash: params?.hash ?? "" });
  if (blog === undefined) {
    redirect("/");
  }
  return <ThanksForYou blog={blog} />;
}
