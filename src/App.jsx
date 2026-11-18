import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import CommandPalette from './components/CommandPalette'
import Logo from './components/Logo'
import { AppIcon, ProjectModal, Projects } from './components/Projects'
import Terminal from './components/Terminal'
import { toggleTheme, useTheme } from './theme'
import { about, aiWork, apis, coreSkills, reviews, shopifyTools, platforms, education, experience, profile, projects, quickFacts, resumeFile, sections, skills } from './data'

// Resolved after hydration so the prerendered HTML and the first client render match.
const noop = () => () => {}
const useIsMac = () => useSyncExternalStore(noop, () => /Mac|iPhone|iPad/.test(navigator.platform), () => false)
const thisYear = new Date().getFullYear()
const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Typed({ words }) {
  const [text, setText] = useState(words[0])
  const state = useRef({ word: 0, len: words[0].length, deleting: true, wait: 1800 })

  useEffect(() => {
    if (reducedMotion) return
    let timer
    const tick = () => {
      const s = state.current
      const full = words[s.word]
      if (s.wait) {
        const pause = s.wait
        s.wait = 0
        timer = setTimeout(tick, pause)
        return
      }
      if (s.deleting) {
        s.len -= 1
        if (s.len === 0) {
          s.deleting = false
          s.word = (s.word + 1) % words.length
        }
      } else {
        s.len += 1
        if (s.len === words[s.word].length) {
          s.deleting = true
          s.wait = 1800
        }
      }
      setText((s.deleting ? full : words[s.word]).slice(0, s.len))
      timer = setTimeout(tick, s.deleting ? 35 : 70)
    }
    timer = setTimeout(tick, 0)
    return () => clearTimeout(timer)
  }, [words])

  return (
    <span className="text-sky">
      {text}
      <span className="cursor ml-1" aria-hidden="true" />
    </span>
  )
}

function Section({ id, title, className = '', children }) {
  const label = sections.find((s) => s.id === id)?.label ?? id[0].toUpperCase() + id.slice(1)
  return (
    <section id={id} className={`border-t border-line/60 py-16 sm:py-20 ${className}`}>
      <h2 className="mb-8 flex flex-wrap items-baseline gap-x-3 font-display text-3xl font-bold text-balance sm:text-4xl">
        <span className="font-mono text-base font-normal text-sky">./{label}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function CopyRow({ label, value, href, copy }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-5 py-4 last:border-b-0">
      <span className="w-20 shrink-0 text-amber">{label}</span>
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="min-w-0 flex-1 break-all text-text hover:text-sky">
        {value}
      </a>
      <button type="button" onClick={() => copy(value, label)} className="rounded border border-line px-2.5 py-1 text-xs text-dim hover:border-sky hover:text-sky">
        Copy
      </button>
    </div>
  )
}

export default function App() {
  const [palette, setPalette] = useState(false)
  const [projectId, setProjectId] = useState(null)
  const [toast, setToast] = useState('')
  const terminalInput = useRef(null)
  const isMac = useIsMac()
  const theme = useTheme()

  const go = useCallback((id) => {
    setProjectId(null)
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }, [])

  const openProject = useCallback((id) => setProjectId(id), [])
  const closeProject = useCallback(() => setProjectId(null), [])

  const copy = useCallback(async (value, label) => {
    try {
      await navigator.clipboard.writeText(value)
      setToast(`${label} copied`)
    } catch {
      setToast(`Could not copy. ${label}: ${value}`)
    }
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(t)
  }, [toast])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((p) => !p)
        return
      }
      const typing = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.target.isContentEditable
      if (typing || e.metaKey || e.ctrlKey || e.altKey || palette || projectId) return
      if (e.key === '/') {
        e.preventDefault()
        terminalInput.current?.focus()
        return
      }
      const hit = sections.find((s) => s.key === e.key.toLowerCase())
      if (hit) go(hit.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [palette, projectId, go])

  const apps = projects.filter((p) => p.links)
  const reviewCount = apps.reduce((sum, p) => sum + (p.reviews || 0), 0)
  const builtOn = (platform) => apps.filter((p) => p.contribution === 'Built' && p.links[0].platform === platform).length
  const career = [
    [builtOn('Shopify'), 'Shopify apps built end to end'],
    [apps.filter((p) => p.links.some((l) => l.platform === 'Wix')).length, 'Apps on the Wix App Market'],
    [projects.filter((p) => p.ai).length, 'AI products shipped'],
    [platforms.length, 'E-commerce platforms'],
  ]
  const flagship = projects.find((p) => p.badge === 'Built for Shopify')
  const stats = [
    [`${thisYear - profile.fullTimeSince}+`, 'Years of experience'],
    [projects.length, `Products shipped on ${platforms.length} platforms`],
    [`${Math.floor(reviewCount / 10) * 10}+`, 'Shopify merchant reviews'],
    [projects.filter((p) => p.ai).length, 'AI apps shipped'],
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8">
      <header className="sticky top-0 z-30 -mx-4 flex items-center justify-between gap-4 border-b border-line/60 bg-ink/85 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <a href="#top" className="font-bold text-text">
          <span className="text-sky">~/</span>lokesh-suman
        </a>
        <nav className="hidden items-center gap-6 text-sm text-dim lg:flex" aria-label="Sections">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="hover:text-sky">{s.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          className="flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-sm text-dim hover:border-sky hover:text-sky"
        >
          <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
        <button
          type="button"
          onClick={() => setPalette(true)}
          className="flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-sm text-dim hover:border-sky hover:text-sky"
        >
          <span>Menu</span>
          <kbd className="hidden text-xs text-amber sm:inline">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
        </button>
        </div>
      </header>

      <main id="top" className="max-lg:flex max-lg:flex-col">
        {/* On phones and tablets this wrapper dissolves, so the terminal can sit after the About section. */}
        <section className="grid items-center gap-10 py-14 max-lg:contents sm:py-20 lg:grid-cols-[1.1fr_1fr]">
          <div className="rise min-w-0 max-lg:-order-3 max-lg:pt-14 max-lg:pb-10">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-dim">
              <span className="size-2 rounded-full bg-amber" />
              Open to new roles · {profile.workMode}
            </p>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {profile.photo && (
              <img src={profile.photo} alt={`Portrait of ${profile.name}`} width="640" height="640" className="size-24 shrink-0 rounded-full border-2 border-sky object-cover sm:size-28" />
            )}
            <h1 className="min-w-0 font-display text-[clamp(2.2rem,4.4vw,3.25rem)] leading-[1.02] font-bold tracking-tight">
              <span className="whitespace-nowrap">{profile.name}</span>
              <span className="sr-only">, {profile.role}, {profile.location}. </span>
              <span className="mt-3 block min-h-[1.2em] text-[0.5em] leading-tight font-medium whitespace-nowrap text-dim">
                I build <Typed words={profile.typed} />
              </span>
            </h1>
            </div>
            <p className="mt-6 max-w-[58ch] text-dim">{profile.summary}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-md bg-sky px-5 py-2.5 font-bold text-ink hover:brightness-110">View projects</a>
              <a href={resumeFile} download className="rounded-md border border-line px-5 py-2.5 hover:border-sky hover:text-sky">↓ Download résumé</a>
              <a href="#contact" className="rounded-md border border-line px-5 py-2.5 hover:border-sky hover:text-sky">Contact me</a>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 text-sm sm:grid-cols-4">
              {stats.map(([value, label]) => (
                <div key={label}>
                  <dd className="font-display text-3xl font-bold">{value}</dd>
                  <dt className="text-dim">{label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="rise min-w-0 max-lg:pb-14" style={{ animationDelay: '120ms' }}>
            <Terminal openProject={openProject} go={go} inputRef={terminalInput} />
            <p className="mt-3 hidden text-xs text-dim md:block">
              Shortcuts: <kbd className="text-amber">/</kbd> Terminal
              {sections.filter((s) => s.key).map((s) => (
                <span key={s.id}> · <kbd className="text-amber">{s.key.toUpperCase()}</kbd> {s.label}</span>
              ))}
            </p>
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line/60 py-8 max-lg:-order-2">
          <span className="text-xs tracking-widest text-dim uppercase">Platforms I build for</span>
          {platforms.map((name) => (
            <span key={name} className="flex items-center gap-2.5 text-text">
              <Logo name={name} className="size-6" />
              {name}
            </span>
          ))}
        </div>

        <Section id="about" title="About me" className="max-lg:-order-1">
          <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="max-w-[62ch] space-y-4 text-dim">
              {about.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <div>
            <div className="overflow-hidden rounded-xl border border-line bg-panel">
              <p className="border-b border-line px-5 py-2.5 text-xs text-dim">Quick facts</p>
              <dl className="divide-y divide-line text-sm">
                {quickFacts.map(([k, v]) => (
                  <div key={k} className="flex gap-4 px-5 py-2.5">
                    <dt className="w-24 shrink-0 text-amber">{k}</dt>
                    <dd className="min-w-0">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            </div>
          </div>
        </Section>

        <Section id="ai" title="AI-powered apps">
          <p className="-mt-4 mb-8 max-w-[62ch] text-dim">Apps where AI is the product feature: it talks to shoppers, searches the catalogue and makes phone calls.</p>
          <div className="grid gap-4 lg:grid-cols-2">
            {projects.filter((p) => p.ai).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => openProject(p.id)}
                className="group flex flex-col overflow-hidden rounded-xl border border-sky/40 bg-panel text-left transition hover:-translate-y-0.5 hover:border-sky"
              >
                <span className="block aspect-video w-full overflow-hidden border-b border-line bg-raise">
                  <img src={p.shots[0]} alt={`${p.name} screenshot`} width="1280" height="720" loading="lazy" className="size-full object-cover object-top transition duration-300 group-hover:scale-[1.03]" />
                </span>
                <span className="flex flex-1 flex-col gap-3 p-6">
                <span className="flex items-center gap-4">
                  <AppIcon project={p} className="size-14" />
                  <span className="min-w-0">
                    <span className="block font-display text-2xl leading-tight font-bold">{p.name}</span>
                    <span className="mt-1 flex items-center gap-2 text-xs text-dim"><Logo name="Shopify" /> Shopify app · {p.contribution}</span>
                  </span>
                </span>
                <span className="text-dim">{p.description}</span>
                <span className="flex flex-wrap gap-2">
                  {p.tech.slice(0, 3).map((t) => (
                    <span key={t} className="flex items-center gap-1.5 rounded border border-line px-2 py-0.5 text-xs"><Logo name={t} className="size-3.5" />{t}</span>
                  ))}
                </span>
                <span className="mt-auto pt-2 text-sm text-sky opacity-80 group-hover:opacity-100">View details →</span>
                </span>
              </button>
            ))}
          </div>
          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            {aiWork.map((a) => (
              <div key={a.title} className="border-l border-line pl-4">
                <dt className="text-amber">{a.title}</dt>
                <dd className="mt-1 text-sm text-dim">{a.text}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="projects" title="More things I’ve built">
          <Projects openProject={openProject} />
        </Section>

        <Section id="reviews" title="What merchants say">
          <ul className="grid gap-4 lg:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.who} className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-6">
                <p className="text-amber" aria-label="5 out of 5 stars">★★★★★</p>
                <blockquote className="text-text">“{r.quote}”</blockquote>
                <p className="mt-auto text-sm text-dim">
                  {r.who}
                  <a href={r.url} target="_blank" rel="noreferrer" className="mt-1 block text-sky hover:underline">
                    {r.app} · {r.date} ↗
                  </a>
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-dim">Quoted word for word from public reviews on the Shopify App Store.</p>
        </Section>

        <Section id="experience" title="Experience">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <ol className="space-y-8 border-l border-line pl-6">
              {experience.map((e) => (
                <li key={e.period} className="relative">
                  <span className="absolute top-2 -left-[29px] size-2.5 rounded-full bg-sky ring-4 ring-ink" />
                  <p className="flex flex-wrap items-center gap-x-3 text-sm text-amber">
                    {e.period}
                    {e.current && <span className="rounded-full border border-sky px-2 text-xs text-sky">Current</span>}
                  </p>
                  <h3 className="font-display text-xl font-bold">{e.title}</h3>
                  <p className="text-dim">{e.org} · {e.place}</p>
                  {e.note && <p className="text-sm text-dim">{e.note}</p>}
                  <ul className="mt-3 space-y-1.5 text-dim">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-2"><span className="text-sky">▸</span>{pt}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-xl border border-line bg-panel">
                <h3 className="border-b border-line px-5 py-2.5 text-xs tracking-widest text-dim uppercase">Career in numbers</h3>
                <dl className="grid grid-cols-2">
                  {career.map(([value, label]) => (
                    <div key={label} className="border-line px-5 py-4 odd:border-r nth-[n+3]:border-t">
                      <dd className="font-display text-3xl font-bold text-sky">{value}</dd>
                      <dt className="text-sm text-dim">{label}</dt>
                    </div>
                  ))}
                </dl>
              </div>

              {flagship && (
                <button
                  type="button"
                  onClick={() => openProject(flagship.id)}
                  className="flex w-full items-center gap-4 rounded-xl border border-line bg-panel p-5 text-left transition hover:border-sky"
                >
                  <AppIcon project={flagship} className="size-14" />
                  <span className="min-w-0">
                    <span className="text-xs tracking-widest text-amber uppercase">Recognition</span>
                    <span className="block font-display text-lg leading-tight font-bold">{flagship.badge}</span>
                    <span className="block text-sm text-dim">
                      {flagship.name} · ★ {flagship.rating.toFixed(1)} from {flagship.reviews} reviews
                    </span>
                  </span>
                </button>
              )}

              <div className="overflow-hidden rounded-xl border border-line bg-panel">
                <h3 className="border-b border-line px-5 py-2.5 text-xs tracking-widest text-dim uppercase">Education</h3>
                <ul className="divide-y divide-line">
                  {education.map((e) => (
                    <li key={e.year} className="flex gap-4 px-5 py-4">
                      <span className="w-12 shrink-0 text-amber">{e.year}</span>
                      <span><span className="block text-text">{e.title}</span><span className="text-sm text-dim">{e.org}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>

        <Section id="skills" title="Tech stack and APIs">
          <div className="overflow-hidden rounded-xl border border-line bg-panel">
            <p className="border-b border-line px-5 py-2.5 text-xs text-dim">stack.json · highlighted = my core stack</p>
            <dl className="divide-y divide-line">
              {skills.map((s) => (
                <div key={s.group} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
                  <dt className="w-40 shrink-0 text-amber">{s.group}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span key={item} className={`flex items-center gap-1.5 rounded border px-2.5 py-1 text-sm transition-colors hover:border-sky hover:text-sky ${coreSkills.includes(item) ? 'border-sky/60 bg-raise text-text' : 'border-line text-dim'}`}><Logo name={item} className="size-3.5" />{item}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        <div className="-mt-8 pb-16 sm:-mt-10 sm:pb-20">
          <div className="overflow-hidden rounded-xl border border-line bg-panel">
            <p className="border-b border-line px-5 py-2.5 text-xs text-dim">integrations.json · APIs I have worked with, what I used them for, and where</p>
            <div className="text-sm">
              {apis.map((g) => (
                <div key={g.group} className="border-b border-line">
                  <h3 className="bg-raise/50 px-5 py-2 text-xs tracking-widest text-amber uppercase">{g.group}</h3>
                  <ul className="divide-y divide-line/60">
                    {g.items.map((api) => (
                      <li key={api.name} className="grid gap-x-6 gap-y-1 px-5 py-3 sm:grid-cols-[15rem_1fr] lg:grid-cols-[15rem_1fr_13rem]">
                        <span className="text-text">{api.name}</span>
                        <span className="text-dim">{api.use}</span>
                        <span className="text-xs leading-6 text-dim sm:col-start-2 lg:col-start-3 lg:text-right">{api.apps}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="flex flex-wrap items-center gap-2 px-5 py-3 text-dim">
                <span className="text-xs tracking-widest uppercase">Shopify app tools</span>
                {shopifyTools.map((t) => (
                  <span key={t} className="rounded border border-line px-2 py-0.5 text-text">{t}</span>
                ))}
              </p>
            </div>
          </div>
        </div>

        <Section id="contact" title="Let’s talk">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="max-w-[46ch] text-dim">
              I’m looking for my next full-stack role, working with PHP, Laravel, Node.js and React on E-commerce apps and AI features. I prefer remote work and can join within 30 days, sooner if needed. If you think I’d be a good fit for your team, email or call me.
            </p>
              <a href={resumeFile} download className="mt-6 inline-block rounded-md bg-sky px-5 py-2.5 font-bold text-ink hover:brightness-110">↓ Download résumé (PDF)</a>
            </div>
            <div className="overflow-hidden rounded-xl border border-line bg-panel">
              <CopyRow label="Email" value={profile.email} href={`mailto:${profile.email}`} copy={copy} />
              <CopyRow label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, '')}`} copy={copy} />
              <CopyRow label="LinkedIn" value={profile.linkedin.replace('https://www.', '').replace(/\/$/, '')} href={profile.linkedin} copy={copy} />
            </div>
          </div>
        </Section>
      </main>

      <footer className="flex flex-wrap justify-between gap-2 border-t border-line/60 py-8 text-xs text-dim">
        <span>© {thisYear} {profile.name}</span>
        <span>Built with React, Vite and Tailwind CSS</span>
      </footer>

      {projectId && <ProjectModal id={projectId} onClose={closeProject} openProject={openProject} />}
      {palette && <CommandPalette onClose={() => setPalette(false)} openProject={openProject} go={go} copy={copy} />}

      <div role="status" className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
        {toast && <span className="rise rounded-md border border-sky bg-panel px-4 py-2 text-sm text-text shadow-xl">{toast}</span>}
      </div>
    </div>
  )
}
