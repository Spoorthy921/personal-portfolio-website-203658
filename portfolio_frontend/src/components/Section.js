import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Standard section wrapper with title/description.
 */
export function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className="section-header">
          <h2 id={`${id}-title`} className="section-title">{title}</h2>
          {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
