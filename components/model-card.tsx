"use client";

import { ModelCardProps } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Server, Code, ExternalLink } from "lucide-react";
import Link from "next/link";

export function ModelCard({
  name,
  provider,
  description,
  pricing,
  features,
  performance,
  tags,
  apiEndpoint,
  docs,
}: ModelCardProps) {
 
  return (
    <Card className="group w-full overflow-hidden cursor-default border-zinc-800 bg-zinc-950 transition-all duration-300 hover:border-zinc-700 hover:shadow-lg hover:shadow-purple-500/5">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-zinc-100">{name}</h3>
            <p className="text-sm text-zinc-400">{provider}</p>
          </div>
          <Badge
            variant="outline"
            className="border-purple-500/50 bg-purple-500/10 text-purple-400"
          >
            {pricing.type === "per-token" ? "Per Token" : "Per Call"}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-zinc-900 text-zinc-400 cursor-default"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-zinc-400">{description}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Zap className="h-4 w-4 text-yellow-500" />
              Latency: {performance.latency}
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Server className="h-4 w-4 text-green-500" />
              Throughput: {performance.throughput}
            </div>
          </div>
          <div className="space-y-1">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-sm text-zinc-400"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link href={apiEndpoint}>
        <Button className="flex-1 bg-purple-600 text-white hover:bg-purple-700">
          Try Now
        </Button></Link>
        <Button
          variant="outline"
          className="gap-2 border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300"
          asChild
        >
          <a href={docs}  target="_blank" rel="noopener noreferrer">
            <Code className="h-4 w-4" />
            API Docs
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}