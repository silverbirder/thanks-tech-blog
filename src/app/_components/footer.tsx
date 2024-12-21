import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="my-16 w-full border-t py-4">
      <div className="mx-auto flex flex-row items-center justify-between px-4 text-xs text-foreground">
        <p>© {currentYear} silverbirder. All rights reserved.</p>
        <Link href="https://forms.gle/RkrK3cHXDnbmPEfe7" target="_blank">
          お問い合わせ
        </Link>
      </div>
    </footer>
  );
};
