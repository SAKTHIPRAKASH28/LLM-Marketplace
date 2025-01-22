"use client";

import { Button } from "@/components/ui/button";
import { NavbarProps } from "@/types";
import { Sparkles, Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";



export function Navbar({ menuItems }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-500" />
              <span className="text-lg font-bold text-white">LLM Marketplace</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.url}
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="ml-6 flex items-center gap-3">
                <Button
                  variant="outline"
                  className="border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300"
                >
                  Sign In
                </Button>
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Get Started
                </Button>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-zinc-800 md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  className="block rounded-md px-3 py-2 text-base text-zinc-400 hover:bg-zinc-900 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4 space-y-2 px-3">
                <Button
                  variant="outline"
                  className="w-full border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300"
                >
                  Sign In
                </Button>
                <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
