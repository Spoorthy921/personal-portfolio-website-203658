import React, { useEffect, useState } from 'react';
import { listProjects } from '../api/portfolio';
import { Card } from '../components/Card';
import { StatusBanner } from '../components/StatusBanner';

/**
 * PUBLIC_INTERFACE
 * Projects section: loads projects from backend.
 */
export function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await listProjects();
        if (mounted) {
          setProjects(data || []);
          setStatus({ loading: false, error: '' });
        }
      } catch (e) {
        if (mounted) setStatus({ loading: false, error: e.message || 'Failed to load projects.' });
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (status.loading) return <StatusBanner type="info">Loading projects…</StatusBanner>;
  if (status.error) return <StatusBanner type="error">{status.error}</StatusBanner>;

  return (
    <div className="grid grid-3">
      {projects.length === 0 ? (
        <StatusBanner type="info">No projects yet.</StatusBanner>
      ) : null}

      {projects.map((p) => (
        <Card key={p.id}>
          <h3 className="card-title">{p.name}</h3>
          <p className="body">{p.description}</p>
          {Array.isArray(p.tags) && p.tags.length ? (
            <div className="tag-row" aria-label="Project tags">
              {p.tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          ) : null}

          {(p.links?.repo || p.links?.live) ? (
            <div className="card-actions">
              {p.links?.repo ? (
                <a className="btn btn-ghost btn-small" href={p.links.repo} target="_blank" rel="noreferrer">
                  Repo
                </a>
              ) : null}
              {p.links?.live ? (
                <a className="btn btn-primary btn-small" href={p.links.live} target="_blank" rel="noreferrer">
                  Live
                </a>
              ) : null}
            </div>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
