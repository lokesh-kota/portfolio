import { useEffect, useMemo, useRef, useState } from 'react'
import { toggleTheme } from '../theme'
import { profile, projects, resumeFile, sections } from '../data'

export default function CommandPalette({ onClose, openProject, go, copy }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const input = useRef(null)
  const list = useRef(null)

  const items = useMemo(
    () => [
      ...sections.map((s) => ({ group: 'Go to', label: s.label, hint: s.key?.toUpperCase() ?? '', run: () => go(s.id) })),
      ...projects.map((p) => ({ group: 'Projects', label: p.name, hint: p.kind, run: () => openProject(p.id) })),
      { group: 'Settings', label: 'Switch light / dark theme', hint: '', run: toggleTheme },
      { group: 'Contact', label: 'Download résumé', hint: 'PDF', run: () => window.open(resumeFile, '_blank', 'noopener') },
      { group: 'Contact', label: 'Copy email address', hint: profile.email, run: () => copy(profile.email, 'Email') },
      { group: 'Contact', label: 'Copy phone number', hint: profile.phone, run: () => copy(profile.phone, 'Phone number') },
      { group: 'Contact', label: 'Open LinkedIn profile', hint: '↗', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
    ],
    [go, openProject, copy],
  )

  const q = query.trim().toLowerCase()
  const results = q ? items.filter((i) => `${i.label} ${i.group} ${i.hint}`.toLowerCase().includes(q)) : items

  useEffect(() => input.current?.focus(), [])
  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  function choose(item) {
    onClose()
    item.run()
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (a + 1) % Math.max(results.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a - 1 + results.length) % Math.max(results.length, 1))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      choose(results[active])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/80 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className="rise w-full max-w-lg overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-(color:--shade)"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="text-sky">›</span>
          <input
            id="palette-input"
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={onKeyDown}
            placeholder="Search projects, sections, actions"
            aria-label="Search commands"
            className="min-w-0 flex-1 bg-transparent text-text placeholder:text-dim/70 focus:outline-none"
          />
          <kbd className="rounded border border-line px-1.5 text-xs text-dim">Esc</kbd>
        </div>
        <ul ref={list} role="listbox" className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-dim">Nothing matches "{query}".</li>}
          {results.map((item, i) => (
            <li key={item.group + item.label}>
              {(i === 0 || results[i - 1].group !== item.group) && (
                <p className="px-3 pt-2 pb-1 text-[11px] tracking-widest text-dim uppercase">{item.group}</p>
              )}
              <button
                type="button"
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(item)}
                className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2 text-left ${i === active ? 'bg-raise text-text' : 'text-dim'}`}
              >
                <span className="min-w-0 truncate">{item.label}</span>
                <span className="shrink-0 truncate text-xs text-dim">{item.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
