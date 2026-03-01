"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { haptic } from "@/lib/haptic";
import type { NavItem } from "@/types/nav";

export function MobileNavV2({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 40rem)"); // sm breakpoint

  const toggleMenuButton = (
    <Button
      variant="ghost"
      className="group/toggle flex size-8 touch-manipulation flex-col gap-1 data-[state=open]:bg-accent sm:hidden"
      size="icon"
      onClick={() => haptic()}
    >
      <span className="flex h-0.5 w-4 transform rounded-[1px] bg-foreground transition-transform group-data-[state=open]/toggle:translate-y-[3px] group-data-[state=open]/toggle:rotate-45" />
      <span className="flex h-0.5 w-4 transform rounded-[1px] bg-foreground transition-transform group-data-[state=open]/toggle:translate-y-[-3px] group-data-[state=open]/toggle:-rotate-45" />
      <span className="sr-only">Toggle Menu</span>
    </Button>
  );

  if (isDesktop) {
    return toggleMenuButton;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{toggleMenuButton}</PopoverTrigger>

      <PopoverContent
        className="h-(--radix-popper-available-height) w-(--radix-popper-available-width) rounded-none bg-background px-2 py-0 shadow-none ring-0 data-open:animate-none"
        sideOffset={11}
      >
        <div className="absolute inset-x-[calc(var(--spacing)*2+1px)] top-1 h-px bg-border" />
        <div className="flex h-full flex-col items-center justify-center gap-4 border-x mask-b-from-80% mask-b-to-100% px-2 py-6">
          {items.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-medium"
              onClick={() => setOpen(false)}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
