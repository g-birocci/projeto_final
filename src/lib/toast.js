// Simple event-based toast system
const listeners = new Set();

export function onToast(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function toast({ title, message, type = "info", duration = 3000 } = {}) {
  const id = Math.random().toString(36).slice(2);
  const payload = { id, title, message, type, duration };
  listeners.forEach((cb) => {
    try {
      cb(payload);
    } catch {}
  });
}

export default toast;

