

interface Link {
  href: string;
  title: string;
}
interface NavigationLink {
  link: Link; // Matches the structure in the `links` array
}
interface SocialLink {
  link: Link;
}

interface FooterProps {
  links: NavigationLink[];
  social_links: SocialLink[];
  copyright: string;
}

export function Footer({ links, social_links, copyright }: FooterProps) {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Navigation Links */}
          <div>
            <h4 className="text-xl font-semibold text-white">Links</h4>
            <ul className="mt-4 space-y-2">
              {links.map((hlink, index) => (
                <li key={index}>
                  <a
                    href={hlink.link.href}
                    className="text-zinc-400 hover:text-white "
                  >
                    {hlink.link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-white">Follow Us</h4>
            <ul className="mt-4 space-y-2">
              {social_links.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white "
                  >
                    {social.link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright */}
          <div className="text-zinc-400">
            <p>{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
