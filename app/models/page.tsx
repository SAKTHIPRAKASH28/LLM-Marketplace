"use client"

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ModelCard } from "@/components/model-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import stack from "../../contentstackDeliveryConfig";
import { NavbarSkeleton, ModelCardSkeleton, FooterSkeleton } from '@/components/LoadingSkeletons';
interface NavbarRef {
  [key: string]: any; // Replace `any` with the specific structure of navbar_ref if known
}

interface FooterRef {
  [key: string]: any; // Replace `any` with the specific structure of footer_ref if known
}

interface ModelFeature {
  [key: string]: any; // Replace `any` with the specific structure of model features if known
}

interface Model {
  features?: ModelFeature[];
  [key: string]: any; // Replace `any` with the specific structure of a model if known
}

interface ModelsPageData {
  navbar_ref?: NavbarRef[];
  footer_ref?: FooterRef[];
  models?: Model[];
}

async function fetchModelsData(): Promise<{
  navbar: NavbarRef;
  footer: FooterRef;
  models: Model[];
}> {
  try {
    const result = await stack
      .contentType("models_page")
      .entry("blt59c0e9d0220fcbab")
      .includeReference([
        "navbar_ref",
        "footer_ref",
        "models",
        "models.features",
      ])
      .fetch() as ModelsPageData;

    const navbar = result.navbar_ref?.[0] || {};
    const footer = result.footer_ref?.[0] || {};
    const models = result.models || [];

    return { navbar, footer, models };
  } catch (error) {
    console.error("Failed to fetch models data:", error);
    throw error;
  }
}



export default function BrowseModels() {
  const [models, setModels] = useState<{ [key: string]: any }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [navbarData, setNavbarData] = useState<{ [key: string]: any }>({});
  const [footerData, setFooterData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { navbar, footer, models } = await fetchModelsData();
        setNavbarData(navbar);
        setFooterData(footer);
        setModels(models);
  
        const tags = new Set(models.flatMap((model) => model.tags || []));
        setAvailableTags(Array.from(tags));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, []);
  

  const filteredModels = models.filter((model: any) => {
    const matchesSearch = model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => model.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col">
        <NavbarSkeleton />
        <main className="flex-1 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <ModelCardSkeleton key={i} />
            ))}
          </div>
        </main>
        <FooterSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar menuItems={navbarData.menu_links || []} />


      
      <main className="flex-1 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Browse Models</h1>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
  {/* Search Bar */}
  <div className="relative flex-1 max-w-xl"> {/* Increased max width */}
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
    <Input
      placeholder="Search models..."
      className="w-full pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-400"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

  {/* Badge Section */}
  <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:flex-1"> {/* Adds top margin for separation */}
    {availableTags.map((tag) => (
      <Badge
        key={tag}
        variant={selectedTags.includes(tag) ? "default" : "outline"}
        //className="bg-zinc-900 cursor-default"
        className={`cursor-pointer ${
          selectedTags.includes(tag)
            ? "bg-purple-600 hover:bg-purple-700 "
            : "border-zinc-800 hover:border-zinc-700 text-zinc-400 "
        }`}
        onClick={() => toggleTag(tag)}
      >
        {tag}
      </Badge>
    ))}
  </div>
</div>

          </div>
        </div>

        {filteredModels.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400">No models found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredModels.map((model: any) => (
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
        )}
      </main>

      <Footer
  links={footerData.links || []}
  social_links={footerData.social_links || []}
  copyright={footerData.copyright || ""}
 />
    </div>
  );
}