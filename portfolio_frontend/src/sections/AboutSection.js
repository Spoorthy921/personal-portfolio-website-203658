'use strict';

import React, { useEffect, useState } from 'react';
import { getAbout } from '../api/portfolio';
import { Card } from '../components/Card';
import { StatusBanner } from '../components/StatusBanner';

/**
 * PUBLIC_INTERFACE
 * About section: loads About content from backend.
 */
export function AboutSection() {
  const [about, setAbout] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getAbout();
        if (mounted) {
          setAbout(data);
          setStatus({ loading: false, error: '' });
        }
      } catch (e) {
        if (mounted) setStatus({ loading: false, error: e.message || 'Failed to load About.' });
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (status.loading) return <StatusBanner type="info">Loading about…</StatusBanner>;
  if (status.error) return <StatusBanner type="error">{status.error}</StatusBanner>;
  if (!about) return null;

  return (
    <div className="grid grid-2">
      <Card>
        <h3 className="card-title">{about.name}</h3>
        <p className="muted">{about.title}{about.location ? ` • ${about.location}` : ''}</p>
        <p className="body">{about.summary}</p>
      </Card>

      <Card>
        <h3 className="card-title">Links</h3>
        <ul className="link-list">
          {about.email ? (
            <li>
              <a href={`mailto:${about.email}`}>Email</a>
            </li>
          ) : null}
          {about.socials?.github ? (
            <li>
              <a href={about.socials.github} target="_blank" rel="noreferrer">GitHub</a>
            </li>
          ) : null}
          {about.socials?.linkedin ? (
            <li>
              <a href={about.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </li>
          ) : null}
          {about.socials?.website ? (
            <li>
              <a href={about.socials.website} target="_blank" rel="noreferrer">Website</a>
            </li>
          ) : null}
        </ul>
        <p className="hint">
          Tip: Update these values in the backend in-memory store (or extend with a DB later).
        </p>
      </Card>
    </div>
  );
}
