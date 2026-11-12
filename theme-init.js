// Resolve an explicit preference before first paint. No external requests.
try { const theme=localStorage.getItem('skw-brand-theme'); if(theme==='light'||theme==='dark') document.documentElement.dataset.theme=theme; } catch {}
