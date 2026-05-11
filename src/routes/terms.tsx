import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { TableOfContents } from "@/components/site/TableOfContents";
import { absUrl, canonical , hreflangLinks } from "@/lib/seo";

const LAST_UPDATED = "May 11, 2026";
const PATH = "/terms";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | MoneyMoodBoard" },
      { name: "description", content: "The legally binding terms governing your access to and use of MoneyMoodBoard, including disclaimers, intellectual property, liability and governing law." },
      { property: "og:title", content: "Terms of Use | MoneyMoodBoard" },
      { property: "og:description", content: "Read the terms governing your use of MoneyMoodBoard." },
    ],
    links: [canonical(PATH), ...hreflangLinks(PATH)],
  }),
  component: TermsPage,
});

const SECTIONS = [
  "Acceptance of these terms",
  "Eligibility",
  "Licence to use the site",
  "Intellectual property",
  "User submissions",
  "Acceptable use",
  "Third-party links and affiliate disclosure",
  "Financial information disclaimer",
  "Disclaimer of warranties",
  "Limitation of liability",
  "Indemnity",
  "Termination",
  "Governing law and jurisdiction",
  "Dispute resolution",
  "Changes to these terms",
  "Severability and entire agreement",
  "Contact",
];

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Terms" }]} />
      <PageHero
        title="Terms of Use"
        intro={`These terms form a legally binding agreement between you and MoneyMoodBoard governing your access to and use of moneymoodboard.com and any associated tools, newsletters and services. Please read them carefully. Last updated: ${LAST_UPDATED}.`}
      />

      <TableOfContents sections={SECTIONS} />

      <div className="mt-10 space-y-10 text-foreground/85 leading-relaxed">
        <section id="acceptance-of-these-terms" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Acceptance of these terms</h2>
          <p className="mt-3">By accessing or using MoneyMoodBoard, you agree to be bound by these Terms of Use, our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and our <a href="/disclaimer" className="text-primary hover:underline">Editorial Disclaimer</a>. If you do not agree, you must stop using the site.</p>
        </section>

        <section id="eligibility" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Eligibility</h2>
          <p className="mt-3">The site is intended for users aged 16 or over (13 or over in jurisdictions where the local minimum is lower, such as the United States under COPPA). By using the site, you confirm you meet this age requirement and have the legal capacity to enter into this agreement.</p>
        </section>

        <section id="licence-to-use-the-site" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Licence to use the site</h2>
          <p className="mt-3">We grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the site for personal, non-commercial purposes, subject to these terms. All other rights are reserved.</p>
        </section>

        <section id="intellectual-property" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Intellectual property</h2>
          <p className="mt-3">All content on the site — including text, graphics, logos, code, and the "MoneyMoodBoard" name and brand — is owned by MoneyMoodBoard or its licensors and is protected by copyright, trade-mark and other intellectual property laws.</p>
          <p className="mt-3">You may share short excerpts of our articles with clear attribution and a link back to the source page. You may not republish full articles, host them under another brand, or use our content to train or fine-tune machine-learning models without our prior written permission. Reproducing our calculators or tool outputs commercially is prohibited.</p>
        </section>

        <section id="user-submissions" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">User submissions</h2>
          <p className="mt-3">When you submit information via the newsletter form, contact email or any other channel, you grant us a worldwide, royalty-free licence to use that information for the purpose of operating the service and responding to you. You confirm that the information is accurate and that you have the right to provide it.</p>
        </section>

        <section id="acceptable-use" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Acceptable use</h2>
          <p className="mt-3">You agree not to: (a) use the site in any way that breaches applicable law; (b) probe, scan or attempt to compromise the security of the site; (c) scrape or automate access in volumes that interfere with site operation; (d) use the site to send unsolicited communications; or (e) use the site to develop or train competing products or AI models.</p>
        </section>

        <section id="third-party-links-and-affiliate-disclosure" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Third-party links and affiliate disclosure</h2>
          <p className="mt-3">Some links on MoneyMoodBoard are affiliate links. If you click and complete a qualifying action with the merchant, we may receive a commission at no additional cost to you. Affiliate relationships never influence our editorial coverage or rankings.</p>
          <p className="mt-3">We are not responsible for the content, terms or privacy practices of third-party websites we link to. Linking does not imply endorsement.</p>
        </section>

        <section id="financial-information-disclaimer" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Financial information disclaimer</h2>
          <p className="mt-3">MoneyMoodBoard publishes general educational information. We are not a financial adviser, broker-dealer, investment adviser, tax adviser, accountant, lawyer or insurance agent, and we do not act as a fiduciary. Nothing on the site is personalised financial, legal, tax or insurance advice. Always consult a qualified, licensed professional before making decisions about your specific situation. See our <a href="/disclaimer" className="text-primary hover:underline">Editorial Disclaimer</a> for the full statement.</p>
        </section>

        <section id="disclaimer-of-warranties" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Disclaimer of warranties</h2>
          <p className="mt-3">The site and its content are provided on an "as is" and "as available" basis. To the maximum extent permitted by law, we disclaim all warranties, whether express or implied, including merchantability, fitness for a particular purpose, accuracy, non-infringement and uninterrupted availability. We do not warrant that the site will be error-free or that any tool's output will be accurate for your circumstances.</p>
        </section>

        <section id="limitation-of-liability" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Limitation of liability</h2>
          <p className="mt-3">To the maximum extent permitted by law, MoneyMoodBoard, its founder, contributors and service providers will not be liable for any indirect, incidental, special, consequential, exemplary or punitive damages, or for lost profits, revenues, data or goodwill, arising out of or in connection with your use of the site, even if advised of the possibility.</p>
          <p className="mt-3">Our aggregate liability for all claims arising out of or related to the site is limited to the greater of (a) USD 100 or (b) the amount you have paid us in the 12 months preceding the claim.</p>
          <p className="mt-3"><strong>Important note for consumers in the UK and EEA:</strong> nothing in these terms limits or excludes liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be limited under applicable consumer-protection law. Your statutory rights as a consumer are not affected.</p>
        </section>

        <section id="indemnity" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Indemnity</h2>
          <p className="mt-3">You agree to indemnify and hold MoneyMoodBoard harmless from any claim, loss, liability or expense (including reasonable legal fees) arising out of your breach of these terms, your misuse of the site, or your violation of any law or third-party right.</p>
        </section>

        <section id="termination" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Termination</h2>
          <p className="mt-3">We may suspend or terminate your access to the site at any time, with or without notice, if we believe you have breached these terms or where required by law. The sections that by their nature should survive termination (intellectual property, disclaimers, limitation of liability, indemnity, governing law and dispute resolution) will survive.</p>
        </section>

        <section id="governing-law-and-jurisdiction" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Governing law and jurisdiction</h2>
          <p className="mt-3">For users resident in the United Kingdom or the European Economic Area, these terms are governed by the laws of England and Wales, and the courts of England and Wales have non-exclusive jurisdiction. For users resident in the United States or elsewhere, these terms are governed by the laws of the State of Delaware, USA, without regard to conflict-of-laws principles, and you consent to the personal jurisdiction of the state and federal courts located in Delaware. Mandatory consumer-protection laws of your country of residence continue to apply where they cannot be excluded.</p>
        </section>

        <section id="dispute-resolution" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Dispute resolution</h2>
          <p className="mt-3">Before filing a claim, you agree to contact us at <a href="mailto:hello@moneymoodboard.com" className="text-primary hover:underline">hello@moneymoodboard.com</a> and attempt to resolve the dispute informally for at least 30 days. EU consumers may also use the European Commission's <a href="https://ec.europa.eu/consumers/odr" className="text-primary hover:underline">Online Dispute Resolution platform</a>.</p>
        </section>

        <section id="changes-to-these-terms" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Changes to these terms</h2>
          <p className="mt-3">We may update these terms from time to time. The "last updated" date at the top reflects the latest revision. Material changes will be highlighted on this page. Your continued use of the site after a change becomes effective constitutes acceptance.</p>
        </section>

        <section id="severability-and-entire-agreement" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Severability and entire agreement</h2>
          <p className="mt-3">If any provision of these terms is held unenforceable, the remaining provisions remain in full force. These terms, together with our Privacy Policy and Editorial Disclaimer, constitute the entire agreement between you and MoneyMoodBoard regarding the site and supersede any prior agreements.</p>
        </section>

        <section id="contact" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground">Contact</h2>
          <p className="mt-3">Questions about these terms can be sent to <a href="mailto:hello@moneymoodboard.com" className="text-primary hover:underline">hello@moneymoodboard.com</a>.</p>
        </section>
      </div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Terms of Use",
            url: absUrl(PATH),
            description: "Terms of Use governing your access to MoneyMoodBoard.",
            inLanguage: "en-US",
            dateModified: "2026-05-11",
          },
        ]}
      />
    </div>
  );
}
