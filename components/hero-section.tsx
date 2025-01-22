"use client";

import { HeroSectionProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium text-purple-400">
              AI Model Marketplace
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            {subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/browse">
            <Button className="gap-2 bg-purple-600 text-white hover:bg-purple-700">
              Browse Models
              <ArrowRight className="h-4 w-4" />
            </Button></Link>
            <Link href="/docs"><Button
              variant="outline"
              className="border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300"
            >
              View Documentation
            </Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}