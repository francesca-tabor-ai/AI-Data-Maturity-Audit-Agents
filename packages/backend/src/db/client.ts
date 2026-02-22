// Re-export store as getDb-compatible interface for migration compatibility
// Most code now uses store directly
export { store, uuid } from './store.js';

// Legacy getDb for schema migration - no-op since we use JSON store
export function getDb(): { exec: (sql: string) => void } {
  return {
    exec: () => {},
  };
}
