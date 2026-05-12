import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { JsonLd } from "@/components/site/JsonLd";
import { AdSlot } from "@/components/site/AdSlot";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const SITE_URL = "https://moneymoodboard.com";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The guide you're looking for doesn't exist or has been moved.
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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MoneyMoodBoard, Personal Finance Guides, Tools & Tips" },
      {
        name: "description",
        content:
          "Free personal finance guides on budgeting, credit cards, investing, saving and retirement. Built for beginners and beyond.",
      },
      { name: "author", content: "MoneyMoodBoard" },
      { property: "og:site_name", content: "MoneyMoodBoard" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: `${SITE_URL}/og-default.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: `${SITE_URL}/og-default.jpg` },
      ...(ADSENSE_CLIENT
        ? [{ name: "google-adsense-account", content: ADSENSE_CLIENT }]
        : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
    scripts: [
      ...(GA_ID
        ? [
            {
              src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
              async: true,
            },
            {
              children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
            },
          ]
        : []),
      ...(ADSENSE_CLIENT
        ? [
            {
              src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`,
              async: true,
              crossOrigin: "anonymous" as const,
            },
          ]
        : []),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
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
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "MoneyMoodBoard",
            alternateName: "MMB",
            url: SITE_URL,
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/logo.png`,
              width: 512,
              height: 512,
            },
            description:
              "Independent personal-finance publication for U.S. earners, plain-English guides on budgeting, credit, saving, investing, retirement, banking and debt, paired with free no-signup calculators.",
            knowsAbout: [
              "Budgeting",
              "Credit cards",
              "Investing",
              "Retirement planning",
              "Saving",
              "Banking",
              "Debt repayment",
              "Personal taxes",
              "Insurance",
            ],
            areaServed: { "@type": "Country", name: "United States" },
            inLanguage: "en-US",
            founder: {
              "@type": "Person",
              "@id": `${SITE_URL}/about/yinka-olayokun#person`,
              name: "Yinka Olayokun",
            },
            publishingPrinciples: `${SITE_URL}/editorial-policy`,
            actionableFeedbackPolicy: `${SITE_URL}/corrections`,
            correctionsPolicy: `${SITE_URL}/corrections`,
            ethicsPolicy: `${SITE_URL}/editorial-policy`,
            diversityPolicy: `${SITE_URL}/about`,
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: "MoneyMoodBoard",
            url: SITE_URL,
            inLanguage: "en-US",
            publisher: { "@id": `${SITE_URL}/#organization` },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE_URL}/?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none">
        <AdSlot location="anchor" className="mx-auto max-w-5xl" />
      </div>
      <SonnerToaster />
    </QueryClientProvider>
  );
}
