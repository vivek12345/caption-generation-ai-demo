import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full flex items-center h-16 px-4 border-b shrink-0 md:px-6">
      <nav className="flex text-lg font-medium md:flex sm:flex-row items-center md:text-sm">
        <Link
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          href="/"
        >
          <span className="sr-only">Caption Generator</span>
        </Link>
        <Link className="text-zinc-500 dark:text-zinc-400" href="/">
          Caption Generator
        </Link>
      </nav>
    </header>
  );
};
