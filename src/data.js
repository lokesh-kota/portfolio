// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Lokesh Suman',
  role: 'Senior Full-Stack Developer',
  focus: 'E-commerce and AI apps',
  location: 'Kota, Rajasthan, India',
  email: 'sumanlokesh3155@gmail.com',
  phone: '+91 77339 92778',
  linkedin: 'https://www.linkedin.com/in/lokesh-suman-b258091bb/',
  since: 2017, // first year in the industry (internship)
  fullTimeSince: 2018, // used for the "years of experience" number
  noticePeriod: 'Up to 30 days, flexible',
  workMode: 'Remote preferred',
  // To show your photo: put the image in the public folder and set its path here, e.g. '/photo.jpg'.
  photo: '/photo.jpg',
  summary:
    'Full-stack developer and team lead. I build and maintain apps for Shopify, Wix, BigCommerce, WordPress and PrestaShop, including AI-powered apps, on Laravel, Node.js and React.',
  // Phrases typed out in the hero after "I build ". Keep each one short (about 16 characters)
  // so the line never wraps; split a longer idea into two phrases.
  typed: ['E-commerce Apps', 'Shopify Apps', 'Wix Apps', 'BigCommerce Apps', 'AI-Powered Apps', 'Node.js Backends', 'Laravel Backends', 'API Integrations'],
}

// rating / reviews are from the Shopify App Store, checked November 2026.
export const projects = [
  {
    id: 'disposable24x7',
    icon: '/apps/disposable24x7/icon.svg',
    shots: ['/apps/disposable24x7/shot-1.jpg'],
    name: 'Disposable24x7',
    kind: 'Platform',
    badge: 'Latest',
    featured: true,
    url: 'https://disposable24x7.com',
    linkLabel: 'Visit disposable24x7.com',
    tagline: 'Digital wholesale marketplace with customer, seller and delivery apps',
    description:
      'A platform for selling wholesale items digitally. Customers buy through the website and a mobile app. Individual sellers register and list their products through a seller panel and app. Delivery agents handle on-time delivery through a rider app, and a super-admin panel manages the merchants.',
    work: 'I built the Node.js and Express backend and the REST APIs that the customer, seller and rider apps all talk to, with MongoDB behind them. I also built the React admin panel for managing sellers, products and orders, and the public marketing website. The APIs cover ordering, online payments, push notifications through Firebase, and delivery tracking with Google Maps.',
    role: ['Backend and APIs', 'Admin panel', 'Marketing website'],
    highlights: [
      'Three apps on one Node.js backend: customer, seller and rider',
      'Seller onboarding so individual merchants can sell on the platform',
      'Super-admin panel for managing merchants, products and orders',
      'Bulk ordering with tiered pricing, online payments and delivery tracking',
    ],
    tech: ['Node.js', 'React', 'MongoDB', 'Express', 'REST API', 'Firebase', 'Google Maps API', 'Payment gateways'],
  },
  {
    id: 'elegantsy',
    icon: '/apps/elegantsy/icon.png',
    shots: ['/apps/elegantsy/shot-1.jpg', '/apps/elegantsy/shot-2.jpg', '/apps/elegantsy/shot-3.jpg'],
    name: 'Elegantsy Product Labels',
    kind: 'Shopify app',
    contribution: 'Built',
    rating: 4.7,
    reviews: 48,
    badge: 'Built for Shopify',
    url: 'https://apps.shopify.com/advanced-product-labels',
    links: [
      { platform: 'Shopify', name: 'Elegantsy Product labels', url: 'https://apps.shopify.com/advanced-product-labels' },
      { platform: 'Wix', name: 'Elegantsy Product Labels', url: 'https://www.wix.com/app-market/elegantsy-product-labels' },
      { platform: 'BigCommerce', name: 'Product Labels & Badges', url: 'https://www.bigcommerce.com/apps/product-labels-badges/' },
      { platform: 'PrestaShop', name: 'Elegantsy Product Labels', url: 'https://addons.prestashop.com/en/badges-logos/90060-elegantsy-product-labels.html' },
      // No public listing link for WordPress yet; add a url to make it clickable.
      { platform: 'WordPress' },
    ],
    tagline: 'Product labels and badges that attract visitors',
    description:
      'An app for Shopify, Wix, BigCommerce, WordPress and PrestaShop that lets merchants add labels and badges to their products to draw attention to sales, new arrivals and more. On Shopify, it carries the Built for Shopify badge, which Shopify gives to apps that meet its quality standards.',
    work: 'I built this app end to end: the Laravel backend, the screens inside the Shopify admin where merchants design and assign labels, and the storefront extension that draws the labels on product images. I took it through the Built for Shopify review, then brought it to Wix, BigCommerce, PrestaShop and WordPress. I still ship its updates and answer merchant support.',
    role: ['Built the app', 'Feature updates', 'Merchant support'],
    highlights: ['Built for Shopify status', 'Rated 4.7 from 48 merchant reviews on Shopify', 'Also published for Wix, BigCommerce, WordPress and PrestaShop'],
    tech: ['Laravel', 'PHP', 'MySQL', 'Shopify GraphQL API', 'Theme app extensions', 'App Bridge', 'Polaris', 'Billing API'],
  },
  {
    id: 'prevue',
    icon: '/apps/prevue/icon.png',
    shots: ['/apps/prevue/shot-1.jpg', '/apps/prevue/shot-2.jpg', '/apps/prevue/shot-3.jpg'],
    name: 'PreVue: Pre Order Products',
    kind: 'Shopify app',
    contribution: 'Built',
    rating: 4.8,
    reviews: 9,
    url: 'https://apps.shopify.com/pre-order-maker',
    links: [{ platform: 'Shopify', url: 'https://apps.shopify.com/pre-order-maker' }],
    tagline: 'Turns the add-to-cart button into a pre-order button',
    description:
      'A Shopify app that converts the add-to-cart button into a pre-order button, so merchants can keep selling products that are out of stock or not yet released.',
    work: 'I built this app end to end: the Laravel backend, the settings screens inside the Shopify admin, and the storefront extension that swaps the add-to-cart button for a pre-order button. I keep it updated and handle merchant support.',
    role: ['Built the app', 'Feature updates', 'Merchant support'],
    highlights: ['Pre-order button on the storefront', 'Rated 4.8 on the Shopify App Store', 'Free trial available'],
    tech: ['Laravel', 'PHP', 'MySQL', 'Shopify GraphQL API', 'Theme app extensions', 'Webhooks', 'Billing API'],
  },
  {
    id: 'askmystore',
    icon: '/apps/askmystore/icon.png',
    shots: ['/apps/askmystore/shot-1.jpg', '/apps/askmystore/shot-2.jpg', '/apps/askmystore/shot-3.jpg'],
    name: 'AskMyStore AI Product Search',
    kind: 'Shopify app',
    contribution: 'Built',
    badge: 'AI',
    ai: true,
    url: 'https://apps.shopify.com/prodai-ai-sales-chatbot',
    links: [{ platform: 'Shopify', url: 'https://apps.shopify.com/prodai-ai-sales-chatbot' }],
    tagline: 'AI-powered product search for shoppers',
    description:
      'A Shopify app that gives stores an AI-powered product search, so customers can describe what they want and discover matching products.',
    work: 'I built this app end to end. It reads the store catalogue through the Shopify GraphQL Admin API and uses the OpenAI API to understand what a shopper is asking for, then returns matching products in a chat pop-up on the storefront. I also built the merchant settings and the billing plans.',
    role: ['Built the app', 'Feature updates', 'Merchant support'],
    highlights: ['AI-driven product discovery', 'Works with the store catalogue through Shopify APIs'],
    tech: ['OpenAI API', 'Laravel', 'Shopify GraphQL API', 'PHP', 'Theme app extensions', 'App Bridge', 'Billing API'],
  },
  {
    id: 'callo',
    icon: '/apps/callo/icon.png',
    shots: ['/apps/callo/shot-1.jpg', '/apps/callo/shot-2.jpg', '/apps/callo/shot-3.jpg'],
    name: 'Callo AI Order Status Call',
    kind: 'Shopify app',
    contribution: 'Built',
    badge: 'AI',
    ai: true,
    url: 'https://apps.shopify.com/callo-ai-order-status-call',
    links: [{ platform: 'Shopify', url: 'https://apps.shopify.com/callo-ai-order-status-call' }],
    tagline: 'AI voice calls with real-time order updates',
    description:
      'A Shopify app that uses AI voice calls to give customers real-time updates on their orders.',
    work: 'I built this app end to end. It listens for order events from Shopify, places an automated phone call through Twilio, and speaks the order update in a voice generated by ElevenLabs. I also built the merchant dashboard for setting up the calls and reviewing the results.',
    role: ['Built the app', 'Feature updates', 'Merchant support'],
    highlights: ['Automated order-status calls placed through Twilio', 'Call voice generated with ElevenLabs', 'Reads live order data from Shopify'],
    tech: ['Twilio', 'ElevenLabs', 'Laravel', 'Shopify GraphQL API', 'Webhooks', 'PHP'],
  },
  {
    id: 'jyotisham',
    icon: '/apps/jyotisham/icon.png',
    shots: ['/apps/jyotisham/shot-1.jpg', '/apps/jyotisham/shot-2.jpg', '/apps/jyotisham/shot-3.jpg'],
    name: 'Jyotisham Astro Builder',
    kind: 'Shopify app',
    contribution: 'Built',
    url: 'https://apps.shopify.com/jyotisham-astrology',
    links: [{ platform: 'Shopify', url: 'https://apps.shopify.com/jyotisham-astrology' }],
    tagline: 'Vedic astrology toolkit and astrologer consultations for Shopify stores',
    description:
      'A Shopify app that turns a store into an astrology service. It adds astrologer profiles, horoscope, Panchang and Kundli matching pages, and lets customers consult astrologers by video call and live chat. Merchants get reports on income, refunds, wallet balance and recharges.',
    work: 'I built this app end to end: astrologer profiles, plus Panchang, Kundli and matching pages powered by the VedicAstro and Jyotisham APIs. Customers chat with astrologers through Sendbird and hold video and voice consultations through Agora. I also built the wallet payments, push notifications through Firebase, and the reports merchants use to track income and refunds.',
    role: ['Built the app', 'Feature updates', 'Merchant support'],
    highlights: [
      'Video call and live chat consultations',
      'Panchang, Kundli and Kundli matching pages',
      'Wallet, income and refund reports',
      'Custom email and SMS templates',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'Shopify GraphQL API', 'Agora', 'Sendbird', 'VedicAstro API', 'Jyotisham API', 'Firebase', 'Payment gateways'],
  },
  {
    id: 'blockx',
    icon: '/apps/blockx/icon.png',
    shots: ['/apps/blockx/shot-1.jpg', '/apps/blockx/shot-2.jpg', '/apps/blockx/shot-3.jpg'],
    name: 'BlockX Country Blocker',
    kind: 'Shopify app',
    contribution: 'Major contributor',
    reviews: 32,
    url: 'https://apps.shopify.com/country-blocker-1',
    links: [
      { platform: 'Shopify', name: 'BlockX Country Blocker', url: 'https://apps.shopify.com/country-blocker-1' },
      { platform: 'Wix', name: 'Easy Country Blocker', url: 'https://www.wix.com/app-market/easy-country-blocker' },
      { platform: 'BigCommerce', name: 'Easy Country Blocker', url: 'https://www.bigcommerce.com/apps/easy-country-blocker/' },
      { platform: 'PrestaShop', name: 'Easy Country Blocker', url: 'https://addons.prestashop.com/en/international-localization/91467-easy-country-blocker.html' },
    ],
    tagline: 'Blocks countries, IPs, VPNs and bots to prevent store fraud',
    description:
      'An app for Shopify, Wix, BigCommerce and PrestaShop that protects stores from fraud by blocking visitors by country, IP address, VPN or bot activity. I contributed most of its features.',
    work: 'I built most of this app’s features: the blocking rules for countries, IP addresses, VPNs and bots, visitor detection through Proxycheck, and the storefront script that enforces the rules. I built the Wix version, Easy Country Blocker, worked on the BigCommerce and PrestaShop versions, and maintain all of them.',
    role: ['Contributed most features', 'Maintenance', 'Merchant support'],
    highlights: ['Country, IP, VPN and bot blocking', '32 merchant reviews on Shopify', 'Also published for Wix, BigCommerce and PrestaShop as Easy Country Blocker'],
    tech: ['Laravel', 'PHP', 'MySQL', 'Shopify GraphQL API', 'Proxycheck', 'Theme app extensions', 'Webhooks'],
  },
  {
    id: 'ageo',
    icon: '/apps/ageo/icon.png',
    shots: ['/apps/ageo/shot-1.jpg', '/apps/ageo/shot-2.jpg', '/apps/ageo/shot-3.jpg'],
    name: 'AGeo: Product Blocker',
    kind: 'Shopify app',
    contribution: 'Major contributor',
    rating: 4.9,
    reviews: 13,
    url: 'https://apps.shopify.com/geoip-based-product-blocker',
    links: [
      { platform: 'Shopify', name: 'AGeo: Product Blocker', url: 'https://apps.shopify.com/geoip-based-product-blocker' },
      { platform: 'Wix', name: 'Product Blocker Geo & IP', url: 'https://www.wix.com/app-market/product-section-blocker' },
    ],
    tagline: 'Controls which countries can access which products',
    description:
      'An app for Shopify and Wix that lets merchants control which countries can see and buy specific products. I contributed most of its features.',
    work: 'I built most of this app’s features: the rules that hide or block specific products by visitor country, with detection through Proxycheck. I also built the Wix version, Product Blocker Geo & IP, and I maintain both.',
    role: ['Contributed most features', 'Maintenance', 'Merchant support'],
    highlights: ['GeoIP-based product rules', 'Rated 4.9 on the Shopify App Store', 'Also published for Wix as Product Blocker Geo & IP'],
    tech: ['Laravel', 'PHP', 'MySQL', 'Shopify GraphQL API', 'Proxycheck', 'Theme app extensions', 'Webhooks'],
  },
  {
    id: 'shipping-date',
    icon: '/apps/shipping-date/icon.png',
    shots: ['/apps/shipping-date/shot-1.jpg', '/apps/shipping-date/shot-2.jpg', '/apps/shipping-date/shot-3.jpg'],
    name: 'Estimated Shipping Date',
    kind: 'Wix app',
    contribution: 'Built',
    url: 'https://www.wix.com/app-market/estimated-shipping-date',
    links: [{ platform: 'Wix', url: 'https://www.wix.com/app-market/estimated-shipping-date' }],
    tagline: 'Shows estimated shipping dates on product pages',
    description: 'A Wix app that shows shoppers an estimated shipping date on product pages, so they know when to expect an order before they buy.',
    work: 'I built this Wix app: the backend, the settings dashboard where site owners set working days and date formats, and the widget that shows the estimated date on product pages. I maintain it and handle merchant support.',
    role: ['Built the app', 'Maintenance', 'Merchant support'],
    highlights: ['Estimated dates on product pages', 'Published on the Wix App Market'],
    tech: ['Wix app APIs', 'Laravel', 'PHP', 'MySQL', 'JavaScript'],
  },
  {
    id: 'revix',
    icon: '/apps/revix/icon.png',
    shots: ['/apps/revix/shot-1.jpg', '/apps/revix/shot-2.jpg', '/apps/revix/shot-3.jpg'],
    name: 'Revix Product Review',
    kind: 'Wix app',
    contribution: 'Built',
    url: 'https://www.wix.com/app-market/revix-product-review',
    links: [{ platform: 'Wix', url: 'https://www.wix.com/app-market/revix-product-review' }],
    tagline: 'Collects product ratings and photo reviews',
    description: 'A Wix app that collects star ratings and product reviews from customers, including photos, and displays them on the store.',
    work: 'I built this Wix app: the backend, the dashboard where site owners manage reviews, and the review form and widget shown on the store. I maintain it and handle merchant support.',
    role: ['Built the app', 'Maintenance', 'Merchant support'],
    highlights: ['Ratings and reviews with photos', 'Published on the Wix App Market'],
    tech: ['Wix app APIs', 'Laravel', 'PHP', 'MySQL', 'JavaScript'],
  },
  {
    id: 'snap',
    icon: '/apps/snap/icon.png',
    shots: ['/apps/snap/shot-1.jpg', '/apps/snap/shot-2.jpg', '/apps/snap/shot-3.jpg'],
    name: 'Snap - Sales Popup',
    kind: 'Wix app',
    contribution: 'Built',
    url: 'https://www.wix.com/app-market/snap-sales-popup',
    links: [{ platform: 'Wix', url: 'https://www.wix.com/app-market/snap-sales-popup' }],
    tagline: 'Sales popups and social proof for Wix stores',
    description: 'A Wix app that shows recent-sale popups on the storefront, giving shoppers social proof that other people are buying.',
    work: 'I built this Wix app: the backend, the settings dashboard, and the popup that shows recent sales to visitors on the storefront. I maintain it and handle merchant support.',
    role: ['Built the app', 'Maintenance', 'Merchant support'],
    highlights: ['Recent-sale popups on the storefront', 'Published on the Wix App Market'],
    tech: ['Wix app APIs', 'Laravel', 'PHP', 'MySQL', 'JavaScript'],
  },
]

export const platforms = ['Shopify', 'Wix', 'BigCommerce', 'WordPress', 'PrestaShop']

// Shown in the AI section: how AI is used inside the apps.
export const aiWork = [
  { title: 'AI is the feature', text: 'In these apps, AI does the job the merchant installed the app for: answering shoppers and making calls.' },
  { title: 'Works on live store data', text: 'Both apps connect AI to the live Shopify catalogue and orders through the GraphQL Admin API, so answers come from the store itself.' },
  { title: 'Calls with a generated voice', text: 'Callo places automated calls through Twilio and speaks with a voice generated by ElevenLabs.' },
]

export const about = [
  'I am a senior full-stack web developer based in Kota, Rajasthan. I have spent my whole career on products that real merchants pay for and depend on: public apps for Shopify, Wix, BigCommerce, WordPress and PrestaShop, and a wholesale marketplace with separate customer, seller and delivery apps.',
  'I work across the full product. On the backend that means Laravel, Node.js, MySQL and MongoDB, with integrations into the APIs of each platform. On top of that, I build the merchant-facing admin screens and the storefront scripts, publish to the app marketplaces, and answer merchant support tickets myself. I also lead the team that builds these projects and am responsible for getting them delivered on time.',
  'Recently, my focus has been AI features inside commerce: product search that understands what a shopper is asking for, and voice calls that read out live order status.',
]

export const quickFacts = [
  ['Role', 'Senior Full-Stack Developer and Team Lead'],
  ['Experience', '8+ years full time, all on production apps'],
  ['Company', 'Sainiweb Solutions Pvt. Ltd. (apps published as ZendApps)'],
  ['Location', 'Kota, Rajasthan, India'],
  ['Languages', 'English, Hindi'],
  ['Open to', 'Full-stack developer roles (PHP, Laravel, Node.js, React)'],
  ['Work mode', 'Remote preferred'],
  ['Notice period', 'Up to 30 days, flexible'],
]

// Not shown on the site at the moment. To bring the section back, add it to App.jsx and to `sections` below.
export const services = [
  { title: 'E-commerce app development', text: 'Public and custom apps for Shopify, Wix, BigCommerce, WordPress and PrestaShop, from idea to marketplace listing.' },
  { title: 'AI features for commerce', text: 'AI product search, voice agents and assistants that work on live store data.' },
  { title: 'Backends and APIs', text: 'Laravel and Node.js services on MySQL and MongoDB, with REST and GraphQL APIs for web and mobile apps.' },
  { title: 'Admin panels', text: 'Seller, merchant and super-admin dashboards for managing products, orders and users.' },
  { title: 'Maintenance and support', text: 'Keeping live apps healthy through platform changes, and solving merchant issues first-hand.' },
  { title: 'Team leadership', text: 'Leading developers, planning the work and getting projects delivered on time.' },
]

export const resumeFile = '/Lokesh-Suman-Resume.pdf'

export const skills = [
  { group: 'AI', items: ['OpenAI API', 'ElevenLabs', 'Twilio Voice', 'AI product search', 'AI voice agents', 'AI-assisted development'] },
  { group: 'Platforms', items: platforms },
  { group: 'Backend', items: ['PHP', 'Laravel', 'Node.js', 'Express', 'MySQL', 'MongoDB', 'Redis', 'Queues and background jobs', 'REST API design'] },
  { group: 'Shopify', items: ['GraphQL Admin API', 'App Bridge', 'Polaris', 'Theme app extensions', 'Billing API', 'Webhooks', 'OAuth'] },
  { group: 'Frontend', items: ['React', 'JavaScript', 'jQuery', 'HTML', 'CSS', 'Bootstrap'] },
  { group: 'Integrations', items: ['Razorpay', 'Cashfree', 'Stripe', 'PhonePe', 'Agora', 'Sendbird', 'Proxycheck', 'Firebase', 'Google Maps API'] },
  { group: 'Leadership and support', items: ['Team leadership', 'Project delivery', 'Code review', 'Technical merchant support', 'App maintenance'] },
  { group: 'Tools', items: ['Git', 'SEO'] },
]

// APIs I have worked with: what I used each one for, and in which apps.
export const apis = [
  {
    group: 'E-commerce platforms',
    items: [
      { name: 'GraphQL APIs', use: 'Shopify GraphQL Admin API for products, orders, customers and metafields. All our Shopify apps now run on GraphQL.', apps: 'All Shopify apps' },
      { name: 'REST APIs', use: 'Wix, BigCommerce and PrestaShop APIs for store products, catalogue data and storefront scripts', apps: 'Wix, BigCommerce and PrestaShop apps' },
      { name: 'OAuth and webhooks', use: 'App installation, secure sessions, and reacting to order, product and uninstall events', apps: 'All platform apps' },
      { name: 'Billing', use: 'Subscription plans, free plans and free trials through each marketplace', apps: 'Apps with paid plans' },
    ],
  },
  {
    group: 'AI and voice',
    items: [
      { name: 'OpenAI API', use: 'Understands what a shopper is asking for and finds matching products', apps: 'AskMyStore' },
      { name: 'Twilio Voice', use: 'Places the automated order-status phone calls', apps: 'Callo' },
      { name: 'ElevenLabs', use: 'Generates the voice used on the calls', apps: 'Callo' },
    ],
  },
  {
    group: 'Third-party services',
    items: [
      { name: 'Proxycheck', use: 'Detects a visitor’s country, VPNs and proxies for blocking rules', apps: 'BlockX, AGeo' },
      { name: 'Agora', use: 'Video and voice consultations with astrologers', apps: 'Jyotisham' },
      { name: 'Sendbird', use: 'Live chat between customers and astrologers', apps: 'Jyotisham' },
      { name: 'VedicAstro API and Jyotisham API', use: 'Horoscope, Panchang and Kundli data', apps: 'Jyotisham' },
      { name: 'Razorpay, Cashfree, Stripe, PhonePe', use: 'Online payments', apps: 'Disposable24x7, Jyotisham' },
      { name: 'Firebase Cloud Messaging', use: 'Push notifications', apps: 'Disposable24x7, Jyotisham' },
      { name: 'Google Maps API', use: 'Delivery locations and tracking', apps: 'Disposable24x7' },
    ],
  },
  {
    group: 'APIs I built',
    items: [
      { name: 'Disposable24x7 REST APIs', use: 'Node.js and Express APIs on MongoDB that serve the customer, seller and rider apps and the admin panels', apps: 'Disposable24x7' },
    ],
  },
]

export const shopifyTools = ['App Bridge', 'Polaris', 'Theme app extensions']

export const experience = [
  {
    period: '2018 – Present',
    title: 'Senior Full-Stack Developer and Team Lead',
    org: 'Sainiweb Solutions Pvt. Ltd.',
    note: 'Apps are published under the company’s ZendApps brand.',
    place: 'Kota, Rajasthan',
    current: true,
    points: [
      'Lead the development team: plan the work, review progress and keep projects on schedule.',
      'Built and launched five public Shopify apps end to end: Elegantsy Product Labels, PreVue: Pre Order Products, AskMyStore AI Product Search, Callo AI Order Status Call and Jyotisham Astro Builder.',
      'Took Elegantsy Product Labels to Built for Shopify status with a 4.7 rating from 48 merchant reviews, and published it on Wix, BigCommerce, PrestaShop and WordPress.',
      'Shipped two AI products: product search powered by the OpenAI API, and automated order-status calls placed through Twilio with an ElevenLabs voice.',
      'Built six apps for the Wix App Market, including Estimated Shipping Date, Revix Product Review and Snap - Sales Popup.',
      'Contributed most of the features in BlockX Country Blocker and AGeo: Product Blocker, covering country, IP, VPN and bot blocking through Proxycheck.',
      'Built the backend APIs, admin panel and marketing website for Disposable24x7, a wholesale marketplace with customer, seller and rider apps, on Node.js, React and MongoDB.',
      'Maintain the live apps on every platform, including the move of our Shopify apps to the GraphQL Admin API, and handle technical support for merchants.',
    ],
  },
  {
    period: '2017 – 2018',
    title: 'Web Developer Intern',
    org: 'Sainiweb Solutions Pvt. Ltd.',
    place: 'Kota, Rajasthan',
    points: ['Started with HTML, CSS, PHP and MySQL, then moved into Shopify and BigCommerce app development and was hired full time.'],
  },
]

export const education = [
  { year: '2019', title: 'Bachelor of Computer Applications (BCA)', org: 'Modi Institute of Management & Technology, Kota' },
]

// Real merchant reviews, quoted word for word from the Shopify App Store listings.
export const reviews = [
  {
    quote: 'The app works as intended and support is AMAZING. We had to have it altered to work with our theme and a few personalization requests which they knocked out within 24 hours each time. Super easy to work with and to implement. Highly recommend.',
    who: 'ENO, United States',
    app: 'AGeo: Product Blocker',
    date: 'January 2025',
    url: 'https://apps.shopify.com/geoip-based-product-blocker/reviews',
  },
  {
    quote: 'This app is very easy to use and customisable. The team are very fast to respond to any setup questions!',
    who: 'A7 UK, United Kingdom',
    app: 'Elegantsy Product Labels',
    date: 'July 2025',
    url: 'https://apps.shopify.com/advanced-product-labels/reviews',
  },
  {
    quote: 'Very good app, serves its purpose very well. The support is quick to help with any problem and they have fixed a few issues for me over time. Thank you!',
    who: 'BIG STORE (Dynamic Tools SRL), Romania',
    app: 'Elegantsy Product Labels',
    date: 'March 2024',
    url: 'https://apps.shopify.com/advanced-product-labels/reviews',
  },
]

// My core stack; these are highlighted in the tech stack. Keep it to about ten items.
export const coreSkills = ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Node.js', 'React', 'Shopify', 'Wix', 'GraphQL Admin API', 'Theme app extensions', 'OpenAI API']

// `key` is the keyboard shortcut for the section (optional).
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'ai', label: 'AI', key: 'a' },
  { id: 'projects', label: 'Projects', key: 'p' },
  { id: 'experience', label: 'Experience', key: 'e' },
  { id: 'skills', label: 'Skills', key: 's' },
  { id: 'contact', label: 'Contact', key: 'c' },
]
