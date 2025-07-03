"use client"

import { useTheme } from "../contexts/ThemeContext"

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      <div className="toggle-track">
        <div className="toggle-thumb">
          <span className="toggle-icon">{isDark ? "🌙" : "☀️"}</span>
        </div>
      </div>
    </button>
  )
}

export default ThemeToggle
