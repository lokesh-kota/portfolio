import { useSyncExternalStore } from 'react'

// The theme lives on <html data-theme="dark|light">. An inline script in index.html sets it
// before first paint (saved choice first, then the visitor's system setting).
const listeners = new Set()
const colors = { dark: '#0d1321', light: '#f4f6fb' }

export const getTheme = () => document.documentElement.dataset.theme || 'dark'

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors[theme])
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Private windows can block storage; the choice then lasts for this visit only.
  }
  listeners.forEach((notify) => notify())
}

export const toggleTheme = () => setTheme(getTheme() === 'dark' ? 'light' : 'dark')

const subscribe = (notify) => {
  listeners.add(notify)
  return () => listeners.delete(notify)
}

export const useTheme = () => useSyncExternalStore(subscribe, getTheme, () => 'dark')
