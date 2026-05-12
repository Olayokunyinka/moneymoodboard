import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { JsonLd } from "@/components/site/JsonLd";
import yinkaPhoto from "@/assets/yinka-olayokun.jpg";
import { absUrl, canonical, hreflangLinks } from "@/lib/seo";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About MoneyMoodBoard | Smarter Money Decisions for Real Life" },
      { name: "description", content: "Meet the founder, our mission, editorial standards, and how we make money, plain-English personal finance, no jargon, no judgment." },
      { property: "og:title", content: "About MoneyMoodBoard" },
      { property: "og:description", content: "Smarter money decisions for your real life, built by founder Yinka Olayokun." },
    ],
    links: [canonical("/about"), ...hreflangLinks("/about")],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
      <PageHero
        title="Smarter money moves, one decision at a time"
        intro="Whether you're rebuilding credit, side-hustling to survive, or trying to escape debt without shame, this is your judgment-free money zone."
      />

      <section className="mt-10 space-y-6 text-foreground/85">
        <h2 className="text-2xl font-bold">Our mission</h2>
        <p>
          At MoneyMoodBoard, we believe financial freedom isn't about being
          rich, it's about feeling safe, in control, and confident with money.
          We started this platform to answer the <em>real</em> questions
          20-somethings and early earners actually face: Why did my credit drop
          after I paid off a loan? How do I save when I barely make enough? Is
          BNPL dumb? Can I build credit as a freelancer?
        </p>
        <p>
          We blend real talk, research-backed content, and practical tools to
          help you make <em>one better money move at a time.</em>
        </p>

        <h2 className="text-2xl font-bold">Who we're for</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-foreground/85">
          <li>20-somethings figuring out adult money stuff</li>
          <li>Creatives, students and freelancers with variable income</li>
          <li>Anyone trying to rebuild credit or save without shame</li>
          <li>People sick of jargon and tired of being talked down to</li>
        </ul>

        <h2 className="text-2xl font-bold">Meet the founder, Yinka Olayokun</h2>
        <div className="rounded-2xl border border-border bg-card p-6 md:p-7">
          <div className="flex items-start gap-4">
            <img
              src={yinkaPhoto}
              alt="Yinka Olayokun, Founder and Editor of MoneyMoodBoard"
              width={96}
              height={96}
              loading="eager"
              className="h-24 w-24 shrink-0 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-foreground text-lg">Yinka Olayokun</p>
              <p className="text-sm text-primary font-medium">Founder & Editor</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Digital strategist, financial-literacy nerd, and the voice
                behind MoneyMoodBoard.
              </p>
            </div>
          </div>
        </div>
        <p>
          Hi, I'm Yinka. I started this platform because I got tired of reading
          generic money advice that didn't apply to people like me, people
          living real life, managing inconsistent income, debt, and goals.
        </p>
        <p className="font-medium text-foreground">I believe:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-foreground/85">
          <li>You can build credit <em>without carrying debt</em>.</li>
          <li>Budgeting shouldn't feel like punishment.</li>
          <li>
            Everyone deserves judgment-free money guidance, especially Black,
            Brown, immigrant, and underserved communities.
          </li>
        </ul>
        <p>
          If you've ever asked, <em>"Why is nobody explaining this in plain
          English?"</em>, this space is for you.
        </p>

        <h2 className="text-2xl font-bold">Why "Money Mood Board"?</h2>
        <p>
          A mood board inspires vision, clarity, and identity. We created one
          for your money life. Money is deeply emotional, fear, freedom,
          shame, joy, and we're here to help you make financial decisions that{" "}
          <em>feel better</em> and <em>build power.</em>
        </p>

        <h2 className="text-2xl font-bold">Our editorial standards</h2>
        <p>
          Every guide is researched against primary sources (regulators,
          peer-reviewed research, official documentation), drafted, and
          reviewed at least once a quarter for changes in law, rates or product
          availability. When we get something wrong, we correct it publicly and
          add a note.
        </p>

        <h2 className="text-2xl font-bold">How we make money</h2>
        <p>
          MoneyMoodBoard runs on display advertising and, occasionally,
          affiliate partnerships with financial products we'd recommend
          regardless. Sponsored placements are clearly labelled. We never
          accept money to alter a review, change a ranking, or remove a
          critical comment. If a product is bad, we say so.
        </p>

        <h2 className="text-2xl font-bold">Want to collaborate?</h2>
        <p>
          We love partnering with platforms, creators, and journalists on
          credit & debt recovery, personal finance for freelancers, youth
          financial literacy, and money & mental health.
        </p>

        <h2 className="text-2xl font-bold">Contact</h2>
        <p>
          Editorial questions, corrections, partnerships and tips:{" "}
          <a href="mailto:hello@moneymoodboard.com" className="text-primary font-medium hover:underline">
            hello@moneymoodboard.com
          </a>
          .
        </p>
      </section>

      <div className="mt-12 -mx-4 md:-mx-6">
        <NewsletterCTA />
      </div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": "https://moneymoodboard.com/about#page",
            name: "About MoneyMoodBoard",
            url: "https://moneymoodboard.com/about",
            description:
              "Meet the founder, our mission, editorial standards, and how we make money.",
            isPartOf: { "@id": "https://moneymoodboard.com/#website" },
            about: { "@id": "https://moneymoodboard.com/#organization" },
            mainEntity: { "@id": "https://moneymoodboard.com/about/yinka-olayokun#person" },
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://moneymoodboard.com/about/yinka-olayokun#person",
            name: "Yinka Olayokun",
            jobTitle: "Founder & Editor",
            image: absUrl(yinkaPhoto),
            url: "https://moneymoodboard.com/about/yinka-olayokun",
            worksFor: { "@id": "https://moneymoodboard.com/#organization" },
            description:
              "Digital strategist, financial-literacy nerd, and the founder of MoneyMoodBoard.",
          },
        ]}
      />
    </div>
  );
}
