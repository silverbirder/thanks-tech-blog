"use client";

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

const FormSchema = z.object({
  url: z
    .string()
    .min(1, {
      message: "かならず入力してね",
    })
    .url({
      message: "URLの形式で入力してね",
    }),
  comment: z.string().optional(),
});

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
      <h2 className="text-2xl font-bold">著者に感謝を伝える</h2>
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
                    placeholder="著者へのメッセージをここに書いてください..."
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
        className="mx-auto w-full md:w-auto"
        disabled={isSuccess || isPending}
      >
        <Send className="mr-2" />
        {isSuccess ? "感謝を送りました！" : "感謝を送る！"}
      </Button>
    </section>
  );
};
