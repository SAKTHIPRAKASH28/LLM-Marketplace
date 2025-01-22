"use client"
import { useState, useEffect } from "react";
import { ModelCard } from "@/components/model-card";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { SEO } from "@/components/seo";
import { Footer } from "@/components/footer";
import stack from "../contentstackConfig";

async function fetchLandingPageData() {
  try {
    console.log("Fetching data..."); // Log to check if it's being called
    const result = await stack
      .contentType("llm_store_landing_page")
      .entry("bltdff6eb9884a872e4")
      .includeReference([
        "hero_section_ref",
        "navbar_ref",
        "footer",
        "featured_models.features",
        "seo",
        "featured_models",
      ])
      .fetch();
    
    console.log("Fetched Result:", result); // Log the data from the fetch
    return result;
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    throw error;
  }
}
import { NavbarSkeleton, HeroSectionSkeleton, ModelCardSkeleton, FooterSkeleton } from '../components/LoadingSkeletons';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {

        const result = await fetchLandingPageData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col">
        <NavbarSkeleton />
        <HeroSectionSkeleton />
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white">Featured Models</h2>
            <p className="mt-2 text-zinc-400">Explore our curated selection of high-performance language models</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ModelCardSkeleton />
            <ModelCardSkeleton />
            <ModelCardSkeleton />
          </div>
        </main>
        <FooterSkeleton />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-red-500 text-xl">Failed to load data</p>
      </div>
    );
  }

  // Once data is loaded, render the actual content
  const { seo, navbar_ref, hero_section_ref, featured_models, footer } = data;

  return (
    <div className="min-h-screen bg-zinc-950">
      <SEO {...seo[0]} />
      <Navbar menuItems={navbar_ref[0]?.menu_links || []} />
      <HeroSection title={hero_section_ref[0]?.title || "Default Title"} subtitle={hero_section_ref[0]?.subtitle || "Default Subtitle"} />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white">Featured Models</h2>
          <p className="mt-2 text-zinc-400">Explore our curated selection of high-performance language models</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured_models.map((model: any) => (
            <ModelCard
              key={model.uid}
              name={model.title}
              provider={model.provider}
              description={model.description}
              pricing={model.pricing}
              features={model.features.map((f: any) => f.title)}
              performance={model.performance}
              tags={model.tags}
              apiEndpoint={model.url}
              docs={model.docs.href}
            />
          ))}
        </div>
      </main>
      <Footer {...footer[0]} />
    </div>
  );
}
