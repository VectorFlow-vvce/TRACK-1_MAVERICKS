import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BenefitBridge — Discover Government Benefits" },
      { name: "description", content: "AI-powered platform that helps Indian citizens discover government schemes, subsidies and benefits in their own language." },
      { name: "author", content: "BenefitBridge" },
      { property: "og:title", content: "BenefitBridge — Discover Government Benefits" },
      { property: "og:description", content: "AI-powered platform that helps Indian citizens discover government schemes, subsidies and benefits in their own language." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "BenefitBridge — Discover Government Benefits" },
      { name: "twitter:description", content: "AI-powered platform that helps Indian citizens discover government schemes, subsidies and benefits in their own language." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bec9d993-ef93-49e4-be3a-6302a393f7b9/id-preview-fc5a34ef--66527bd9-fa01-4de8-892f-c751bd7f1137.lovable.app-1777287084470.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bec9d993-ef93-49e4-be3a-6302a393f7b9/id-preview-fc5a34ef--66527bd9-fa01-4de8-892f-c751bd7f1137.lovable.app-1777287084470.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <Outlet />
      <Toaster position="top-center" richColors />
    </LanguageProvider>
  );
}
