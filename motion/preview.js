/* Local interactions for the design system's motion previews. */
(() => {
  const preview = document.querySelector('[data-motion-preview]');
  if (!preview) return;

  const reduceToggle = preview.querySelector('#motion-reduce');
  const preferenceHint = preview.querySelector('#motion-preference-hint');
  const systemPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let localReduction = false;

  function showPreference() {
    const systemReduction = systemPreference.matches;
    reduceToggle.checked = systemReduction || localReduction;
    reduceToggle.disabled = systemReduction;
    if (localReduction) preview.dataset.skMotion = 'reduced';
    else delete preview.dataset.skMotion;
    preferenceHint.textContent = systemReduction
      ? 'Your system settings already reduce motion.'
      : 'This control applies to the examples on this page. Your system preference takes priority.';
  }

  reduceToggle.addEventListener('change', () => {
    localReduction = reduceToggle.checked;
    showPreference();
  });
  systemPreference.addEventListener('change', showPreference);
  showPreference();

  const tracks = [...preview.querySelectorAll('.motion-track')];
  const selectedTrack = preview.querySelector('#motion-selected-track');
  const duration = preview.querySelector('#motion-duration');
  const easing = preview.querySelector('#motion-easing');
  let atEnd = false;

  function setTiming() {
    selectedTrack.style.setProperty('--motion-preview-duration', `var(--sk-motion-duration-${duration.value})`);
    selectedTrack.style.setProperty('--motion-preview-easing', `var(--sk-motion-ease-${easing.value})`);
  }

  duration.addEventListener('change', setTiming);
  easing.addEventListener('change', setTiming);
  setTiming();
  preview.querySelector('#motion-play').addEventListener('click', () => {
    atEnd = !atEnd;
    tracks.forEach(track => track.toggleAttribute('data-motion-end', atEnd));
  });

  const pin = preview.querySelector('#motion-pin');
  const pinStatus = preview.querySelector('#motion-pin-status');
  pin.addEventListener('click', () => {
    const pinned = pin.getAttribute('aria-pressed') !== 'true';
    pin.setAttribute('aria-pressed', String(pinned));
    pinStatus.textContent = pinned ? 'Resource is pinned.' : 'Resource is unpinned.';
  });

  const run = preview.querySelector('#motion-check');
  const fail = preview.querySelector('#motion-fail');
  const spinner = preview.querySelector('#motion-spinner');
  const status = preview.querySelector('#motion-operation-text');
  const notice = status.parentElement;
  let checking = false;

  function check(shouldFail) {
    if (checking) return;
    checking = true;
    [run, fail].forEach(button => button.setAttribute('aria-disabled', 'true'));
    delete notice.dataset.result;
    notice.classList.remove('sk-motion-enter');
    status.textContent = 'Checking availability…';
    spinner.hidden = false;

    setTimeout(() => {
      checking = false;
      spinner.hidden = true;
      notice.dataset.result = shouldFail ? 'error' : 'success';
      notice.classList.add('sk-motion-enter');
      status.textContent = shouldFail ? 'The check could not finish. Try again.' : 'Availability check complete.';
      run.textContent = shouldFail ? 'Retry check' : 'Run check';
      [run, fail].forEach(button => button.removeAttribute('aria-disabled'));
    }, 1200);
  }

  run.addEventListener('click', () => check(false));
  fail.addEventListener('click', () => check(true));
  preview.querySelectorAll('[data-motion-control]').forEach(control => {
    control.disabled = false;
  });
})();
