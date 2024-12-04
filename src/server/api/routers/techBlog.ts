import { z } from "zod";

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
      await ctx.db.insert(technicalBlogs).values({
        url: input.url,
        comment: input.comment,
        status: "in_progress",
      });
    }),
});
