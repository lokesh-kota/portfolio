// Generates public/Lokesh-Suman-Resume.pdf from src/data.js. Run with: npm run resume
// The layout is a single column of real text with standard headings, so applicant tracking systems can read it.
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { education, experience, profile, projects, skills } from '../src/data.js'

const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;')
const link = (url) => `<a href="${url}">${esc(url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</a>`

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${profile.name} — Résumé</title><style>
@page { size: A4; margin: 14mm 15mm; }
body { font: 10pt/1.42 Helvetica, Arial, sans-serif; color: #111; margin: 0; }
h1 { font-size: 22pt; margin: 0; letter-spacing: -0.3px; }
.role { font-size: 11.5pt; color: #1d4f91; font-weight: bold; margin: 2px 0 4px; }
.contact { color: #333; }
a { color: #1d4f91; text-decoration: none; }
h2 { break-after: avoid; page-break-after: avoid; font-size: 10.5pt; text-transform: uppercase; letter-spacing: 1px; color: #1d4f91; border-bottom: 1px solid #b9c4d6; padding-bottom: 2px; margin: 13px 0 6px; }
h3 { font-size: 10.5pt; margin: 0; }
.row { display: flex; justify-content: space-between; gap: 12px; }
.meta { color: #444; }
ul { margin: 3px 0 7px; padding-left: 16px; }
li { margin-bottom: 1.5px; }
p { margin: 0 0 5px; }
.proj { margin-bottom: 6px; break-inside: avoid; }
</style></head><body>
<h1>${esc(profile.name)}</h1>
<div class="role">${esc(profile.role)} · ${esc(profile.focus)}</div>
<div class="contact">${esc(profile.location)} · ${esc(profile.phone)} · <a href="mailto:${profile.email}">${profile.email}</a> · ${link(profile.linkedin)}</div>
<div class="contact">Work mode: ${esc(profile.workMode)} · Notice period: ${esc(profile.noticePeriod)}</div>

<h2>Summary</h2>
<p>${esc(profile.summary)}</p>

<h2>Skills</h2>
${skills.map((s) => `<p><b>${esc(s.group)}:</b> ${esc(s.items.join(', '))}</p>`).join('')}

<h2>Experience</h2>
${experience.map((e) => `<div class="row"><h3>${esc(e.title)}, ${esc(e.org)}</h3><span class="meta">${esc(e.period)}</span></div>
<div class="meta">${esc(e.place)}${e.note ? ` · ${esc(e.note)}` : ''}</div><ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`).join('')}

<h2>Selected projects</h2>
${projects.slice(0, 6).map((p) => `<div class="proj"><div class="row"><h3>${esc(p.name)} <span class="meta" style="font-weight:normal">(${esc([p.links ? `${p.links.map((l) => l.platform).join(', ')} app` : p.kind, p.contribution, p.rating && `${p.rating}★ from ${p.reviews} Shopify reviews`].filter(Boolean).join(', '))})</span></h3><span>${link(p.url)}</span></div>
<div>${esc(p.tagline)}. <span class="meta">${esc(p.tech.join(', '))}</span></div></div>`).join('')}
<div class="proj"><b>Also:</b> ${projects.slice(6).map((p) => `${esc(p.name)} (${esc([p.links.map((l) => l.platform).join(', '), p.contribution].join(', '))})`).join('; ')}.</div>

<h2>Education</h2>
${education.map((e) => `<div class="row"><span><b>${esc(e.title)}</b>, ${esc(e.org)}</span><span class="meta">${esc(e.year)}</span></div>`).join('')}

<h2>Languages</h2>
<p>English, Hindi (native)</p>
</body></html>`

const file = join(mkdtempSync(join(tmpdir(), 'resume-')), 'resume.html')
writeFileSync(file, html)
const out = new URL('../public/Lokesh-Suman-Resume.pdf', import.meta.url).pathname
execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${out}`, `file://${file}`], { stdio: 'ignore' })
console.log('Wrote', out)
