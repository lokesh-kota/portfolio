import { useEffect, useRef, useState } from 'react'
import { getTheme, toggleTheme } from '../theme'
import { aiWork, apis, education, resumeFile, experience, profile, projects, sections, skills } from '../data'

const COMMANDS = ['help', 'whoami', 'ai', 'projects', 'open', 'skills', 'apis', 'experience', 'education', 'contact', 'resume', 'theme', 'goto', 'clear']

const HELP = [
  ['whoami', 'who I am'],
  ['ai', 'my AI work'],
  ['projects', 'list everything I have shipped'],
  ['open <project>', 'open a project, e.g. open disposable24x7'],
  ['skills', 'my tech stack'],
  ['apis', 'APIs I have integrated'],
  ['experience', 'where I have worked'],
  ['education', 'degrees and schools'],
  ['contact', 'how to reach me'],
  ['resume', 'open my résumé (PDF)'],
  ['theme', 'switch between light and dark'],
  ['goto <section>', sections.map((s) => s.id).join(' | ')],
  ['clear', 'clear the screen'],
]

function run(input, { openProject, go }) {
  const [cmd, ...rest] = input.trim().split(/\s+/)
  const arg = rest.join(' ').toLowerCase()

  switch (cmd.toLowerCase()) {
    case 'help':
      return HELP.map(([c, d]) => ({ k: c, v: d }))
    case 'whoami':
    case 'about':
      return [`${profile.name}, ${profile.role} (${profile.focus})`, `${profile.location}. Building for the web since ${profile.since}.`, profile.summary]
    case 'ai':
      return [
        ...projects.filter((p) => p.ai).map((p) => ({ k: p.id, v: `${p.name}: ${p.tagline}` })),
        ...aiWork.map((a) => a.text),
        'Type "open askmystore" or "open callo" for details.',
      ]
    case 'projects':
    case 'ls':
      return projects.map((p) => ({ k: p.id, v: `${p.name} (${p.contribution ? `${p.kind}, ${p.contribution}` : p.kind})` })).concat('Type "open <project>" for details.')
    case 'open': {
      if (!arg) return ['Usage: open <project>. Try "projects" to see the list.']
      const hit = projects.find((p) => p.id === arg) || projects.find((p) => p.id.includes(arg) || p.name.toLowerCase().includes(arg))
      if (!hit) return [`No project matches "${arg}". Type "projects" to see the list.`]
      openProject(hit.id)
      return [`Opening ${hit.name}...`]
    }
    case 'skills':
      return skills.map((s) => ({ k: s.group, v: s.items.join(', ') }))
    case 'apis':
      return apis.flatMap((g) => g.items).map((a) => ({ k: a.name, v: `${a.use} (${a.apps})` }))
    case 'experience':
      return experience.map((e) => ({ k: e.period, v: `${e.title}, ${e.org}` }))
    case 'education':
      return education.map((e) => ({ k: e.year, v: `${e.title}, ${e.org}` }))
    case 'contact':
      return [
        { k: 'email', v: profile.email },
        { k: 'phone', v: profile.phone },
        { k: 'linkedin', v: profile.linkedin },
      ]
    case 'theme':
      toggleTheme()
      return [`Switched to ${getTheme()} theme.`]
    case 'resume':
    case 'cv':
      window.open(resumeFile, '_blank', 'noopener')
      return ['Opening résumé...']
    case 'goto':
    case 'cd': {
      const hit = sections.find((s) => s.id.startsWith(arg) && arg)
      if (!hit) return [`Usage: goto <${sections.map((s) => s.id).join(' | ')}>`]
      go(hit.id)
      return [`Jumping to ${hit.label}...`]
    }
    case 'sudo':
      return ['Permission granted. Email me and we can talk: ' + profile.email]
    default:
      return [`Command not found: ${cmd}. Type "help" to see what works.`]
  }
}

const INTRO = [
  { type: 'in', text: 'whoami' },
  { type: 'out', lines: [`${profile.name}, ${profile.role}`] },
  { type: 'out', lines: ['Type "help" and press Enter, or try "ai".'] },
]

export default function Terminal({ openProject, go, inputRef }) {
  const [log, setLog] = useState(INTRO)
  const [value, setValue] = useState('')
  const [history, setHistory] = useState([])
  const [cursor, setCursor] = useState(-1)
  const scroller = useRef(null)

  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTop = el.scrollHeight
  }, [log])

  function submit(e) {
    e.preventDefault()
    const input = value.trim()
    if (!input) return
    setHistory((h) => [input, ...h])
    setCursor(-1)
    setValue('')
    if (input.toLowerCase() === 'clear') return setLog([])
    setLog((l) => [...l, { type: 'in', text: input }, { type: 'out', lines: run(input, { openProject, go }) }])
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(-1, Math.min(history.length - 1, cursor + (e.key === 'ArrowUp' ? 1 : -1)))
      setCursor(next)
      setValue(next === -1 ? '' : history[next])
    } else if (e.key === 'Tab' && value) {
      e.preventDefault()
      const parts = value.split(/\s+/)
      if (parts.length === 1) {
        const hit = COMMANDS.find((c) => c.startsWith(parts[0].toLowerCase()))
        if (hit) setValue(hit + (hit === 'open' || hit === 'goto' ? ' ' : ''))
      } else {
        const pool = parts[0] === 'goto' ? sections.map((s) => s.id) : projects.map((p) => p.id)
        const hit = pool.find((id) => id.startsWith(parts[1].toLowerCase()))
        if (hit) setValue(`${parts[0]} ${hit}`)
      }
    }
  }

  return (
    <div
      className="flex h-[22rem] flex-col overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-(color:--shade)"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 text-xs text-dim">
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="ml-2">lokesh@portfolio: ~</span>
        <span className="ml-auto hidden sm:inline">Tab completes · ↑ history</span>
      </div>

      <div ref={scroller} className="flex-1 space-y-1.5 overflow-y-auto px-4 py-3 text-[13px] leading-relaxed" aria-live="polite">
        {log.map((entry, i) =>
          entry.type === 'in' ? (
            <p key={i} className="text-sky">
              <span className="text-dim">$ </span>
              {entry.text}
            </p>
          ) : (
            <div key={i} className="text-dim">
              {entry.lines.map((line, j) =>
                typeof line === 'string' ? (
                  <p key={j} className="break-words">{line}</p>
                ) : (
                  <p key={j} className="flex gap-3 break-words">
                    <span className="w-32 shrink-0 text-amber">{line.k}</span>
                    <span className="min-w-0 break-all sm:break-words">{line.v}</span>
                  </p>
                ),
              )}
            </div>
          ),
        )}
      </div>

      <form onSubmit={submit} className="flex items-center gap-2 border-t border-line px-4 py-2.5 text-[13px]">
        <label htmlFor="terminal-input" className="text-sky">$</label>
        <input
          id="terminal-input"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="type a command, e.g. help"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-text placeholder:text-dim/60 focus:outline-none"
        />
        <button type="submit" className="rounded border border-line px-2 py-0.5 text-xs text-dim hover:border-sky hover:text-sky">
          Run ↵
        </button>
      </form>
    </div>
  )
}
