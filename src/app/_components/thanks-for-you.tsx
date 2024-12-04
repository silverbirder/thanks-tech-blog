import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Quote } from "lucide-react";

type Props = {
  blog: {
    url: string;
    handleName: string | null;
    comment: string;
  };
};

export const ThanksForYou = ({ blog }: Props) => {
  return (
    <section className="m-6 flex w-full flex-col items-center justify-center space-y-6 md:max-w-2xl">
      <h2 className="text-2xl font-bold">ありがとう、技術ブログ</h2>
      <MessageLetter blog={blog} />
    </section>
  );
};

export const MessageLetter = ({ blog }: Props) => {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            感謝のメッセージ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">From</Badge>
            <span className="font-medium">
              {blog.handleName && blog.handleName}
              {!blog.handleName && "匿名の読者"}
            </span>
          </div>
          <div className="text-muted-foreground flex items-center space-x-2 text-sm">
            <ExternalLink size={16} />
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all hover:underline"
            >
              {blog.url}
            </a>
          </div>
          <div className="relative pb-4 pt-4">
            <Quote
              className="text-muted-foreground/20 absolute left-0 top-0"
              size={24}
            />
            <p className="text-muted-foreground pl-8 pr-8 italic">
              {blog.comment}
            </p>
            <Quote
              className="text-muted-foreground/20 absolute bottom-0 right-0 rotate-180"
              size={24}
            />
          </div>
        </CardContent>
      </Card>
      <p className="text-muted-foreground text-sm">
        このメッセージは、あなたの技術ブログが読者に与えた影響の証です。
        これからも素晴らしい記事を書き続けてください。
      </p>
    </>
  );
};
