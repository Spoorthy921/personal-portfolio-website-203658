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
              <p className="eyebrow">Modern Portfolio</p>
              <h1 className="hero-title">Building innovative digital experiences.</h1>
              <p className="hero-subtitle">
                A passionate developer creating modern web applications with clean design and powerful functionality. 
                Explore my projects, skills, and get in touch to collaborate.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#projects">View Projects</a>
                <a className="btn btn-ghost" href="#about">About Me</a>
                <a className="btn btn-ghost" href="#contact">Get in Touch</a>
              </div>
              <p className="hint">
                Powered by React + Express • API: <code>{getApiBaseUrl()}</code>
              </p>
            </div>

            <div className="hero-card" aria-label="Tech stack overview">
              <div className="stat">
                <div className="stat-value">React 18</div>
                <div className="stat-label">Frontend</div>
              </div>
              <div className="stat">
                <div className="stat-value">Express</div>
                <div className="stat-label">Backend</div>
              </div>
              <div className="stat">
                <div className="stat-value">REST API</div>
                <div className="stat-label">Integration</div>
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
            © 2024 Portfolio. Built with React & Express • Open to opportunities and collaborations.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a className="nav-link" href="#contact">Contact</a>
            <a className="nav-link" href="#top">↑ Top</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
