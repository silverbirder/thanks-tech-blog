import { z } from "zod";
import { randomBytes } from "crypto";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { technicalBlogs } from "@/server/db/schema";

export const techBlogRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        url: z.string().url().min(1),
        comment: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hash = randomBytes(16).toString("hex");
      await ctx.db.insert(technicalBlogs).values({
        url: input.url,
        hash: hash,
        comment: input.comment,
        status: "in_progress",
      });
      return { hash };
    }),
});
