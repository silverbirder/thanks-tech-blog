import { Thanks } from "@/app/_components/thanks";

type Props = {
  params?: Promise<{
    hash?: string;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  return <Thanks hash={params?.hash} />;
}
