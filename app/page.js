import ScrollProgress from "./scroll-progress";
import Image from "next/image";
import {
  BookOpen, Binoculars, AlertTriangle, Compass, LayoutGrid, GitBranch,
  Globe, Megaphone,
  ChevronRight, Target, Lightbulb, XCircle, CheckCircle2,
  Layers, Sparkles, Zap,
  CalendarCheck,
} from "lucide-react";

const S = () => <span className="corner-strip" aria-hidden="true" />;

const Li = ({ icon: Icon = ChevronRight, children, numbered }) => (
  <li className={numbered ? "li--numbered" : undefined}>
    {!numbered && <Icon className="li-icon" aria-hidden="true" />}
    <span>{children}</span>
  </li>
);

const SubHead = ({ children }) => (
  <p className="sub-head">{children}</p>
);

const Callout = ({ icon: Icon = Target, label, children }) => (
  <div className="callout">
    <p className="callout-label">
      <Icon className="callout-icon" aria-hidden="true" />
      <strong>{label}</strong>
    </p>
    <p className="callout-body">{children}</p>
  </div>
);

const TwistSlideFooter = () => (
  <div className="slide-brand-footer">
    <Image src="/l.png" alt="Twist Digital" width={200} height={56} className="slide-brand-footer__logo" />
  </div>
);

export default function HomePage() {
  const slides = [
    "Cover",
    "Strategy",
    "Current Situation",
    "What We Observed",
    "The Real Problem",
    "What Needs to Happen First",
    "Phase 1 Foundation",
    "Phase 2 Organic Growth",
    "Content Direction",
    "Website Direction",
    "Campaign Strategy",
    "Main Goal",
    "Timeline",
    "Closing",
    "Thank You",
  ];

  return (
    <>
      <ScrollProgress />
      <header className="topbar">
        <div className="topbar-left">
          <Image src="/logo.png" alt="Calsams Tea" width={280} height={56} className="topbar-logo" priority />
        </div>
        <nav className="slide-nav" aria-label="Slide navigation">
          {slides.map((label, idx) => (
            <a key={label} href={`#slide-${idx + 1}`} className="slide-nav-item">
              {idx + 1}
            </a>
          ))}
        </nav>
        {/* <PrintButton /> */}
      </header>

      <main className="deck">

        {/* ── Slide 1: Cover ── */}
        <section className="slide cover dark no-corner" id="slide-1">
          <div className="cover-bg-shape" aria-hidden="true" />
          <div className="cover-bg-shape cover-bg-shape--2" aria-hidden="true" />
          <div className="cover-bg-shape cover-bg-shape--3" aria-hidden="true" />
          <p className="slide-label">Slide 1 / 15</p>
          <h1>Marketing Proposal</h1>
          <h2>Calsams Tea</h2>
          <div className="prepared-by-row">
            <span className="prepared-by">Prepared by:</span>
            <Image src="/l.png" alt="Twist Digital" width={220} height={62} className="cover-logo" priority />
          </div>
        </section>

        {/* ── Slide 2: Strategy ── */}
        <section className="slide dark slide-footer-brand" id="slide-2">
          <S />
          <p className="slide-label">Slide 2 / 15</p>
          <h2 className="slide-title"><Compass />Strategy</h2>
          <p>
            The main idea is simple. Calsams already has a good product and a good brand feel. What it needs now
            is proper attention, cleaner structure, and a stronger online buying journey.
          </p>
          <p>
            Right now, the brand looks promising, but the online presence is not yet aligned enough to support real
            growth.
          </p>
          <SubHead>So the focus should be:</SubHead>
          <ul>
            <Li icon={ChevronRight}>Clean the digital presence</Li>
            <Li icon={ChevronRight}>Make the products more visible</Li>
            <Li icon={ChevronRight}>Build proper attention</Li>
            <Li icon={ChevronRight}>Use campaigns to turn that attention into sales</Li>
          </ul>
          <Callout icon={Target} label="Direction:">
            Bring structure first, then scale what works.
          </Callout>
          <TwistSlideFooter />
        </section>

        {/* ── Slide 3: Current Situation ── */}
        <section className="slide dark slide-footer-brand" id="slide-3">
          <S />
          <p className="slide-label">Slide 3 / 15</p>
          <h2 className="slide-title"><BookOpen />Current Situation</h2>
          <p>There is already something good here.</p>
          <SubHead>What we can see:</SubHead>
          <ul>
            <Li icon={CheckCircle2}>The brand has a premium feel</Li>
            <Li icon={CheckCircle2}>The tea concept has potential</Li>
            <Li icon={CheckCircle2}>There are multiple products that can be marketed</Li>
            <Li icon={CheckCircle2}>Some reels have already reached strong numbers</Li>
            <Li icon={CheckCircle2}>The brand has real-world exposure through tea tasting stalls and activations</Li>
          </ul>
          <Callout icon={Lightbulb} label="This means:">
            The potential is already there. The next step is to organise and present it better.
          </Callout>
          <TwistSlideFooter />
        </section>

        {/* ── Slide 4: What We Observed ── */}
        <section className="slide dark slide-footer-brand" id="slide-4">
          <S />
          <p className="slide-label">Slide 4 / 15</p>
          <h2 className="slide-title"><Binoculars />What We Observed</h2>
          <p>From what we reviewed, a few things stand out.</p>
          <div className="obs-grid">
            <div className="obs-col">
              <SubHead>Social media</SubHead>
              <ul>
                <Li icon={XCircle}>Instagram and Facebook are disconnected</Li>
                <Li icon={XCircle}>Some reels have reached over 12K views</Li>
                <Li icon={XCircle}>Reach is not converting into enough interaction</Li>
                <Li icon={XCircle}>Visibility is there, but content is not always strong enough to engage</Li>
              </ul>
            </div>
            <div className="obs-col">
              <SubHead>Product visibility</SubHead>
              <ul>
                <Li icon={XCircle}>Not all products are getting proper attention online</Li>
                <Li icon={XCircle}>The audience is not clearly seeing each product</Li>
                <Li icon={XCircle}>Each product needs its own visibility and communication</Li>
              </ul>
              <SubHead>Website</SubHead>
              <ul>
                <Li icon={XCircle}>The site supports the brand story more than direct buying</Li>
                <Li icon={XCircle}>Not enough buying action is built into the site</Li>
                <Li icon={XCircle}>Product options are limited in how they are presented</Li>
              </ul>
            </div>
            <div className="obs-col">
              <SubHead>Content</SubHead>
              <ul>
                <Li icon={XCircle}>There are generic videos, and more tea focused content is needed</Li>
                <Li icon={XCircle}>Tea tasting, flavour-focused, and product-specific reels</Li>
                <Li icon={XCircle}>Tea preparation and customer reaction moments</Li>
              </ul>
              <SubHead>Real-world brand moments</SubHead>
              <ul>
                <Li icon={CheckCircle2}>Stalls and tastings are strong trust builders</Li>
                <Li icon={XCircle}>They are not shown enough online (e.g. BMICH activations)</Li>
              </ul>
            </div>
          </div>
          <Callout icon={Target} label="Website formats to make clearer:">
            500g packs, 1kg packs, bundle offers, and gifting options, presented as obvious purchase choices.
          </Callout>
          <TwistSlideFooter />
        </section>

        {/* ── Slide 5: The Real Problem ── */}
        <section className="slide dark slide-footer-brand" id="slide-5">
          <S />
          <p className="slide-label">Slide 5 / 15</p>
          <h2 className="slide-title"><AlertTriangle />The Real Problem</h2>
          <p>The problem is not that Calsams lacks a good brand.</p>
          <Callout icon={Target} label="The real problem:">
            The brand is not getting enough structured attention, and when attention comes, the system is not ready
            enough to convert it.
          </Callout>
          <SubHead>Right now:</SubHead>
          <ul>
            <Li icon={XCircle}>The pages need work</Li>
            <Li icon={XCircle}>Product visibility needs work</Li>
            <Li icon={XCircle}>The website needs work</Li>
          </ul>
          <p>
            Before pushing hard on campaigns, the digital presence needs to be aligned properly.
          </p>
          <TwistSlideFooter />
        </section>

        {/* ── Slide 6: What Needs to Happen First ── */}
        <section className="slide dark slide-footer-brand" id="slide-6">
          <S />
          <p className="slide-label">Slide 6 / 15</p>
          <h2 className="slide-title"><LayoutGrid />What Needs to Happen First</h2>
          <p>Before we scale anything, we need to fix the base.</p>
          <SubHead>That means:</SubHead>
          <ul>
            <Li icon={CheckCircle2}>Connect Instagram and Facebook properly</Li>
            <Li icon={CheckCircle2}>Clean the profiles and make them feel complete</Li>
            <Li icon={CheckCircle2}>Align the visual direction</Li>
            <Li icon={CheckCircle2}>Make the pages feel active and trustworthy</Li>
            <Li icon={CheckCircle2}>Introduce a proper content calendar</Li>
            <Li icon={CheckCircle2}>Give each product clear visibility</Li>
            <Li icon={CheckCircle2}>Improve the website so it supports purchases better</Li>
          </ul>
          <Callout icon={AlertTriangle} label="Why this order matters:">
            Attention without structure gets wasted, and campaigns without a proper system become expensive.
          </Callout>
          <TwistSlideFooter />
        </section>

        {/* ── Slide 7: Phase 1 – Foundation ── */}
        <section className="slide dark slide-footer-brand" id="slide-7">
          <S />
          <p className="slide-label">Slide 7 / 15</p>
          <h2 className="slide-title"><CalendarCheck />Phase 1 Foundation (Month 1)</h2>
          <p>The first month should be about alignment and cleanup.</p>
          <SubHead>Main actions:</SubHead>
          <ul>
            <Li icon={CheckCircle2}>Connect Instagram and Facebook</Li>
            <Li icon={CheckCircle2}>Improve profile and page setup</Li>
            <Li icon={CheckCircle2}>Align brand presentation</Li>
            <Li icon={CheckCircle2}>Create a proper content calendar</Li>
            <Li icon={CheckCircle2}>Define product-by-product visibility</Li>
            <Li icon={CheckCircle2}>Improve online presence overall</Li>
            <Li icon={CheckCircle2}>Start planning website improvements for better purchase support</Li>
          </ul>
          <Callout icon={Target} label="Goal:">
            Make the brand look complete and feel active, and prepare the system for growth.
          </Callout>
          <TwistSlideFooter />
        </section>

        {/* ── Slide 8: Phase 2 – Organic Growth ── */}
        <section className="slide dark slide-footer-brand" id="slide-8">
          <S />
          <p className="slide-label">Slide 8 / 15</p>
          <h2 className="slide-title"><Sparkles />Phase 2 Organic Growth (Month 2)</h2>
          <p>Once the brand is aligned, we focus on organic marketing.</p>
          <SubHead>Main actions:</SubHead>
          <ul>
            <Li icon={Zap}>Post consistently</Li>
            <Li icon={Zap}>Follow a clear content structure</Li>
            <Li icon={Zap}>Increase visibility for each tea type</Li>
            <Li icon={Zap}>Interact with tea lovers and general buyers</Li>
            <Li icon={Zap}>Align the algorithm by being active in the right spaces</Li>
            <Li icon={Zap}>Build more attention around the brand</Li>
          </ul>
          <Callout icon={Target} label="Goal:">
            Stronger attention, better familiarity, more product awareness, and better engagement quality. This is
            where the brand starts becoming more noticeable.
          </Callout>
          <TwistSlideFooter />
        </section>

        {/* ── Slide 9: Content Direction ── */}
        <section className="slide dark slide-footer-brand" id="slide-9">
          <S />
          <p className="slide-label">Slide 9 / 15</p>
          <h2 className="slide-title"><Layers />Content Direction</h2>
          <p>The content should become much more product led, not just showing the brand, but what each product is.</p>
          <SubHead>Main content areas:</SubHead>
          <ul className="content-areas-list">
            <Li numbered>Individual tea product posts</Li>
            <Li numbered>Tea tasting videos</Li>
            <Li numbered>Flavour-specific content</Li>
            <Li numbered>Product benefit communication</Li>
            <Li numbered>Bundle and gift option visibility</Li>
            <Li numbered>Brewing and serving moments</Li>
            <Li numbered>BMICH stall and tea tasting content</Li>
            <Li numbered>Real customer interaction moments</Li>
          </ul>
          <Callout icon={Target} label="Outcome:">
            Help people understand the products, remember them, and trust the brand by showing what each product is,
            why it matters, and why someone should buy it.
          </Callout>
          <TwistSlideFooter />
        </section>

        {/* ── Slide 10: Website Direction ── */}
        <section className="slide dark slide-footer-brand" id="slide-10">
          <S />
          <p className="slide-label">Slide 10 / 15</p>
          <h2 className="slide-title"><Globe />Website Direction</h2>
          <p>When we start campaigns, the website should support purchases properly. Right now, it does not feel fully ready.</p>
          <SubHead>The website should move toward:</SubHead>
          <ul>
            <Li icon={CheckCircle2}>Clearer product presentation</Li>
            <Li icon={CheckCircle2}>More product formats (500g, 1kg, bundles, gifting)</Li>
            <Li icon={CheckCircle2}>Stronger purchase actions</Li>
            <Li icon={CheckCircle2}>Bundle options surfaced clearly</Li>
            <Li icon={CheckCircle2}>An easier buying flow</Li>
          </ul>
          <Callout icon={Target} label="Principle:">
            The website should not only tell the brand story. It should help users take action.
          </Callout>
          <TwistSlideFooter />
        </section>

        {/* ── Slide 11: Campaign Strategy ── */}
        <section className="slide dark slide-footer-brand" id="slide-11">
          <S />
          <p className="slide-label">Slide 11 / 15</p>
          <h2 className="slide-title"><Megaphone />Campaign Strategy</h2>
          <p>Paid campaigns should not come first. They should come after the foundation is ready.</p>
          <SubHead>Month 3 focus:</SubHead>
          <div className="strategy-grid strategy-grid--3col">
            <div className="strategy-item">
              <h3><span className="strategy-num">1</span>Awareness</h3>
              <ul>
                <Li>Bring more people into the brand</Li>
                <Li>Increase familiarity</Li>
                <Li>Support the organic work already done</Li>
              </ul>
            </div>
            <div className="strategy-item">
              <h3><span className="strategy-num">2</span>Sales</h3>
              <ul>
                <Li>Move into sales campaigns once the site is ready</Li>
                <Li>Drive traffic into a purchase-supporting website</Li>
              </ul>
            </div>
            <div className="strategy-item">
              <h3><span className="strategy-num">3</span>Flow</h3>
              <ul>
                <Li>Clean the brand</Li>
                <Li>Build attention → run awareness → push sales</Li>
              </ul>
            </div>
          </div>
          <Callout icon={Zap} label="Sequencing:">
            Awareness builds the audience, and sales convert it, supported by a website that matches the promise.
          </Callout>
          <TwistSlideFooter />
        </section>

        {/* ── Slide 12: Main Goal ── */}
        <section className="slide dark slide-footer-brand" id="slide-12">
          <S />
          <p className="slide-label">Slide 12 / 15</p>
          <h2 className="slide-title"><Target />Main Goal</h2>
          <p>
            The biggest thing Calsams needs right now is attention, not random attention, but proper attention.
          </p>
          <SubHead>The kind of attention that helps people:</SubHead>
          <ul>
            <Li icon={CheckCircle2}>Notice the brand</Li>
            <Li icon={CheckCircle2}>Understand the products</Li>
            <Li icon={CheckCircle2}>Trust the quality</Li>
            <Li icon={CheckCircle2}>Purchase</Li>
          </ul>
          <Callout icon={Sparkles} label="So the strategy is:">
            Build the brand properly first, then grow it. Not only to market the brand, but to structure it for
            conversion.
          </Callout>
          <TwistSlideFooter />
        </section>

        {/* ── Slide 13: Timeline ── */}
        <section className="slide dark slide-footer-brand" id="slide-13">
          <S />
          <p className="slide-label">Slide 13 / 15</p>
          <h2 className="slide-title"><CalendarCheck />Timeline</h2>
          <div className="exec-plan-grid">
            <div className="timeline-week">
              <div className="timeline-week-header">
                <span className="timeline-badge timeline-badge--month">Month 1</span>
              </div>
              <ul>
                <Li>Align pages</Li>
                <Li>Clean online presence</Li>
                <Li>Connect platforms</Li>
                <Li>Create content calendar</Li>
                <Li>Improve product visibility</Li>
                <Li>Prepare website direction</Li>
              </ul>
            </div>
            <div className="timeline-week">
              <div className="timeline-week-header">
                <span className="timeline-badge timeline-badge--month">Month 2</span>
              </div>
              <ul>
                <Li>Focus on organic marketing</Li>
                <Li>Post consistently</Li>
                <Li>Build attention</Li>
                <Li>Interact with the right audience</Li>
                <Li>Strengthen product visibility</Li>
              </ul>
            </div>
            <div className="timeline-week">
              <div className="timeline-week-header">
                <span className="timeline-badge timeline-badge--month">Month 3</span>
              </div>
              <ul>
                <Li>Launch awareness campaigns</Li>
                <Li>Build stronger reach</Li>
                <Li>Move into sales campaigns</Li>
                <Li>Drive traffic into a website that supports purchases better</Li>
              </ul>
            </div>
          </div>
          <TwistSlideFooter />
        </section>

        {/* ── Slide 14: Closing ── */}
        <section className="slide dark slide-footer-brand" id="slide-14">
          <S />
          <p className="slide-label">Slide 14 / 15</p>
          <h2 className="slide-title"><GitBranch />Closing</h2>
          <p>
            Calsams already has a good base. The product has value, the brand has potential, and the concept is
            strong.
          </p>
          <Callout icon={CheckCircle2} label="What is needed now:">
            Structure, align the presence, build attention, improve visibility, and then use campaigns to convert that
            into sales. That is where the real growth can happen.
          </Callout>
          <TwistSlideFooter />
        </section>

        {/* ── Slide 15: Thank You ── */}
        <section className="slide thankyou dark no-corner" id="slide-15">
          <div className="cover-bg-shape" aria-hidden="true" />
          <div className="cover-bg-shape cover-bg-shape--2" aria-hidden="true" />
          <div className="cover-bg-shape cover-bg-shape--3" aria-hidden="true" />
          <p className="thankyou-label">Twist Digital</p>
          <p className="slide-label">Slide 15 / 15</p>
          <h1 className="thankyou-heading">Thank You</h1>
          <p className="thankyou-sub">
            We look forward to partnering with Calsams Tea.
          </p>
          <div className="thankyou-divider" aria-hidden="true" />
          <p className="thankyou-contact">
            For any questions, reach out to us anytime.
          </p>
          <Image src="/l.png" alt="Twist Digital" width={200} height={56} className="thankyou-logo" />
        </section>

      </main>

      <a href="#slide-1" className="to-top" aria-label="Scroll to top">↑</a>
    </>
  );
}
