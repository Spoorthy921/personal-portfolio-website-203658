import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Simple top navigation with anchor links to sections.
 */
export function Navbar({ sections, onToggleTheme, theme }) {
  return (
    <header className="navbar" role="banner">
      <div className="container navbar-inner">
        <a className="brand" href="#top" aria-label="Go to top">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span className="brand-text">Portfolio</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {sections.map((s) => (
            <a key={s.id} className="nav-link" href={`#${s.id}`}>
              {s.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="btn btn-ghost btn-small"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </header>
  );
}
