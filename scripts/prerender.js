// Runs after `vite build`. Makes the site readable by search engines without running JavaScript:
// 1. renders the React app to HTML and puts it into dist/index.html
// 2. adds structured data (schema.org) describing the person and the projects
// 3. writes sitemap.xml and robots.txt
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { loadEnv } from 'vite'

const root = new URL('..', import.meta.url).pathname
const site = (loadEnv('production', root).VITE_SITE_URL || '').replace(/\/$/, '')
if (!site || site.includes('YOUR-DOMAIN')) {
  console.warn('\n⚠  VITE_SITE_URL is not set in .env. Set it to your live domain before deploying.\n')
}

const { render, data } = await import(`${root}dist-ssr/entry-server.js`)
const { profile, projects, skills, education, experience } = data

const person = {
  '@type': 'Person',
  '@id': `${site}/#person`,
  name: profile.name,
  url: `${site}/`,
  image: `${site}${profile.photo || '/og.png'}`,
  jobTitle: profile.role,
  description: profile.summary,
  email: `mailto:${profile.email}`,
  telephone: profile.phone.replace(/\s/g, ''),
  address: { '@type': 'PostalAddress', addressLocality: 'Kota', addressRegion: 'Rajasthan', addressCountry: 'IN' },
  sameAs: [profile.linkedin],
  worksFor: { '@type': 'Organization', name: experience[0].org, alternateName: 'ZendApps' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: education[0].org },
  knowsAbout: skills.flatMap((s) => s.items),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': `${site}/#website`, url: `${site}/`, name: profile.name, inLanguage: 'en' },
    {
      '@type': 'ProfilePage',
      '@id': `${site}/#profile`,
      url: `${site}/`,
      name: `${profile.name} — ${profile.role}`,
      isPartOf: { '@id': `${site}/#website` },
      mainEntity: { '@id': `${site}/#person` },
      dateModified: new Date().toISOString(),
    },
    person,
    ...projects.map((p) => ({
      '@type': p.links ? 'SoftwareApplication' : 'WebSite',
      name: p.name,
      description: p.description,
      url: p.url,
      ...(p.links && { applicationCategory: 'BusinessApplication', operatingSystem: 'Web' }),
      [p.contribution === 'Built' || !p.links ? 'creator' : 'contributor']: { '@id': `${site}/#person` },
    })),
  ],
}

const file = `${root}dist/index.html`
let html = readFileSync(file, 'utf8')
html = html
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
  .replace('</head>', `  <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>\n  </head>`)
writeFileSync(file, html)

const today = new Date().toISOString().slice(0, 10)
writeFileSync(
  `${root}dist/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${site}/</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`,
)
writeFileSync(`${root}dist/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)

rmSync(`${root}dist-ssr`, { recursive: true, force: true })
console.log('Prerendered dist/index.html, wrote sitemap.xml and robots.txt')
