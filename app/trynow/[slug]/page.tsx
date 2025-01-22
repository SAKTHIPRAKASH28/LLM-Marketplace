"use client";
import React, { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { NavbarSkeleton, FooterSkeleton, DocsSkeleton } from "@/components/LoadingSkeletons";
import stack from "../../../contentstackConfig";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation

// Define SetupStep interface for data
interface SetupStep {
  step: string;
  command?: string;
  code?: string;
}

async function fetchAPIDocs(slug: string) {
  try {
    const docsData = await stack
      .contentType("api_docs")
      .entry()
      .query({ slug })
      .find();

    return docsData;
  } catch (error) {
    console.error("Error fetching API docs:", error);
    throw error;
  }
}

async function fetchNavbarAndFooterData() {
  try {
    const navbarData = await stack
      .contentType("llm_store_navbar")
      .entry("blt2d9312ce7631d045")
      .fetch();

    const footerData = await stack
      .contentType("llm_store_footer")
      .entry("bltde15764bad558ff4")
      .fetch();

    return { navbar: navbarData, footer: footerData };
  } catch (error) {
    console.error("Error fetching navbar and footer data:", error);
    throw error;
  }
}

export default function TryNowPage() {
  const pathname = usePathname(); // Get the current pathname
  const slug = pathname?.split('/').pop(); // Extract slug from the URL path
  
  const [activeTab, setActiveTab] = useState<'typescript' | 'javascript' | 'python'>('typescript');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [navbarData, setNavbarData] = useState(null);
  const [footerData, setFooterData] = useState(null);
  const [apiDocsData, setApiDocsData] = useState(null);
  const [notFound, setNotFound] = useState(false); // New state for model not found

  useEffect(() => {
    async function loadNavbarAndFooter() {
      try {
        const { navbar, footer } = await fetchNavbarAndFooterData();
        setNavbarData(navbar);
        setFooterData(footer);
      } catch (error) {
        console.error("Failed to load navbar and footer data:", error);
      }
    }

    loadNavbarAndFooter();
  }, []);

  useEffect(() => {
    async function loadDocs() {
      try {
        const docsData = await fetchAPIDocs(slug);

        // Check if no data is found
        if (!docsData.entries || docsData.entries.length === 0) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        // Parse the JSON string for each language (js, ts, python)
        const jsSetupSteps = JSON.parse(docsData.entries[0].js.children[0].children[0].text).setup_steps;
        const tsSetupSteps = JSON.parse(docsData.entries[0].ts.children[0].children[0].text).setup_steps;
        const pythonSetupSteps = JSON.parse(docsData.entries[0].python.children[0].children[0].text).setup_steps;

        console.log("Parsed JS Setup Steps:", jsSetupSteps);
        console.log("Parsed TS Setup Steps:", tsSetupSteps);
        console.log("Parsed Python Setup Steps:", pythonSetupSteps);

        // Store the parsed setup steps in state
        setApiDocsData({ js: jsSetupSteps, ts: tsSetupSteps, python: pythonSetupSteps });
        setNotFound(false); // Reset not found state in case data is found
        setLoading(false);
      } catch (error) {
        console.error("Failed to load API docs:", error);
        setLoading(false);
      }
    }

    loadDocs();
  }, [slug]);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderSetupSteps = (steps: SetupStep[]) => {
    return steps.map((step, index) => (
      <div key={index} className="mb-6 last:mb-0">
        <h3 className="text-lg font-medium text-zinc-100 mb-2">{step.step}</h3>
        {step.command && (
          <div className="relative group">
            <pre className="bg-zinc-900 rounded-lg p-4 text-sm text-zinc-300 font-mono overflow-x-auto">
              {step.command}
            </pre>
            <button
              onClick={() => copyToClipboard(step.command!, index)}
              className="absolute top-3 right-3 p-2 rounded-md hover:bg-zinc-700 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Copy code"
            >
              {copiedIndex === index ? (
                <span className="text-green-400 text-sm">Copied!</span>
              ) : (
                <Copy className="w-4 h-4 text-zinc-400" />
              )}
            </button>
          </div>
        )}
        {step.code && (
          <div className="relative group">
            <pre className="bg-zinc-900 rounded-lg p-4 text-sm text-zinc-300 font-mono overflow-x-auto">
              {step.code}
            </pre>
            <button
              onClick={() => copyToClipboard(step.code!, index)}
              className="absolute top-3 right-3 p-2 rounded-md hover:bg-zinc-700 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Copy code"
            >
              {copiedIndex === index ? (
                <span className="text-green-400 text-sm">Copied!</span>
              ) : (
                <Copy className="w-4 h-4 text-zinc-400" />
              )}
            </button>
          </div>
        )}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col">
        <NavbarSkeleton />
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <DocsSkeleton />
        </main>
        <FooterSkeleton />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col">
        <Navbar menuItems={navbarData.menu_links || []} />
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-zinc-200">Model Not Found</h2>
            <p className="mt-4 text-lg text-zinc-400">The requested model could not be found. Please check the URL or try again later.</p>
          </div>
        </main>
        <Footer links={footerData.links || []} social_links={footerData.social_links || []} copyright={footerData.copyright || ""} />
      </div>
    );
  }

  if (!navbarData || !footerData || !apiDocsData) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-red-500 text-xl">Failed to load data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar menuItems={navbarData.menu_links || []} />
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-zinc-900 rounded-xl p-1 inline-flex mb-8 overflow-x-auto max-w-max mx-auto justify-center">
          {(['typescript', 'javascript', 'python'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === lang
                  ? 'bg-purple-600 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-zinc-900/50 rounded-xl p-4 md:p-8">
          {activeTab === 'typescript' && renderSetupSteps(apiDocsData.ts)}
          {activeTab === 'javascript' && renderSetupSteps(apiDocsData.js)}
          {activeTab === 'python' && renderSetupSteps(apiDocsData.python)}
        </div>
      </div>

      <Footer links={footerData.links || []} social_links={footerData.social_links || []} copyright={footerData.copyright || ""} />
    </div>
  );
}
