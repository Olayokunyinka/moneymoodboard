import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SEARCH_INDEX, type SearchEntry } from "@/lib/search-index";

const GROUPS: SearchEntry["group"][] = ["Tools", "Guides", "Articles", "Pages"];

export function SearchCommand({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "/" && !open) {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          e.preventDefault();
          onOpenChange(true);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const go = (url: string) => {
    onOpenChange(false);
    void navigate({ to: url });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search guides, tools and pages…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {GROUPS.map((g) => {
          const items = SEARCH_INDEX.filter((e) => e.group === g);
          if (!items.length) return null;
          return (
            <CommandGroup key={g} heading={g}>
              {items.map((e) => (
                <CommandItem
                  key={e.url}
                  value={`${e.title} ${e.keywords ?? ""} ${e.url}`}
                  onSelect={() => go(e.url)}
                >
                  <span className="truncate">{e.title}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{e.url}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}
