import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export * as data from './data'

export const render = () =>
  renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
