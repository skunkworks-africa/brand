/* Local demonstrations for the Cards page. */
(() => {
  const gallery = document.querySelector('[data-cards-preview]');
  if (!gallery) return;

  const state = gallery.querySelector('#card-state');
  const badge = gallery.querySelector('#card-state-badge');
  const progress = gallery.querySelector('#card-state-progress');
  const count = gallery.querySelector('#card-state-count');
  const next = gallery.querySelector('#card-state-next');
  const stateMessage = gallery.querySelector('#card-state-message');

  state.addEventListener('change', () => {
    const option = state.selectedOptions[0];
    const {tone, completed, next: nextStep} = option.dataset;
    badge.textContent = option.textContent;
    badge.dataset.tone = tone;
    progress.value = Number(completed);
    count.textContent = `${completed} of ${progress.max} checks complete`;
    next.textContent = nextStep;
    stateMessage.textContent = `${option.textContent}. ${count.textContent}. ${nextStep}`;
  });

  const save = gallery.querySelector('#card-save-task');
  const saveMessage = gallery.querySelector('#card-task-message');
  save.addEventListener('click', () => {
    const saved = save.getAttribute('aria-pressed') !== 'true';
    save.setAttribute('aria-pressed', String(saved));
    saveMessage.textContent = saved ? 'Saved for this preview.' : 'Removed from saved tasks.';
  });

  gallery.querySelectorAll('[data-card-control]').forEach(control => {
    control.disabled = false;
  });
})();
