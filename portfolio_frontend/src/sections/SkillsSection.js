'use strict';

import React, { useEffect, useState } from 'react';
import { listSkills } from '../api/portfolio';
import { Card } from '../components/Card';
import { StatusBanner } from '../components/StatusBanner';

/**
 * PUBLIC_INTERFACE
 * Skills section: loads skills from backend.
 */
export function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await listSkills();
        if (mounted) {
          setSkills(data || []);
          setStatus({ loading: false, error: '' });
        }
      } catch (e) {
        if (mounted) setStatus({ loading: false, error: e.message || 'Failed to load skills.' });
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (status.loading) return <StatusBanner type="info">Loading skills…</StatusBanner>;
  if (status.error) return <StatusBanner type="error">{status.error}</StatusBanner>;

  return (
    <div className="grid grid-3">
      {skills.map((s) => (
        <Card key={s.id}>
          <h3 className="card-title">{s.name}</h3>
          <p className="muted">Level: {s.level}</p>
        </Card>
      ))}
    </div>
  );
}
