"use client";

import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCallback, useState } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const FormSchema = z.object({
  url: z
    .string()
    .min(1, {
      message: "入力してね",
    })
    .url({
      message: "URLの形式で入力してね",
    }),
  comment: z.string().min(1, {
    message: "入力してね",
  }),
  handleName: z.string(),
});

export const Top = () => {
  const router = useRouter();
  const [isAnonymous, setIsAnonymous] = useState(true);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
      comment: "",
      handleName: "",
    },
  });
  const {
    mutate: createTechBlogComment,
    isPending,
    isSuccess,
  } = api.techBlog.create.useMutation({
    onSuccess: ({ hash }) => {
      const newUrl = `/${hash}/thanks`;
      router.push(newUrl);
    },
  });

  const onSubmit = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      createTechBlogComment({
        ...data,
      });
    },
    [createTechBlogComment],
  );

  return (
    <section className="item-center m-6 flex w-full flex-col justify-center space-y-6 md:max-w-2xl">
      <h2 className="text-2xl font-bold">ありがとう、技術ブログ</h2>
      <div className="text-gray-600">
        <p>技術ブログに助けられたことはありませんか？</p>
        <p>ありがとうの気持ちを、著者に届けるお手伝いをします。</p>
      </div>
      <Form {...form}>
        <form
          className="space-y-4"
          id="form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="blogUrl">技術ブログURL</FormLabel>
                <FormControl>
                  <Input
                    id="blogUrl"
                    placeholder="https://example.com/tech-blog/article"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel htmlFor="message">メッセージ</FormLabel>
                <FormControl>
                  <Textarea
                    id="message"
                    placeholder="著者へのメッセージをここに書いてください"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="item-start flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
              />
              <Label htmlFor="anonymous">匿名で送信する</Label>
            </div>
            {!isAnonymous && (
              <FormField
                control={form.control}
                name="handleName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="handleName">ハンドルネーム</FormLabel>
                    <FormControl>
                      <Input
                        id="handleName"
                        placeholder="あなたのハンドルネームを入力してください"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </form>
      </Form>
      <Button
        form="form"
        type="submit"
        className="w-full self-end md:w-fit"
        disabled={isPending}
      >
        {isPending || isSuccess ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            送信中...
          </>
        ) : (
          <>
            <Send className="mr-2" />
            感謝を送る！
          </>
        )}
      </Button>
    </section>
  );
};
