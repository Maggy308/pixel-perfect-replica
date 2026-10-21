import { Link } from "@tanstack/react-router";
import { Cloud } from "lucide-react";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky text-sky-foreground"><Cloud className="h-5 w-5" /></span>
            AzurePrep AI
          </Link>
          <nav className="flex gap-3 text-sm sm:gap-5">
            <Link to="/" className="opacity-80 hover:opacity-100" activeProps={{ className: "opacity-100 font-semibold" }} activeOptions={{ exact: true }}>Home</Link>
            <Link to="/quiz" className="opacity-80 hover:opacity-100" activeProps={{ className: "opacity-100 font-semibold" }}>Quiz</Link>
            <Link to="/revision" className="opacity-80 hover:opacity-100" activeProps={{ className: "opacity-100 font-semibold" }}>Revision</Link>
            <Link to="/progress" className="opacity-80 hover:opacity-100" activeProps={{ className: "opacity-100 font-semibold" }}>Progress</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-12">{children}</main>
      <footer className="border-t border-border">
        <p className="mx-auto max-w-5xl px-4 py-5 text-center text-sm text-muted-foreground">
          Independent study tool. Not affiliated with or endorsed by Microsoft.
        </p>
      </footer>
    </div>
  );
}
