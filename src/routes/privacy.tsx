import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { TableOfContents } from "@/components/site/TableOfContents";
import { absUrl, canonical , hreflangLinks } from "@/lib/seo";

const LAST_UPDATED = "May 11, 2026";
const PATH = "/privacy";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | MoneyMoodBoard" },
      { name: "description", content: "How MoneyMoodBoard collects, uses, shares and protects your personal information, including your rights under CCPA/CPRA, UK GDPR and EU GDPR." },
      { property: "og:title", content: "Privacy Policy | MoneyMoodBoard" },
      { property: "og:description", content: "Full privacy notice covering data collection, cookies, advertising, international transfers and your rights." },
    ],
    links: [canonical(PATH), ...hreflangLinks(PATH)],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  "Who we are",
  "Information we collect",
  "How we use your information",
  "Legal bases (EU/UK GDPR)",
  "Cookies and tracking technologies",
  "Advertising and analytics partners",
  "How we share information",
  "International data transfers",
  "Data retention",
  "Security",
  "Your rights, United States (CCPA/CPRA)",
  "Your rights, EU/UK (GDPR)",
  "Children's privacy",
  "Do Not Track and Global Privacy Control",
  "Changes to this policy",
  "Contact the data controller",
];

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Privacy" }]} />
      <PageHero
        title="Privacy Policy"
        intro={`This notice explains what personal data MoneyMoodBoard collects, why we collect it, how we use and share it, and the rights you have over it. It applies to visitors worldwide, with specific sections for readers in the United States, the United Kingdom, and the European Economic Area. Last updated: ${LAST_UPDATED}.`}
      />

      <TableOfContents sections={SECTIONS} />

      <div className="mt-10 space-y-10 text-foreground/85 leading-relaxed">
        <section id="who-we-are" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Who we are</h2>
          <p className="mt-3">
            "MoneyMoodBoard", "we", "us" and "our" refer to the operator of
            <a href="https://moneymoodboard.com" className="text-primary hover:underline"> moneymoodboard.com</a>.
            For UK and EU GDPR purposes, MoneyMoodBoard is the data controller
            for personal data processed through this website. You can reach
            our privacy team at{" "}
            <a href="mailto:privacy@moneymoodboard.com" className="text-primary hover:underline">privacy@moneymoodboard.com</a>.
          </p>
        </section>

        <section id="information-we-collect" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Information we collect</h2>
          <p className="mt-3">We collect the following categories of personal information:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong>Information you provide directly</strong>, your email address when you subscribe to our newsletter, and any details you include when you contact us by email.</li>
            <li><strong>Automatically collected data</strong>, IP address, device type, browser, operating system, referring URL, pages viewed, time on page, and approximate location (city/country) from server logs and analytics scripts.</li>
            <li><strong>Cookies and similar technologies</strong>, small files placed in your browser for essential site functions, analytics, and advertising. See "Cookies and tracking technologies" below.</li>
            <li><strong>Advertising identifiers</strong>, third-party advertising networks may set cookies or use mobile advertising IDs to serve interest-based ads.</li>
          </ul>
          <p className="mt-3">We do not knowingly collect government identifiers, financial account numbers, biometric data, precise geolocation, or health information.</p>
        </section>

        <section id="how-we-use-your-information" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">How we use your information</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>To deliver the website and the content you request.</li>
            <li>To send the newsletter you've subscribed to and respond to your enquiries.</li>
            <li>To measure traffic, diagnose technical issues, and improve our content and tools.</li>
            <li>To serve and measure advertising, including, where lawful, interest-based advertising.</li>
            <li>To comply with legal obligations and enforce our Terms of Use.</li>
          </ul>
          <p className="mt-3">We do not sell your personal information for money. Some sharing with advertising partners may qualify as a "sale" or "share" under California law, see your CCPA/CPRA rights below.</p>
        </section>

        <section id="legal-bases-eu-uk-gdpr" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Legal bases (EU/UK GDPR)</h2>
          <p className="mt-3">Where the UK GDPR or EU GDPR applies, we rely on the following lawful bases under Article 6:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong>Consent</strong>, for non-essential cookies, advertising personalisation, and newsletter sign-up. You can withdraw consent at any time.</li>
            <li><strong>Legitimate interests</strong>, to operate, secure and improve the site, and to measure aggregate audience metrics, where these interests are not overridden by your rights.</li>
            <li><strong>Legal obligation</strong>, to retain records and respond to lawful requests from regulators or courts.</li>
          </ul>
        </section>

        <section id="cookies-and-tracking-technologies" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Cookies and tracking technologies</h2>
          <p className="mt-3">We use three categories of cookies and similar technologies:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong>Strictly necessary</strong>, required for core functionality such as page navigation, security, and remembering your cookie preferences. These do not require consent.</li>
            <li><strong>Analytics</strong>, help us understand how readers find and use our content (for example, Google Analytics). Aggregated, not used to identify you.</li>
            <li><strong>Advertising</strong>, set by ad networks (such as Google AdSense) to deliver and measure ads, and where you've consented, to personalise them.</li>
          </ul>
          <p className="mt-3">You can control cookies through your browser settings, refuse non-essential cookies via our consent banner where shown, and opt out of personalised advertising through industry tools such as the <a href="https://optout.aboutads.info/" className="text-primary hover:underline">DAA</a>, <a href="https://optout.networkadvertising.org/" className="text-primary hover:underline">NAI</a>, or <a href="https://www.youronlinechoices.eu/" className="text-primary hover:underline">YourOnlineChoices</a> (EU).</p>
        </section>

        <section id="advertising-and-analytics-partners" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Advertising and analytics partners</h2>
          <p className="mt-3">We work with third parties whose privacy practices we encourage you to review:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong>Google AdSense</strong>, display advertising and ad measurement (<a href="https://policies.google.com/technologies/ads" className="text-primary hover:underline">policy</a>).</li>
            <li><strong>Google Analytics</strong>, audience measurement with IP-anonymisation enabled (<a href="https://policies.google.com/privacy" className="text-primary hover:underline">policy</a>).</li>
            <li><strong>Supabase</strong>, hosts our newsletter database and form submissions (<a href="https://supabase.com/privacy" className="text-primary hover:underline">policy</a>).</li>
            <li><strong>Email service provider</strong>, sends our newsletter and operational email.</li>
          </ul>
        </section>

        <section id="how-we-share-information" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">How we share information</h2>
          <p className="mt-3">We share personal data with: (i) the service providers listed above, acting as processors on our instructions; (ii) advertising partners, where you have consented or where permitted by law; (iii) law-enforcement, regulators or other parties where required by valid legal process; and (iv) any successor entity in the event of a merger, acquisition or asset sale.</p>
        </section>

        <section id="international-data-transfers" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">International data transfers</h2>
          <p className="mt-3">Our service providers may be located outside the United Kingdom and the European Economic Area, including in the United States. Where we transfer personal data outside the UK or EEA, we rely on adequacy decisions where they exist or on the European Commission's Standard Contractual Clauses (SCCs) and the UK International Data Transfer Addendum, together with supplementary technical and organisational measures.</p>
        </section>

        <section id="data-retention" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Data retention</h2>
          <p className="mt-3">We keep newsletter records for as long as you remain subscribed plus 24 months for suppression-list compliance. Server logs and analytics data are retained for up to 26 months in aggregate form. Email correspondence is retained for up to 36 months unless a longer period is required by law.</p>
        </section>

        <section id="security" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Security</h2>
          <p className="mt-3">We use HTTPS across the site, encrypt data in transit, restrict database access via Row Level Security, and limit administrative access on a least-privilege basis. No internet transmission is ever 100% secure, so we encourage strong, unique passwords and a password manager.</p>
        </section>

        <section id="your-rights-united-states-ccpa-cpra" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Your rights, United States (CCPA/CPRA)</h2>
          <p className="mt-3">If you are a California resident, the California Consumer Privacy Act, as amended by the CPRA, gives you the right to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Know what personal information we have collected about you and how we use it.</li>
            <li>Request a copy in a portable format.</li>
            <li>Request correction of inaccurate personal information.</li>
            <li>Request deletion, subject to legal exceptions.</li>
            <li>Opt out of the "sale" or "sharing" of personal information for cross-context behavioural advertising.</li>
            <li>Limit the use of sensitive personal information (we do not knowingly collect any).</li>
            <li>Be free from discrimination for exercising your rights.</li>
            <li>Designate an authorised agent to act on your behalf.</li>
          </ul>
          <p className="mt-3">To exercise these rights, email <a href="mailto:privacy@moneymoodboard.com" className="text-primary hover:underline">privacy@moneymoodboard.com</a> with the subject line "California Privacy Request". We may need to verify your identity before responding. Similar rights are available to residents of Colorado, Connecticut, Virginia, Utah and other states with comprehensive privacy laws.</p>
        </section>

        <section id="your-rights-eu-uk-gdpr" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Your rights, EU/UK (GDPR)</h2>
          <p className="mt-3">If you are in the United Kingdom or the European Economic Area, you have the right to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Access the personal data we hold about you (Art. 15).</li>
            <li>Have inaccurate data corrected (Art. 16).</li>
            <li>Have your data erased ("right to be forgotten") (Art. 17).</li>
            <li>Restrict processing (Art. 18).</li>
            <li>Receive your data in a portable format (Art. 20).</li>
            <li>Object to processing based on legitimate interests, including profiling (Art. 21).</li>
            <li>Withdraw consent at any time, without affecting prior lawful processing.</li>
            <li>Lodge a complaint with your supervisory authority, the <a href="https://ico.org.uk/" className="text-primary hover:underline">UK Information Commissioner's Office (ICO)</a> in the UK, or your national data protection authority in the EU.</li>
          </ul>
        </section>

        <section id="children-s-privacy" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Children's privacy</h2>
          <p className="mt-3">MoneyMoodBoard is intended for adults (16+ in the EU/UK; 13+ in the US under COPPA). We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, contact us and we will delete it.</p>
        </section>

        <section id="do-not-track-and-global-privacy-control" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Do Not Track and Global Privacy Control</h2>
          <p className="mt-3">We honour the <strong>Global Privacy Control (GPC)</strong> signal as a valid opt-out of the "sale" or "sharing" of personal information under California and similar US state laws. We do not currently respond to legacy "Do Not Track" browser signals because there is no industry standard for them.</p>
        </section>

        <section id="changes-to-this-policy" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Changes to this policy</h2>
          <p className="mt-3">We may update this notice from time to time. Material changes will be flagged at the top of the page, and we will update the "last updated" date. Continued use of the site after a change constitutes acceptance of the revised policy.</p>
        </section>

        <section id="contact-the-data-controller" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Contact the data controller</h2>
          <p className="mt-3">For any privacy question or to exercise your rights, write to <a href="mailto:privacy@moneymoodboard.com" className="text-primary hover:underline">privacy@moneymoodboard.com</a>. We aim to respond within 30 days (45 days for CCPA/CPRA requests, extendable in accordance with law).</p>
        </section>
      </div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy",
            url: absUrl(PATH),
            description: "MoneyMoodBoard's privacy notice covering CCPA/CPRA, UK GDPR and EU GDPR rights.",
            inLanguage: "en-US",
            dateModified: "2026-05-11",
          },
        ]}
      />
    </div>
  );
}
