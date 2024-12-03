import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Top = () => {
  return (
    <section className="item-center m-6 flex w-full justify-center space-y-6 md:max-w-2xl flex-col">
      <h2 className="text-2xl font-bold">著者に感謝を伝える</h2>
      <form className="space-y-4" id="form">
        <div className="space-y-2">
          <Label htmlFor="blogUrl">技術ブログURL</Label>
          <Input
            id="blogUrl"
            placeholder="https://example.com/tech-blog/article"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">メッセージ</Label>
          <Textarea
            id="message"
            placeholder="著者へのメッセージをここに書いてください..."
            required
          />
        </div>
      </form>
      <Button form="form" type="submit" className="w-full md:w-auto mx-auto">
        <Send className="mr-2" />
        感謝を送る！
      </Button>
    </section>
  );
};
