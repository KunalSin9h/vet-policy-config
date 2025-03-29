import { useState } from "react"

export default function Header() {
    const [sideMode, setSideMode] = useState(false)

    return (
        <main>
        <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div>
                <h1 className="font-semibold text-black text-2xl">Vet <span className="text-blue-500 font-mono">PolicyConfig</span></h1>
            </div>
            <p className="tagline">The easiest way to configure vet policy as code file.</p>
          </div>
          <div className="header-actions">
            <select className="language-select">
              <option value="en">English</option>
            </select>
            <button 
              className="side-mode-button"
              onClick={() => setSideMode(!sideMode)}
            >
              Side-by-side mode
            </button>
          </div>
        </div>
      </header>
      <main className={`${sideMode ? 'side-mode' : ''}`}>
        <div className="config-section">
            <div className="config-section-header">
                <h2 className="config-section-title">Configuration</h2>
            </div>
        </div>
      </main>
      </main>
    )
}