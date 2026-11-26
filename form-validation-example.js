/* Documentation example only: this form never sends data. */
(() => {
  const form = document.querySelector('[data-contact-example]');
  if (!form) return;

  const summary = form.querySelector('#contact-errors');
  form.querySelector('[type="submit"]').disabled = false;
  const list = summary.querySelector('ul');
  const result = form.querySelector('#contact-result');
  const fields = [
    { input: form.elements.contactName, error: form.querySelector('#contact-name-error'), message: 'Enter your name.' },
    { input: form.elements.contactEmail, error: form.querySelector('#contact-email-error'), message: 'Enter an email address in the format name@example.com.' }
  ];
  let submitted = false;

  function refreshErrors() {
    list.replaceChildren();
    for (const field of fields) {
      const invalid = !field.input.value.trim() || !field.input.validity.valid;
      if (invalid) field.input.setAttribute('aria-invalid', 'true');
      else field.input.removeAttribute('aria-invalid');
      field.error.hidden = !invalid;
      if (invalid) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${field.input.id}`;
        link.textContent = field.message;
        item.append(link);
        list.append(item);
      }
    }
    const hasErrors = list.children.length > 0;
    summary.hidden = !hasErrors;
    return hasErrors;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    submitted = true;
    result.textContent = '';
    if (refreshErrors()) summary.focus();
    else result.textContent = 'Details validated. No data was sent.';
  });
  form.addEventListener('input', () => {
    result.textContent = '';
    if (submitted) refreshErrors();
  });
})();
