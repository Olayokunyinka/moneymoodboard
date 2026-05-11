import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { pillars } from "@/lib/pillars";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { SearchCommand } from "@/components/site/SearchCommand";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="MoneyMoodBoard home">
          <img src={logo} alt="MoneyMoodBoard" width={144} height={36} className="h-9 w-auto" fetchPriority="high" decoding="async" />
        </Link>

        <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
          {pillars.map((p) => (
            <Link
              key={p.slug}
              to={`/${p.slug}` as string}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary hover:bg-primary-soft"
              activeProps={{ className: "text-primary bg-primary-soft" }}
            >
              {p.navLabel}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Search (press / or Cmd+K)"
            onClick={() => setSearchOpen(true)}
            className="hidden md:inline-flex items-center gap-2 h-9 rounded-md border border-border bg-background/60 pl-2.5 pr-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">Search…</span>
            <kbd className="ml-1 hidden lg:inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 text-[10px] font-medium">⌘K</kbd>
          </button>
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 hover:bg-muted"
          >
            <Search className="h-4 w-4" />
          </button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/newsletter">Free Newsletter</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] max-w-sm">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex items-center justify-between mb-6">
                <img src={logo} alt="MoneyMoodBoard" className="h-8 w-auto" />
                <button onClick={() => setOpen(false)} aria-label="Close" className="h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-muted">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {pillars.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/${p.slug}` as string}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-base font-medium text-foreground/85 hover:bg-primary-soft hover:text-primary"
                  >
                    {p.navLabel}
                  </Link>
                ))}
                <Link
                  to="/tools"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-base font-medium text-foreground/85 hover:bg-primary-soft hover:text-primary"
                >
                  Free Tools
                </Link>
                <Link
                  to="/about"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-base font-medium text-foreground/85 hover:bg-primary-soft hover:text-primary"
                >
                  About
                </Link>
                <Button asChild className="mt-4">
                  <Link to="/newsletter" onClick={() => setOpen(false)}>Free Newsletter</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
