ALTER TABLE "thanks-tech-blog_technical-blog" ADD COLUMN "hash" varchar(256);

ALTER TABLE "thanks-tech-blog_technical-blog"
ALTER COLUMN "hash" SET DEFAULT 'default-hash';

UPDATE "thanks-tech-blog_technical-blog"
SET "hash" = 'default-hash'
WHERE "hash" IS NULL;