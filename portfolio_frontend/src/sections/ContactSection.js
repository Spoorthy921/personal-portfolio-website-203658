import React, { useMemo, useState } from 'react';
import { submitContactMessage } from '../api/portfolio';
import { Card } from '../components/Card';
import { StatusBanner } from '../components/StatusBanner';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

/**
 * PUBLIC_INTERFACE
 * Contact section: validates and submits message to backend.
 */
export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const validationError = useMemo(() => {
    if (form.name.trim().length > 0 && form.name.trim().length < 2) return 'Name must be at least 2 characters.';
    if (form.email.trim().length > 0 && !isValidEmail(form.email)) return 'Please enter a valid email.';
    if (form.message.trim().length > 0 && form.message.trim().length < 10) return 'Message must be at least 10 characters.';
    return '';
  }, [form]);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, error: '', success: '' });

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (name.length < 2) return setStatus({ loading: false, error: 'Name must be at least 2 characters.', success: '' });
    if (!isValidEmail(email)) return setStatus({ loading: false, error: 'A valid email is required.', success: '' });
    if (message.length < 10) return setStatus({ loading: false, error: 'Message must be at least 10 characters.', success: '' });

    try {
      setStatus({ loading: true, error: '', success: '' });
      const res = await submitContactMessage({ name, email, message });
      setStatus({ loading: false, error: '', success: res.message || 'Message sent!' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, error: err.message || 'Failed to submit message.', success: '' });
    }
  };

  return (
    <div className="grid grid-2">
      <Card>
        <h3 className="card-title">Send a message</h3>

        {status.error ? <StatusBanner type="error">{status.error}</StatusBanner> : null}
        {status.success ? <StatusBanner type="success">{status.success}</StatusBanner> : null}
        {validationError && !status.error && !status.success ? (
          <p className="hint" role="note">{validationError}</p>
        ) : null}

        <form className="form" onSubmit={onSubmit}>
          <label className="field">
            <span className="label">Name</span>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              autoComplete="name"
              required
            />
          </label>

          <label className="field">
            <span className="label">Email</span>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="field">
            <span className="label">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="What would you like to say?"
              rows={5}
              required
            />
          </label>

          <button className="btn btn-primary" type="submit" disabled={status.loading}>
            {status.loading ? 'Sending…' : 'Send'}
          </button>
        </form>
      </Card>

      <Card>
        <h3 className="card-title">What happens next?</h3>
        <p className="body">
          This beginner-friendly demo posts your message to the backend REST API, which stores it in memory.
          You can later extend it to email notifications or a database.
        </p>
        <p className="body muted">
          Backend docs: <code>/docs</code> on the backend server.
        </p>
      </Card>
    </div>
  );
}
