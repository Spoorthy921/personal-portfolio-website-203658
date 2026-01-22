import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Inline feedback banner for loading/error/success.
 */
export function StatusBanner({ type, children }) {
  const cls = type === 'error' ? 'banner banner-error' : type === 'success' ? 'banner banner-success' : 'banner';
  return (
    <div className={cls} role={type === 'error' ? 'alert' : 'status'}>
      {children}
    </div>
  );
}
