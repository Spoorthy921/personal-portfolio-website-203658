import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

import { Navbar } from './components/Navbar';
import { Section } from './components/Section';
import { AboutSection } from './sections/AboutSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';
import { ContactSection } from './sections/ContactSection';
import { getApiBaseUrl } from './api/client';

// PUBLIC_INTERFACE
function App() {
  /** Portfolio single-page app with theme toggle and section navigation. */
  const [theme, setTheme] = useState('light');

  const sections = useMemo(
    () => [
      { id: 'about', label: 'About' },
      { id: 'projects', label: 'Projects' },
      { id: 'skills', label: 'Skills' },
      { id: 'contact', label: 'Contact' }
    ],
    []
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /** Toggle between light/dark themes. */
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App" id="top">
      <Navbar sections={sections} theme={theme} onToggleTheme={toggleTheme} />

      <main className="main">
        <div className="hero">
          <div className="container hero-inner">
            <div className="hero-text">
              <p className="eyebrow">Full-Stack Portfolio</p>
              <h1 className="hero-title">Showcase your work with a clean, modern site.</h1>
              <p className="hero-subtitle">
                This site loads portfolio content from an Express backend via REST APIs.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#projects">View Projects</a>
                <a className="btn btn-ghost" href="#contact">Contact</a>
              </div>
              <p className="hint">
                API base: <code>{getApiBaseUrl()}</code>
              </p>
            </div>

            <div className="hero-card" aria-label="Quick stats">
              <div className="stat">
                <div className="stat-value">React</div>
                <div className="stat-label">Frontend</div>
              </div>
              <div className="stat">
                <div className="stat-value">Express</div>
                <div className="stat-label">Backend</div>
              </div>
              <div className="stat">
                <div className="stat-value">REST</div>
                <div className="stat-label">APIs</div>
              </div>
            </div>
          </div>
        </div>

        <Section
          id="about"
          title="About"
          subtitle="A short introduction and where to find me online."
        >
          <AboutSection />
        </Section>

        <Section
          id="projects"
          title="Projects"
          subtitle="A selection of things I’ve built recently."
        >
          <ProjectsSection />
        </Section>

        <Section
          id="skills"
          title="Skills"
          subtitle="Technologies and tools I use."
        >
          <SkillsSection />
        </Section>

        <Section
          id="contact"
          title="Contact"
          subtitle="Send a quick message using the backend API."
        >
          <ContactSection />
        </Section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p className="muted">
            Built with React + Express. Customize the content in the backend store or extend with a database.
          </p>
          <a className="nav-link" href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
