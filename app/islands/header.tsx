import { IconArrowUpRight } from '@tabler/icons-react';
import Link from "../components/ui/link";
import { cn } from "./utils";

export default function Header() {
  return (
    <header
      className={cn("backdrop-blur-3xl", "sticky top-0 z-50 w-full shadow-2xl")}
    >
      <div className="container mx-auto">
        <div className={cn("h-14 flex items-center justify-between")}>
          <Link href={"/"} className="flex items-center gap-2">
            <img
              width={18}
              height={18}
              alt={"Honox"}
              src={"https://hono.dev/images/logo.svg"}
            />
            <h2 className="text-lg font-bold">Honox</h2>
          </Link>

          <nav className="flex items-center justify-center gap-5">
            <Link href={"/docs"} className="font-light hover:text-primary text-md">
              Docs
            </Link>
            <Link href={"/examples"} className="font-light hover:text-primary text-md">
              Examples
            </Link>
            <Link href={"/discussions"} className="gap-1 font-light hover:text-primary text-md">
              Discussions <IconArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
