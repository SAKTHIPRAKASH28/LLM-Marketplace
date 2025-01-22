import Head from "next/head";
import { SEOProps } from "@/types";

export function SEO({ title, description, keywords, og_image }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(", ")} />}
      {og_image && <meta property="og:image" content={og_image} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
}
