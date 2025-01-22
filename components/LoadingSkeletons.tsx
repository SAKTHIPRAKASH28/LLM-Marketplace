// LoadingSkeletons.tsx
import React from 'react';

// Skeleton for Navbar
export function NavbarSkeleton() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-zinc-600 animate-pulse"></div>
            <span className="ml-2 w-32 h-6 bg-zinc-600 animate-pulse"></span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-6">
              <div className="w-24 h-6 bg-zinc-600 animate-pulse"></div>
              <div className="w-24 h-6 bg-zinc-600 animate-pulse"></div>
              <div className="w-24 h-6 bg-zinc-600 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
// Skeleton for Docs (Setup Steps)
export function DocsSkeleton() {
  return (
    <div className="bg-zinc-900/50 rounded-xl p-4 md:p-8 space-y-6 animate-pulse">
      <div className="space-y-4">
        {/* Title and Subtitle Skeletons */}
        <div className="w-48 h-6 bg-zinc-600 rounded-md"></div>
        <div className="w-64 h-6 bg-zinc-600 rounded-md"></div>
      </div>
      
      {/* Setup Steps Skeletons */}
      <div className="space-y-6">
        <div className="space-y-4">
          {/* Command and Code Skeleton */}
          <div className="w-full h-10 bg-zinc-600 rounded-md"></div>
          <div className="w-3/4 h-6 bg-zinc-600 rounded-md"></div>
        </div>
        
        <div className="space-y-4">
          {/* Command and Code Skeleton */}
          <div className="w-full h-10 bg-zinc-600 rounded-md"></div>
          <div className="w-3/4 h-6 bg-zinc-600 rounded-md"></div>
        </div>

        <div className="space-y-4">
          {/* Command and Code Skeleton */}
          <div className="w-full h-10 bg-zinc-600 rounded-md"></div>
          <div className="w-3/4 h-6 bg-zinc-600 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

// Skeleton for Hero Section
export function HeroSectionSkeleton() {
  return (
    <section className="bg-zinc-950 h-96 animate-pulse">
      <div className="flex justify-center items-center h-full">
        <div className="space-y-4 text-center">
          <div className="w-72 h-8 bg-zinc-600 animate-pulse mx-auto"></div>
          <div className="w-96 h-6 bg-zinc-600 animate-pulse mx-auto"></div>
        </div>
      </div>
    </section>
  );
}

// Skeleton for Model Cards
export function ModelCardSkeleton() {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 space-y-4 animate-pulse">
      <div className="w-full h-48 bg-zinc-600"></div>
      <div className="w-32 h-6 bg-zinc-600"></div>
      <div className="w-24 h-6 bg-zinc-600"></div>
      <div className="w-full h-6 bg-zinc-600"></div>
      <div className="w-32 h-6 bg-zinc-600"></div>
    </div>
  );
}

// Skeleton for Footer
export function FooterSkeleton() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h4 className="text-lg font-semibold text-white w-32 h-6 bg-zinc-600 animate-pulse mb-4"></h4>
            <div className="space-y-2">
              <div className="w-32 h-6 bg-zinc-600 animate-pulse"></div>
              <div className="w-32 h-6 bg-zinc-600 animate-pulse"></div>
              <div className="w-32 h-6 bg-zinc-600 animate-pulse"></div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white w-32 h-6 bg-zinc-600 animate-pulse mb-4"></h4>
            <div className="space-y-2">
              <div className="w-32 h-6 bg-zinc-600 animate-pulse"></div>
              <div className="w-32 h-6 bg-zinc-600 animate-pulse"></div>
              <div className="w-32 h-6 bg-zinc-600 animate-pulse"></div>
            </div>
          </div>
          <div className="text-zinc-400 w-32 h-6 bg-zinc-600 animate-pulse"></div>
        </div>
      </div>
    </footer>
  );
}
