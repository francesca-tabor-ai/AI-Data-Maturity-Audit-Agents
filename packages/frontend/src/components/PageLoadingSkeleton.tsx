'use client';

export function PageLoadingSkeleton() {
  return (
    <div
      className="page-loading-skeleton"
      role="status"
      aria-label="Loading"
    >
      <div className="skeleton-header">
        <div className="skeleton-line skeleton-line-short" />
        <div className="skeleton-line skeleton-line-medium" />
      </div>
      <div className="skeleton-content">
        <div className="skeleton-line" style={{ width: '40%' }} />
        <div className="skeleton-block" />
        <div className="skeleton-block" />
      </div>
    </div>
  );
}
