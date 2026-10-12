// Kleine Helfer für die Rechner-Seiten (laufen im Browser des Besuchers).
export const $ = (id) => document.getElementById(id);
export const num = (id) => {
  const el = $(id);
  if (!el) return 0;
  const v = parseFloat(String(el.value).replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(v) && v > 0 ? v : 0;
};
export const val = (id) => ($(id) ? $(id).value : '');
export const checked = (id) => Boolean($(id) && $(id).checked);
export const fmt = (n, d = 0) => Number(n).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: d });
export const eur = (n) => Number(n).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
export function bind(root, fn) {
  const run = () => { try { fn(); } catch (e) { console.error(e); } };
  root.addEventListener('input', run);
  root.addEventListener('change', run);
  run();
}
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const radio = (name) => {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : '';
};
