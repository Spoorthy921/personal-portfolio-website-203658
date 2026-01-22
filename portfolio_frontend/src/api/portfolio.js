import { fetchJson } from './client';

// PUBLIC_INTERFACE
export async function getAbout() {
  /** Fetch About content. */
  const res = await fetchJson('/api/about');
  return res.data;
}

// PUBLIC_INTERFACE
export async function updateAbout(payload) {
  /** Update About content. */
  const res = await fetchJson('/api/about', {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  return res.data;
}

// PUBLIC_INTERFACE
export async function listProjects() {
  /** List projects. */
  const res = await fetchJson('/api/projects');
  return res.data;
}

// PUBLIC_INTERFACE
export async function createProject(payload) {
  /** Create project. */
  const res = await fetchJson('/api/projects', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return res.data;
}

// PUBLIC_INTERFACE
export async function updateProject(id, payload) {
  /** Update project. */
  const res = await fetchJson(`/api/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  return res.data;
}

// PUBLIC_INTERFACE
export async function deleteProject(id) {
  /** Delete project. */
  const res = await fetchJson(`/api/projects/${id}`, { method: 'DELETE' });
  return res.data;
}

// PUBLIC_INTERFACE
export async function listSkills() {
  /** List skills. */
  const res = await fetchJson('/api/skills');
  return res.data;
}

// PUBLIC_INTERFACE
export async function createSkill(payload) {
  /** Create skill. */
  const res = await fetchJson('/api/skills', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return res.data;
}

// PUBLIC_INTERFACE
export async function updateSkill(id, payload) {
  /** Update skill. */
  const res = await fetchJson(`/api/skills/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  return res.data;
}

// PUBLIC_INTERFACE
export async function deleteSkill(id) {
  /** Delete skill. */
  const res = await fetchJson(`/api/skills/${id}`, { method: 'DELETE' });
  return res.data;
}

// PUBLIC_INTERFACE
export async function submitContactMessage(payload) {
  /** Submit contact form. */
  const res = await fetchJson('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return res;
}
