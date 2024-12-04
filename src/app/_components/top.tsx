"use client";

import dynamic from "next/dynamic";
import { Send } from "lucide-react";
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
import { useCallback } from "react";
import { api } from "@/trpc/react";
import bird from "./bird.json";

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
});

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export const Top = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
      comment: "",
    },
  });
  const {
    mutate: createTechBlogComment,
    isSuccess,
    isPending,
  } = api.techBlog.create.useMutation();

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
      {isSuccess ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-64 w-64 items-center justify-center overflow-hidden rounded-full bg-gray-100">
            <Lottie animationData={bird} loop={true} />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold">ありがとうございます！</h3>
            <p className="text-gray-600">
              あなたの感謝の気持ちを受け付けました。
            </p>
            <p className="text-gray-600">
              入力された情報を確認の上、著者に伝えさせていただきます。
            </p>
          </div>
        </div>
      ) : (
        <>
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
            </form>
          </Form>
          <Button
            form="form"
            type="submit"
            className="w-full self-end md:w-fit"
            disabled={isPending}
          >
            <Send className="mr-2" />
            感謝を送る！
          </Button>
        </>
      )}
    </section>
  );
};
