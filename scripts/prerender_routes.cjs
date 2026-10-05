const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run "vite build" first.');
  process.exit(1);
}

let baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Transform render-blocking CSS into non-blocking preload pattern for fast LCP
baseHtml = baseHtml.replace(
  /<link\s+rel=["']stylesheet["']\s+crossorigin\s+href=["']([^"']+\.css)["']\s*\/?>/i,
  `<link rel="preload" href="$1" as="style" crossorigin>
    <link rel="stylesheet" href="$1" media="print" onload="this.media='all'" crossorigin>
    <noscript><link rel="stylesheet" href="$1" crossorigin></noscript>`
);

// Add baseline critical CSS in <head> for zero FOUC during asynchronous stylesheet load
const baselineCriticalCss = `
    <!-- ── Baseline Critical CSS for Zero FOUC ── -->
    <style>
      html, body { margin: 0; padding: 0; background: #f3f7f4; color: #27272a; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
      #root { min-height: 100vh; display: flex; flex-direction: column; }
    </style>
`;
if (!baseHtml.includes('Baseline Critical CSS')) {
  baseHtml = baseHtml.replace('</head>', `${baselineCriticalCss}\n  </head>`);
}

// Write the optimized index.html back to dist
fs.writeFileSync(path.join(distDir, 'index.html'), baseHtml, 'utf8');

const routes = [
  {
    slug: 'about-us',
    title: 'About Punitdhan Pulses Limited | 38+ Years Heritage & Modern Grain Processing',
    description: 'Explore the legacy of Punitdhan Pulses Limited (formerly Prakash Agro Mills, estd. 1988). Modern Sortex milling, clean grain processing, and sustainable farmer partnerships across India.',
    canonical: 'https://punitdhan.com/about-us',
    schemaType: 'AboutPage',
    htmlContent: `
      <main class="max-w-6xl mx-auto px-4 py-16">
        <header class="mb-12 text-center">
          <span class="text-xs uppercase tracking-widest text-[#1d432b] font-bold">Heritage Since 1988</span>
          <h1 class="text-4xl font-serif text-[#0f2e1e] font-bold mt-2">Pioneering the Future of Food Security</h1>
          <p class="text-lg text-zinc-600 max-w-3xl mx-auto mt-4">Over 38 years of agricultural excellence, transitioning from Prakash Agro Mills to Punitdhan Pulses Limited — feeding millions of households across India.</p>
        </header>
        <section class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <article class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-semibold mb-3">Our Roots & Historic Milestone</h2>
            <p class="text-zinc-700 leading-relaxed">Established on 1st April 1988 as Prakash Agro Mills by CA Prakashchand Bachhawat, our founding milestone was the installation of India's largest pulse mill project in Modasa, Gujarat in 1985. We have grown to serve national civil supply corporations and state welfare networks.</p>
          </article>
          <article class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-semibold mb-3">Core Pillars of Reliability</h2>
            <ul class="space-y-2 text-zinc-700">
              <li><strong>Zero Gaps Quality:</strong> Prime-graded pulses with advanced Sortex optical cleaning.</li>
              <li><strong>Direct Farmer Procurement:</strong> Fair market pricing and direct rural grower partnerships.</li>
              <li><strong>National Supply Chains:</strong> Synergistic networks supplying pulses, rice, grains, and oil.</li>
              <li><strong>ISO & HACCP Certified:</strong> Rigorous laboratory testing ensuring international safety standards.</li>
            </ul>
          </article>
        </section>
        <nav class="text-center mt-8">
          <a href="/" class="text-[#1d432b] font-semibold hover:underline">Return to Home</a> |
          <a href="/products-specs" class="text-[#1d432b] font-semibold hover:underline">Browse Products</a> |
          <a href="/connect" class="text-[#1d432b] font-semibold hover:underline">Contact Corporate Office</a>
        </nav>
      </main>
    `
  },
  {
    slug: 'board-of-directors',
    title: 'Board of Directors | Leadership & Governance | Punitdhan Pulses Limited',
    description: 'Meet the executive leadership of Punitdhan Pulses Limited: Founder CA Prakashchand Bachhawat, Director & CFO CA Punit Bachhawat, Mrs. Chika Bachhawat, and CA Dhanashree Bachhawat.',
    canonical: 'https://punitdhan.com/board-of-directors',
    schemaType: 'ProfilePage',
    htmlContent: `
      <main class="max-w-6xl mx-auto px-4 py-16">
        <header class="mb-12 text-center">
          <span class="text-xs uppercase tracking-widest text-[#1d432b] font-bold">Executive Governance</span>
          <h1 class="text-4xl font-serif text-[#0f2e1e] font-bold mt-2">Board of Directors</h1>
          <p class="text-lg text-zinc-600 max-w-3xl mx-auto mt-4">Distinguished financial minds and agribusiness visionaries steering Punitdhan Pulses Limited toward sustainable national growth.</p>
        </header>
        <section class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <article class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-semibold">CA Prakashchand Bachhawat</h2>
            <p class="text-sm text-[#1d432b] font-medium mb-3">Visionary Founder & Managing Director (38+ Years Experience)</p>
            <p class="text-zinc-700 leading-relaxed">Pioneer behind India's landmark Modasa pulse mill installation in 1985 and founder of Prakash Agro Mills in 1988. Known for driving uncompromising standards of quality, financial governance, and technological innovation in food milling.</p>
          </article>
          <article class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-semibold">CA Punit Bachhawat</h2>
            <p class="text-sm text-[#1d432b] font-medium mb-3">Director & Chief Financial Officer (CFO)</p>
            <p class="text-zinc-700 leading-relaxed">Distinguished financial strategist leading institutional capital planning, tax governance, and supply chain cost efficiency across the company's pan-India processing ecosystem.</p>
          </article>
          <article class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-semibold">Mrs. Chika Bachhawat</h2>
            <p class="text-sm text-[#1d432b] font-medium mb-3">Partner & Director</p>
            <p class="text-zinc-700 leading-relaxed">Guiding corporate social values, ethical governance, and strategic community partnerships across India from our registered headquarters in Ahmedabad.</p>
          </article>
          <article class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-semibold">CA Dhanashree Bachhawat</h2>
            <p class="text-sm text-[#1d432b] font-medium mb-3">Director & Head of Human Resources</p>
            <p class="text-zinc-700 leading-relaxed">Directing talent acquisition, human capital development, employee welfare, and institutional HR frameworks across our milling units and corporate offices.</p>
          </article>
        </section>
        <nav class="text-center mt-8">
          <a href="/" class="text-[#1d432b] font-semibold hover:underline">Home</a> |
          <a href="/about-us" class="text-[#1d432b] font-semibold hover:underline">Corporate Profile</a> |
          <a href="/alliances" class="text-[#1d432b] font-semibold hover:underline">Statutory Details</a>
        </nav>
      </main>
    `
  },
  {
    slug: 'services',
    title: 'Institutional Mandates & Welfare Supply Services | Punitdhan Pulses Limited',
    description: 'Sovereign supply chain partner for Government of India welfare programs (PMGKAY, ICDS, Mid-Day Meal schemes), military procurement, and national grain distribution.',
    canonical: 'https://punitdhan.com/services',
    schemaType: 'Service',
    htmlContent: `
      <main class="max-w-6xl mx-auto px-4 py-16">
        <header class="mb-12 text-center">
          <span class="text-xs uppercase tracking-widest text-[#1d432b] font-bold">National Welfare Mandates</span>
          <h1 class="text-4xl font-serif text-[#0f2e1e] font-bold mt-2">Institutional Services & Supply Chains</h1>
          <p class="text-lg text-zinc-600 max-w-3xl mx-auto mt-4">Delivering reliable, large-scale nutrition to government welfare schemes, defense forces, and institutional food networks across India.</p>
        </header>
        <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-xl font-serif text-[#0f2e1e] font-bold mb-2">PMGKAY & PDS Supply</h2>
            <p class="text-zinc-700">Supplying millions of metric tonnes of graded, cleaned pulses to public distribution networks under the Pradhan Mantri Garib Kalyan Anna Yojana.</p>
          </div>
          <div class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-xl font-serif text-[#0f2e1e] font-bold mb-2">ICDS & Mid-Day Meals</h2>
            <p class="text-zinc-700">Providing protein-dense, lab-verified pulses to school midday nutrition programs and maternal health centers ensuring clean, pure meals for children.</p>
          </div>
          <div class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-xl font-serif text-[#0f2e1e] font-bold mb-2">Defense & Military Canteens</h2>
            <p class="text-zinc-700">High-specification pulses processed with zero moisture anomalies and packaged for rugged transport to armed forces supply depots.</p>
          </div>
        </section>
        <nav class="text-center mt-8">
          <a href="/" class="text-[#1d432b] font-semibold hover:underline">Home</a> |
          <a href="/products-specs" class="text-[#1d432b] font-semibold hover:underline">Product Catalog</a> |
          <a href="/connect" class="text-[#1d432b] font-semibold hover:underline">Procurement Inquiries</a>
        </nav>
      </main>
    `
  },
  {
    slug: 'products-specs',
    title: 'Pulses Catalog & Technical Specifications | Chana, Toor, Urad, Masoor | Punitdhan',
    description: 'Technical specs & nutritional profiles for Punitdhan premium pulses: Chana Dal, Toor Dal, Urad Whole, Urad Dal, Masoor Dal, and Moong Dal. Zero chemical polish, lab-certified.',
    canonical: 'https://punitdhan.com/products-specs',
    schemaType: 'CollectionPage',
    htmlContent: `
      <main class="max-w-6xl mx-auto px-4 py-16">
        <header class="mb-12 text-center">
          <span class="text-xs uppercase tracking-widest text-[#1d432b] font-bold">Unpolished Pure Grains</span>
          <h1 class="text-4xl font-serif text-[#0f2e1e] font-bold mt-2">Premium Pulses & Product Specifications</h1>
          <p class="text-lg text-zinc-600 max-w-3xl mx-auto mt-4">Processed through multi-tier optical Sortex cleaners to preserve essential amino acids, natural taste, and maximum protein density.</p>
        </header>
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-bold mb-2">Chana Dal (Split Bengal Gram)</h2>
            <p class="text-zinc-600 text-sm mb-3">High fiber, rich in iron, low glycemic index, sourced directly from prime crop fields.</p>
            <span class="inline-block px-2.5 py-1 bg-[#1d432b]/10 text-[#1d432b] text-xs font-semibold rounded">High Protein &bull; Folate Rich</span>
          </div>
          <div class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-bold mb-2">Toor Dal (Arhar Pigeon Peas)</h2>
            <p class="text-zinc-600 text-sm mb-3">Essential culinary staple processed with modern dehusking technology for natural aroma and quick cooking.</p>
            <span class="inline-block px-2.5 py-1 bg-[#1d432b]/10 text-[#1d432b] text-xs font-semibold rounded">Vitamin B Complex &bull; Calcium</span>
          </div>
          <div class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-bold mb-2">Urad Whole (Black Gram)</h2>
            <p class="text-zinc-600 text-sm mb-3">Hardy whole black gram rich in magnesium, ideal for dal makhani and traditional delicacies.</p>
            <span class="inline-block px-2.5 py-1 bg-[#1d432b]/10 text-[#1d432b] text-xs font-semibold rounded">High Magnesium &bull; Digestive Friendly</span>
          </div>
          <div class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-bold mb-2">Urad Dal (Split & Washed)</h2>
            <p class="text-zinc-600 text-sm mb-3">Pearl-white washed split urad with minimal moisture, ideal for Idlis, Dosa batters, and Vadas.</p>
            <span class="inline-block px-2.5 py-1 bg-[#1d432b]/10 text-[#1d432b] text-xs font-semibold rounded">Potassium Rich &bull; Low Cholesterol</span>
          </div>
          <div class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-bold mb-2">Masoor Dal (Red Split Lentils)</h2>
            <p class="text-zinc-600 text-sm mb-3">Quick-cooking red lentils retained under optimal temperatures for vital micronutrients.</p>
            <span class="inline-block px-2.5 py-1 bg-[#1d432b]/10 text-[#1d432b] text-xs font-semibold rounded">Heart Healthy &bull; Antioxidant Heavy</span>
          </div>
          <div class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-bold mb-2">Moong Dal (Yellow Split)</h2>
            <p class="text-zinc-600 text-sm mb-3">Light, easily digestible yellow split mung beans recommended for clean nutrition and health diets.</p>
            <span class="inline-block px-2.5 py-1 bg-[#1d432b]/10 text-[#1d432b] text-xs font-semibold rounded">Easy Digestion &bull; Zinc & Vitamin C</span>
          </div>
        </section>
        <nav class="text-center mt-8">
          <a href="/" class="text-[#1d432b] font-semibold hover:underline">Home</a> |
          <a href="/alliances" class="text-[#1d432b] font-semibold hover:underline">FSSAI & Certifications</a> |
          <a href="/connect" class="text-[#1d432b] font-semibold hover:underline">Request Bulk Quote</a>
        </nav>
      </main>
    `
  },
  {
    slug: 'alliances',
    title: 'Statutory Registry & Compliance Certifications | Punitdhan Pulses Limited',
    description: 'Verified regulatory credentials of Punitdhan Pulses Limited: GSTIN 24AAPCP6070K1ZZ, PAN AAPCP6070K, Central FSSAI Licenses 10725026000839 & 10724001000022, ISO 9001:2015 & HACCP.',
    canonical: 'https://punitdhan.com/alliances',
    schemaType: 'WebPage',
    htmlContent: `
      <main class="max-w-6xl mx-auto px-4 py-16">
        <header class="mb-12 text-center">
          <span class="text-xs uppercase tracking-widest text-[#1d432b] font-bold">Statutory Governance</span>
          <h1 class="text-4xl font-serif text-[#0f2e1e] font-bold mt-2">Licenses, Certifications & Corporate Registry</h1>
          <p class="text-lg text-zinc-600 max-w-3xl mx-auto mt-4">Complete legal transparency and government compliance adhering to national food safety laws and quality benchmarks.</p>
        </header>
        <section class="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden mb-12">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-zinc-50 border-b border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-600">
                <th class="p-4">Regulatory Parameter</th>
                <th class="p-4">Registration / License Code</th>
                <th class="p-4">Jurisdiction & Authority</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-200 text-sm text-zinc-700">
              <tr>
                <td class="p-4 font-semibold">Corporate Name</td>
                <td class="p-4">Punitdhan Pulses Limited (formerly Prakash Agro Mills)</td>
                <td class="p-4">Ministry of Corporate Affairs (MCA), India</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold">Goods & Services Tax (GSTIN)</td>
                <td class="p-4 font-mono font-bold text-[#0f2e1e]">24AAPCP6070K1ZZ</td>
                <td class="p-4">Government of Gujarat & India</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold">Permanent Account Number (PAN)</td>
                <td class="p-4 font-mono font-bold text-[#0f2e1e]">AAPCP6070K</td>
                <td class="p-4">Income Tax Department of India</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold">FSSAI License (Memco Unit)</td>
                <td class="p-4 font-mono">10725026000839</td>
                <td class="p-4">Food Safety and Standards Authority of India</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold">FSSAI License (Bavla Unit)</td>
                <td class="p-4 font-mono">10724001000022</td>
                <td class="p-4">Food Safety and Standards Authority of India</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold">Quality Management System</td>
                <td class="p-4 font-mono">IN/76122035/5941 (ISO 9001:2015)</td>
                <td class="p-4">International Organization for Standardization</td>
              </tr>
              <tr>
                <td class="p-4 font-semibold">Food Safety Hazard Management</td>
                <td class="p-4 font-mono">IN/48722036/1658 (HACCP)</td>
                <td class="p-4">Hazard Analysis Critical Control Point</td>
              </tr>
            </tbody>
          </table>
        </section>
        <nav class="text-center mt-8">
          <a href="/" class="text-[#1d432b] font-semibold hover:underline">Home</a> |
          <a href="/products-specs" class="text-[#1d432b] font-semibold hover:underline">View Products</a> |
          <a href="/connect" class="text-[#1d432b] font-semibold hover:underline">Contact Details</a>
        </nav>
      </main>
    `
  },
  {
    slug: 'connect',
    title: 'Connect Us | Corporate Headquarters & Sourcing Desks | Punitdhan Pulses',
    description: 'Get in touch with Punitdhan Pulses Limited. Registered Office at Naroda Road, Corporate Office at Shahibaug, Ahmedabad. Call +91 70698 88113 or email punitdhan_pulses2025@yahoo.com.',
    canonical: 'https://punitdhan.com/connect',
    schemaType: 'ContactPage',
    htmlContent: `
      <main class="max-w-6xl mx-auto px-4 py-16">
        <header class="mb-12 text-center">
          <span class="text-xs uppercase tracking-widest text-[#1d432b] font-bold">Contact & Inquiries</span>
          <h1 class="text-4xl font-serif text-[#0f2e1e] font-bold mt-2">Connect with Our Central Desks</h1>
          <p class="text-lg text-zinc-600 max-w-3xl mx-auto mt-4">We welcome institutional inquiries, bulk wholesale orders, supplier collaborations, and procurement discussions.</p>
        </header>
        <section class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <article class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-semibold mb-4">Corporate Office</h2>
            <address class="not-italic text-zinc-700 space-y-1 mb-6">
              <p class="font-semibold text-zinc-900">406 Neelgagan Plaza</p>
              <p>Opposite Police Commissioner Office</p>
              <p>Shahibaug, Ahmedabad &mdash; 380004, Gujarat, India</p>
            </address>
            <h3 class="text-lg font-serif text-[#0f2e1e] font-semibold mb-2">Registered Processing Unit</h3>
            <address class="not-italic text-zinc-700 space-y-1">
              <p>Dal Mill Compound, Nr. Old Octroi Naka</p>
              <p>Naroda Road, Nr. Memco Cross Road</p>
              <p>Memco, Ahmedabad &mdash; 382345, Gujarat, India</p>
            </address>
          </article>
          <article class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-semibold mb-4">Direct Communication Channels</h2>
            <div class="space-y-4 text-zinc-700">
              <div>
                <p class="text-xs uppercase tracking-wider text-zinc-500 font-bold">Phone Lines</p>
                <p class="text-lg font-semibold text-[#0f2e1e]"><a href="tel:+917069888113" class="hover:underline">+91 70698 88113</a> &bull; <a href="tel:+917069888112" class="hover:underline">+91 70698 88112</a></p>
              </div>
              <div>
                <p class="text-xs uppercase tracking-wider text-zinc-500 font-bold">Email Communication</p>
                <p class="text-lg font-semibold text-[#0f2e1e]"><a href="mailto:punitdhan_pulses2025@yahoo.com" class="hover:underline">punitdhan_pulses2025@yahoo.com</a></p>
              </div>
              <div>
                <p class="text-xs uppercase tracking-wider text-zinc-500 font-bold">Statutory GSTIN</p>
                <p class="text-base font-mono font-bold text-zinc-800">24AAPCP6070K1ZZ</p>
              </div>
            </div>
          </article>
        </section>
        <nav class="text-center mt-8">
          <a href="/" class="text-[#1d432b] font-semibold hover:underline">Home</a> |
          <a href="/products-specs" class="text-[#1d432b] font-semibold hover:underline">Products</a> |
          <a href="/about-us" class="text-[#1d432b] font-semibold hover:underline">About Company</a>
        </nav>
      </main>
    `
  },
  {
    slug: 'careers',
    title: 'Careers in Agribusiness & Milling Operations | Punitdhan Pulses Limited',
    description: 'Explore career opportunities at Punitdhan Pulses Limited in Ahmedabad. Opportunities in milling plant management, food technology, quality assurance, logistics, and accounts.',
    canonical: 'https://punitdhan.com/careers',
    schemaType: 'WebPage',
    htmlContent: `
      <main class="max-w-6xl mx-auto px-4 py-16">
        <header class="mb-12 text-center">
          <span class="text-xs uppercase tracking-widest text-[#1d432b] font-bold">Work with Us</span>
          <h1 class="text-4xl font-serif text-[#0f2e1e] font-bold mt-2">Careers at Punitdhan Pulses Limited</h1>
          <p class="text-lg text-zinc-600 max-w-3xl mx-auto mt-4">Join a rapidly scaling agribusiness pioneer dedicated to food purity, technological innovation, and rewarding career paths.</p>
        </header>
        <section class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <article class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-semibold mb-3">Why Build Your Career at Punitdhan?</h2>
            <ul class="space-y-2 text-zinc-700">
              <li><strong>State of the Art Infrastructure:</strong> Work with advanced Sortex cleaners and industrial milling equipment.</li>
              <li><strong>Professional Leadership:</strong> Mentorship under experienced Chartered Accountants and agribusiness veterans.</li>
              <li><strong>Continuous Upskilling:</strong> Systematic training in ISO 9001 and HACCP food safety standards.</li>
              <li><strong>Fast-Track Growth:</strong> Direct contributions to national welfare supply contracts and expanding commercial brands.</li>
            </ul>
          </article>
          <article class="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <h2 class="text-2xl font-serif text-[#0f2e1e] font-semibold mb-3">Application Submission</h2>
            <p class="text-zinc-700 leading-relaxed mb-4">We welcome resumes for roles in Plant Operations, Food Testing, Logistics Coordination, and Finance. Submit your profile directly to our HR desk.</p>
            <p class="text-zinc-900 font-semibold">Email: <a href="mailto:punitdhan_pulses2025@yahoo.com" class="text-[#1d432b] hover:underline">punitdhan_pulses2025@yahoo.com</a></p>
          </article>
        </section>
        <nav class="text-center mt-8">
          <a href="/" class="text-[#1d432b] font-semibold hover:underline">Home</a> |
          <a href="/about-us" class="text-[#1d432b] font-semibold hover:underline">About Us</a> |
          <a href="/connect" class="text-[#1d432b] font-semibold hover:underline">Contact Desk</a>
        </nav>
      </main>
    `
  }
];

routes.forEach((route) => {
  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace Meta Description
  html = html.replace(
    /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace Canonical Link
  html = html.replace(
    /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:url" content="${route.canonical}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="twitter:description" content="${route.description}" />`
  );

  // Inject route-specific structured data
  const routeSchema = `
    <!-- ── Route Specific Schema ── -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "${route.schemaType}",
      "name": "${route.title}",
      "description": "${route.description}",
      "url": "${route.canonical}",
      "isPartOf": { "@id": "https://punitdhan.com/#website" }
    }
    </script>
  `;
  html = html.replace('</head>', `${routeSchema}\n  </head>`);

  // Inject semantic crawlable HTML into #root
  html = html.replace('<div id="root"></div>', `<div id="root">${route.htmlContent}</div>`);

  // Target directory
  const targetDir = path.join(distDir, route.slug);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  console.log(`Generated: ${route.slug}/index.html`);
});

console.log(`\nSuccess! Pre-rendered ${routes.length} static routes for Googlebot crawling.`);
