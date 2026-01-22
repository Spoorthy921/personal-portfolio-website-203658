import React, { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Enhanced navigation with active section highlighting and mobile menu.
 */
export function Navbar({ sections, onToggleTheme, theme }) {
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sections.find(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar" role="banner">
      <div className="container navbar-inner">
        <a className="brand" href="#top" aria-label="Go to top">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span className="brand-text">Portfolio</span>
        </a>

        <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`} aria-label="Primary">
          {sections.map((s) => (
            <a 
              key={s.id} 
              className={`nav-link ${activeSection === s.id ? 'active' : ''}`} 
              href={`#${s.id}`}
              onClick={handleLinkClick}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <button
            type="button"
            className="btn btn-ghost btn-small"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
    </header>
  );
}
