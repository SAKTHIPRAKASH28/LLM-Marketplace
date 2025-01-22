"use client";

import { ProjectCardProps } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { motion } from "framer-motion";

export function ProjectCard({
  projectName,
  languages,
  description,
  repoUrl,
}: ProjectCardProps) {
  return (
    <Card className="w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold tracking-tight">{projectName}</h3>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Badge
                key={lang.name}
                style={{
                  backgroundColor: lang.color,
                  color: isLightColor(lang.color) ? "black" : "white",
                }}
                className="px-2 py-0.5 text-xs font-medium"
              >
                {lang.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full gap-2 transition-colors hover:bg-secondary"
          asChild
        >
          <a href={repoUrl} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" />
            View Repository
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Helper function to determine if a color is light or dark
function isLightColor(color: string): boolean {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}