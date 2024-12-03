import { Send, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Top = () => {
  return (
    <section className="mx-auto mt-8 max-w-2xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-center text-2xl font-bold">
        著者に感謝を伝える
      </h2>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="blogUrl">技術ブログURL</Label>
          <div className="flex items-center space-x-2">
            <Link className="h-5 w-5 text-gray-500" />
            <Input
              id="blogUrl"
              placeholder="https://example.com/tech-blog/article"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="message">メッセージ（任意）</Label>
          <Textarea
            id="message"
            placeholder="著者へのメッセージをここに書いてください..."
          />
        </div>
        <Button type="submit" className="w-full">
          <Send className="mr-2" />
          感謝を送る
        </Button>
      </form>
    </section>
  );
};
