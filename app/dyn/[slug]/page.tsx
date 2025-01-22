// app/trynow/[slug]/page.tsx

'use client';

import { usePathname } from 'next/navigation';

export default function TryNowPage() {
  const pathname = usePathname(); // Get the current pathname
  const slug = pathname?.split('/').pop();  // Extract the slug from the URL path

  return (
    <div>
      <h1>Try Now - {slug}</h1>
      <p>This is the page for the model: {slug}</p>
    </div>
  );
}
