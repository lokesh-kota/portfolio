import { useEffect, useState } from 'react'
import { projects } from '../data'
import Logo from './Logo'

// The AI apps have their own section above the grid, so they are not repeated here.
const listed = projects.filter((p) => !p.ai)
const kinds = ['All', ...new Set(listed.flatMap((p) => (p.links || []).map((l) => l.platform)))]
const match = (p, k) => k === 'All' || p.links?.some((l) => l.platform === k)

// App icon, or a lettered tile for projects without one.
export function AppIcon({ project, className = 'size-11' }) {
  return project.icon ? (
    <img src={project.icon} alt="" width="160" height="160" loading="lazy" className={`shrink-0 rounded-xl border border-line bg-white object-cover ${className}`} />
  ) : (
    <span className={`grid shrink-0 place-items-center rounded-xl bg-sky font-display text-lg font-bold text-ink ${className}`} aria-hidden="true">
      {project.name[0]}
    </span>
  )
}

function Platforms({ project, className = 'size-4' }) {
  if (!project.links) return <span className="text-xs text-dim">{project.kind}</span>
  return (
    <span className="flex items-center gap-2 text-dim" aria-label={`Available on ${project.links.map((l) => l.platform).join(', ')}`}>
      {project.links.map((l) => (
        <span key={l.platform} title={l.platform} className="flex">
          <Logo name={l.platform} className={className} />
        </span>
      ))}
    </span>
  )
}

function Stats({ project }) {
  return (
    <span className="text-xs text-dim">
      {project.rating && <span className="text-amber">★ {project.rating.toFixed(1)} </span>}
      {project.reviews && <span>{project.reviews} reviews</span>}
      {project.contribution && <span>{project.rating || project.reviews ? ' · ' : ''}{project.contribution}</span>}
    </span>
  )
}

export function Projects({ openProject }) {
  const [kind, setKind] = useState('All')
  const shown = listed.filter((p) => match(p, kind))

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {kinds.map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
            className={`flex items-center gap-2 rounded-md border px-3 py-1 text-sm transition-colors ${
              kind === k ? 'border-sky bg-sky text-ink' : 'border-line text-dim hover:border-sky hover:text-sky'
            }`}
          >
            <Logo name={k} className="size-3.5" />
            {k}
            <span className="opacity-70">{listed.filter((p) => match(p, k)).length}</span>
          </button>
        ))}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => openProject(p.id)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-panel text-left transition hover:-translate-y-0.5 hover:border-sky"
              >
                <span className="relative block aspect-video w-full shrink-0 overflow-hidden border-b border-line bg-raise">
                  <img
                    src={p.shots[0]}
                    alt={`${p.name} screenshot`}
                    width="1280"
                    height="720"
                    loading="lazy"
                    className="size-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
                  />
                  {p.badge && (
                    <span className="absolute top-3 right-3 rounded bg-amber px-2 py-0.5 text-[11px] font-bold text-ink">{p.badge}</span>
                  )}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-3 p-5">
                  <span className="flex items-center gap-3">
                    <AppIcon project={p} />
                    <span className="min-w-0">
                      <span className="block font-display text-lg leading-tight font-bold text-text">{p.name}</span>
                      <span className="mt-1 block"><Platforms project={p} /></span>
                    </span>
                  </span>
                  <span className="text-sm text-dim">{p.tagline}</span>
                  <span className="mt-auto flex flex-wrap gap-1.5 pt-1">
                    {p.tech.slice(0, 3).map((t) => (
                      <span key={t} className="rounded border border-line px-1.5 py-0.5 text-[11px] text-dim">{t}</span>
                    ))}
                  </span>
                  <span className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="text-sky opacity-80 group-hover:opacity-100">View details →</span>
                    <Stats project={p} />
                  </span>
                </span>
              </button>
            </li>
        ))}
      </ul>
    </>
  )
}

export function ProjectModal({ id, onClose, openProject }) {
  const index = projects.findIndex((p) => p.id === id)
  const p = projects[index]
  const [shot, setShot] = useState({ id, n: 0 })
  const current = shot.id === id ? shot.n : 0
  const step = (by) => projects[(index + by + projects.length) % projects.length].id

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') openProject(projects[(index + 1) % projects.length].id)
      if (e.key === 'ArrowLeft') openProject(projects[(index - 1 + projects.length) % projects.length].id)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, onClose, openProject])

  if (!p) return null

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/80 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={onClose}>
      <article
        key={p.id}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        className="rise flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl border border-line bg-panel shadow-2xl shadow-(color:--shade) sm:rounded-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-3 text-xs text-dim">
          <span className="truncate">~/projects/{p.id}</span>
          <button type="button" autoFocus onClick={onClose} className="shrink-0 rounded border border-line px-2 py-0.5 hover:border-sky hover:text-sky">
            Close · Esc
          </button>
        </header>

        <div className="overflow-y-auto">
          {/* Title band */}
          <div className="flex flex-wrap items-center gap-4 border-b border-line bg-raise/50 px-5 py-5 sm:px-7">
            <AppIcon project={p} className="size-16 sm:size-20" />
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 text-xs">
                {p.badge && <span className="rounded bg-amber px-2 py-0.5 font-bold text-ink">{p.badge}</span>}
                {p.contribution && <span className="rounded border border-line px-2 py-0.5 text-dim">{p.contribution}</span>}
                {!p.links && <span className="rounded border border-line px-2 py-0.5 text-dim">{p.kind}</span>}
              </p>
              <h3 id="project-title" className="mt-1.5 font-display text-2xl leading-tight font-bold text-balance sm:text-3xl">{p.name}</h3>
              <p className="mt-1 text-dim">{p.tagline}</p>
            </div>
            {p.rating && (
              <div className="rounded-xl border border-line bg-panel px-4 py-2 text-center">
                <p className="font-display text-2xl font-bold text-amber">★ {p.rating.toFixed(1)}</p>
                <p className="text-xs text-dim">{p.reviews} Shopify reviews</p>
              </div>
            )}
          </div>

          <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[1.5fr_1fr]">
            {/* Gallery */}
            <div className="min-w-0">
              <div className="overflow-hidden rounded-xl border border-line bg-raise">
                <img
                  src={p.shots[current]}
                  alt={`${p.name} screenshot ${current + 1}`}
                  width="1280"
                  height="720"
                  className="aspect-video w-full object-cover object-top"
                />
              </div>
              {p.shots.length > 1 && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {p.shots.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      aria-label={`Show screenshot ${i + 1}`}
                      aria-pressed={i === current}
                      onClick={() => setShot({ id, n: i })}
                      className={`overflow-hidden rounded-lg border-2 transition ${i === current ? 'border-sky' : 'border-line opacity-70 hover:opacity-100'}`}
                    >
                      <img src={src} alt="" width="1280" height="720" loading="lazy" className="aspect-video w-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
              <h4 className="mt-6 mb-2 text-xs tracking-widest text-dim uppercase">What I did</h4>
              <p className="max-w-[62ch] text-text">{p.work}</p>
              <h4 className="mt-5 mb-2 text-xs tracking-widest text-dim uppercase">About the {p.links ? 'app' : 'platform'}</h4>
              <p className="max-w-[62ch] text-dim">{p.description}</p>
            </div>

            {/* Facts */}
            <div className="min-w-0 space-y-6">
              <div>
                <h4 className="mb-2 text-xs tracking-widest text-dim uppercase">{p.links ? 'Available on' : 'Live at'}</h4>
                <div className="flex flex-col gap-2">
                  {(p.links?.filter((l) => l.url) || [{ url: p.url }]).map((l, i) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-3 rounded-lg px-4 py-2.5 ${i === 0 ? 'bg-sky font-bold text-ink hover:brightness-110' : 'border border-line hover:border-sky hover:text-sky'}`}
                    >
                      {l.platform && <Logo name={l.platform} className="size-5" />}
                      <span className="min-w-0 flex-1 truncate">{l.platform ? `${l.platform} listing` : p.linkLabel}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
                {p.links?.some((l) => !l.url) && (
                  <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-dim">
                    Also on
                    {p.links.filter((l) => !l.url).map((l) => (
                      <span key={l.platform} className="flex items-center gap-1.5 rounded border border-line px-2 py-0.5 text-text">
                        <Logo name={l.platform} className="size-3.5" />
                        {l.platform}
                      </span>
                    ))}
                  </p>
                )}
              </div>

              <div>
                <h4 className="mb-2 text-xs tracking-widest text-dim uppercase">My role</h4>
                <ul className="space-y-1">
                  {p.role.map((r) => (
                    <li key={r} className="flex gap-2"><span className="text-sky">▸</span>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 text-xs tracking-widest text-dim uppercase">Highlights</h4>
                <ul className="space-y-1 text-dim">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2"><span className="text-sky">▸</span>{h}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 text-xs tracking-widest text-dim uppercase">Built with</h4>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="flex items-center gap-1.5 rounded border border-line px-2 py-0.5 text-sm">
                      <Logo name={t} className="size-3.5" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t border-line px-5 py-3 text-xs text-dim">
          <button type="button" onClick={() => openProject(step(-1))} className="hover:text-sky">← Previous</button>
          <span>{index + 1} / {projects.length}</span>
          <button type="button" onClick={() => openProject(step(1))} className="hover:text-sky">Next →</button>
        </footer>
      </article>
    </div>
  )
}
