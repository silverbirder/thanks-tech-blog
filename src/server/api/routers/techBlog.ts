import { z } from "zod";
import { randomBytes } from "crypto";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { technicalBlogs } from "@/server/db/schema";
import { eq } from "drizzle-orm";

import { IncomingWebhook } from "@slack/webhook";
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(slackWebhookUrl!);

export const techBlogRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        url: z.string().url().min(1),
        comment: z.string().min(1),
        handleName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hash = randomBytes(16).toString("hex");
      await ctx.db.insert(technicalBlogs).values({
        url: input.url,
        hash: hash,
        comment: input.comment,
        handleName: input.handleName,
        status: "in_progress",
      });
      try {
        const url = `${process.env.BASE_URL}/${hash}`;
        const message = `✨ 新しい技術ブログコメントが登録されました！\n\n📎 URL: ${url}\n\n📎 技術ブログURL: ${input.url}\n💬 コメント: ${input.comment}\n📝 ハンドルネーム: ${input.handleName}\n🔗 ハッシュ: ${hash}`;
        await webhook.send({
          text: message,
        });
      } catch (error) {
        console.error("Slack通知の送信に失敗しました:", error);
      }
      return { hash };
    }),
  getByHash: publicProcedure
    .input(
      z.object({
        hash: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select({
          url: technicalBlogs.url,
          handleName: technicalBlogs.handleName,
          comment: technicalBlogs.comment,
        })
        .from(technicalBlogs)
        .where(eq(technicalBlogs.hash, input.hash))
        .execute();

      if (result.length === 0) {
        return {};
      }
      const blog = result[0];
      return { blog };
    }),
});
