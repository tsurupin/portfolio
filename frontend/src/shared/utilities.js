export function getCSRFToken() {
  const el = document.querySelector('meta[name="csrf-token"]');
  return el ? el.getAttribute('content') : '';
}

export function capitalize(string) {
  return (string.substring(0, 1).toUpperCase() + string.substring(1));
}

