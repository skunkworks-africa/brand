const featured = `<article class="sk-card sk-card--feature">
  <div class="sk-card-body">
    <p class="sk-card-meta">Cloud productivity</p>
    <h4 class="sk-card-title">Plan your cloud rollout</h4>
    <p class="sk-card-copy">Share your licensing, migration and security needs for Microsoft 365 or Google Workspace.</p>
    <div class="sk-card-actions">
      <a class="sk-button" href="https://skunkworks.africa/cloud-assessment/">Open cloud assessment <span aria-hidden="true">→</span></a>
    </div>
  </div>
  <div class="sk-card-media">
    <img src="/assets/cards/cloud-readiness.webp" alt="" width="960" height="640" decoding="async">
  </div>
</article>`;

const destination = `<a class="sk-card sk-card--destination" href="/forms/" aria-labelledby="card-destination-title">
  <div class="sk-card-body">
    <p class="sk-card-meta">Design system guide</p>
    <h4 class="sk-card-title" id="card-destination-title">Form controls</h4>
    <p class="sk-card-copy">Build forms with clear labels, helpful errors and a way to recover.</p>
  </div>
  <span class="sk-card-arrow" aria-hidden="true">→</span>
</a>`;

const offer = `<article class="sk-card sk-card--offer">
  <div class="sk-card-body">
    <p class="sk-card-meta">Illustrative offer · 5 learners</p>
    <h4 class="sk-card-title">Team learning plan</h4>
    <p class="sk-card-price"><strong>R2&nbsp;400</strong> <span>per month</span></p>
    <ul class="sk-card-list">
      <li>Five named learner seats</li>
      <li>One learning path per learner</li>
      <li>Monthly progress summary</li>
    </ul>
    <div class="sk-card-actions">
      <a class="sk-button secondary" href="/lead-capture/">View the enquiry pattern</a>
    </div>
  </div>
</article>`;

const assessmentStates = [
  {value: 'in-progress', label: 'In progress', tone: 'info', completed: 3, next: 'Check workload dependencies to continue.'},
  {value: 'needs-attention', label: 'Needs attention', tone: 'warning', completed: 3, next: 'Ask the team for the workload inventory to resume the review.'},
  {value: 'complete', label: 'Complete', tone: 'success', completed: 5, next: 'Review the findings and agree on the migration priorities.'}
];

const checksTotal = 5;
const startingState = assessmentStates[0];
const status = `<article class="sk-card sk-card--status" id="card-status-example">
  <div class="sk-card-body">
    <div class="sk-card-header">
      <h4 class="sk-card-title">Cloud readiness review</h4>
      <span class="sk-badge sk-card-status" id="card-state-badge" data-tone="${startingState.tone}">${startingState.label}</span>
    </div>
    <div class="sk-card-progress">
      <progress id="card-state-progress" aria-label="Completed review checks" value="${startingState.completed}" max="${checksTotal}"></progress>
      <p id="card-state-count" class="sk-card-meta">${startingState.completed} of ${checksTotal} checks complete</p>
    </div>
    <p class="sk-card-copy"><strong>Next step</strong><br><span id="card-state-next">${startingState.next}</span></p>
  </div>
</article>`;

const statusControls = `<div class="sk-field card-state-control">
  <label for="card-state">Preview status</label>
  <select class="sk-input" id="card-state" data-card-control disabled>
    ${assessmentStates.map(({value, label, tone, completed, next}) => `<option value="${value}" data-tone="${tone}" data-completed="${completed}" data-next="${next}">${label}</option>`).join('\n    ')}
  </select>
  <span class="sr-only" id="card-state-message" role="status"></span>
</div>`;

const metric = `<article class="sk-card sk-card--metric">
  <div class="sk-card-body">
    <h4 class="sk-card-title">Training completion</h4>
    <p class="sk-card-price"><strong>84%</strong> <span>in the last 30 days</span></p>
    <p class="sk-card-copy">Up 6 percentage points from the previous 30 days.</p>
    <dl class="sk-card-comparison">
      <div><dt>Previous 30 days</dt><dd><span>78%</span><span class="sk-card-bar" style="--sk-card-value:78%" aria-hidden="true"></span></dd></div>
      <div><dt>Last 30 days</dt><dd><span>84%</span><span class="sk-card-bar" style="--sk-card-value:84%" aria-hidden="true"></span></dd></div>
    </dl>
  </div>
</article>`;

const task = `<article class="sk-card">
  <div class="sk-card-body">
    <div class="sk-card-header">
      <h4 class="sk-card-title">Review a new enquiry</h4>
      <span class="sk-badge sk-card-status" data-tone="warning">Awaiting review</span>
    </div>
    <p class="sk-card-copy">Check the request and confirm which team should respond.</p>
    <dl class="sk-card-facts">
      <div><dt>Owner</dt><dd>Service desk</dd></div>
      <div><dt>Due</dt><dd>In 2 working days</dd></div>
    </dl>
    <div class="sk-card-actions">
      <a class="sk-button secondary" href="/lead-capture/">View enquiry workflow</a>
      <button class="sk-button ghost" id="card-save-task" type="button" aria-pressed="false" data-card-control disabled>Save task</button>
    </div>
    <span class="sk-card-meta" id="card-task-message" role="status"></span>
  </div>
</article>`;

const choices = `<fieldset class="sk-card-choices" id="card-contact-choices">
  <legend>Preferred follow-up</legend>
  <div class="sk-card-grid">
    <label class="sk-card sk-card--choice">
      <input type="radio" name="card-contact-method" value="email" aria-labelledby="card-email-label" aria-describedby="card-email-hint" checked>
      <span class="sk-card-body">
        <span class="sk-card-title" id="card-email-label">Email update</span>
        <span class="sk-card-copy" id="card-email-hint">Send the assessment summary to my inbox.</span>
      </span>
    </label>
    <label class="sk-card sk-card--choice">
      <input type="radio" name="card-contact-method" value="call" aria-labelledby="card-call-label" aria-describedby="card-call-hint">
      <span class="sk-card-body">
        <span class="sk-card-title" id="card-call-label">Phone call</span>
        <span class="sk-card-copy" id="card-call-hint">Talk through the findings and next steps.</span>
      </span>
    </label>
  </div>
</fieldset>`;

const examples = [
  {id: 'card-feature', label: 'Featured service', codeLabel: 'featured service card', intent: 'Give one priority service a clear outcome, relevant media and a next step.', markup: featured, wide: true},
  {id: 'card-offer', label: 'Offer and pricing', codeLabel: 'offer card', intent: 'Keep the price, billing period and inclusions together so buyers can assess the offer.', markup: offer},
  {id: 'card-destination', label: 'Navigation', codeLabel: 'navigation card', intent: 'Make the entire card a single link when the whole item leads to one destination.', markup: destination},
  {id: 'card-status', label: 'Status and progress', codeLabel: 'status card', intent: 'Explain the current state, the amount of work done and the next action. Change the preview status to see all three.', markup: status, controls: statusControls},
  {id: 'card-metric', label: 'Metric', codeLabel: 'metric card', intent: 'Show one key number alongside its reporting period and a meaningful comparison.', markup: metric},
  {id: 'card-task', label: 'Task with multiple actions', codeLabel: 'task card', intent: 'Keep the main destination and secondary action independently operable. The save button toggles within this preview.', markup: task},
  {id: 'card-selection', label: 'Selectable cards', codeLabel: 'selectable cards', intent: 'Give each choice room for context. Click either card or use the arrow keys within the group to select it.', markup: choices}
];

function renderExample(example, code) {
  const {id, label, codeLabel, intent, markup, wide, controls = ''} = example;
  return `<section class="card-example${wide ? ' card-example--wide' : ''}" id="${id}">
    <h3>${label}</h3>
    <p>${intent}</p>
    ${controls}
    ${markup}
    <details class="card-source">
      <summary>View HTML for the ${codeLabel}</summary>
      ${code(markup)}
    </details>
  </section>`;
}

export function renderCardsPage(code) {
  return `
  <nav class="card-index" aria-label="On this page">
    <a href="#card-gallery">Card gallery</a>
    <a href="#choose-a-card">Choose a card</a>
    <a href="#build-with-cards">Build with cards</a>
  </nav>
  <section class="doc-section card-gallery" id="card-gallery" data-cards-preview>
    <h2>Card gallery</h2>
    <p>Use cards to help someone choose, decide or act. These examples use a mix of services, sample prices and workflow data.</p>
    <div class="card-examples">
      ${examples.map(example => renderExample(example, code)).join('\n')}
    </div>
    <script src="/cards/preview.js" defer></script>
  </section>
  <section class="doc-section" id="choose-a-card">
    <h2>Choose a card for the job</h2>
    <div class="sk-table-wrap" tabindex="0" role="region" aria-label="Scrollable card selection guide">
      <table class="sk-table">
        <caption>Card patterns by user need</caption>
        <thead><tr><th scope="col">User needs to</th><th scope="col">Pattern</th><th scope="col">Include</th></tr></thead>
        <tbody>
          <tr><th scope="row">Understand a priority service</th><td><a href="#card-feature">Featured service</a></td><td>Outcome, useful media and one next step.</td></tr>
          <tr><th scope="row">Evaluate an offer</th><td><a href="#card-offer">Offer and pricing</a></td><td>Currency, amount, billing interval, scope and material terms.</td></tr>
          <tr><th scope="row">Find a resource</th><td><a href="#card-destination">Navigation</a></td><td>A specific title, short summary and one destination.</td></tr>
          <tr><th scope="row">Know what happens next</th><td><a href="#card-status">Status and progress</a></td><td>A readable state, progress when measurable and a next action.</td></tr>
          <tr><th scope="row">Interpret a key number</th><td><a href="#card-metric">Metric</a></td><td>Value, unit, period and comparable baseline.</td></tr>
          <tr><th scope="row">Take action on a record</th><td><a href="#card-task">Task</a></td><td>Task, owner, due date and separate controls for separate actions.</td></tr>
          <tr><th scope="row">Choose among options</th><td><a href="#card-selection">Selectable cards</a></td><td>A group label, native controls and an identifiable selected state.</td></tr>
        </tbody>
      </table>
    </div>
    <p class="caption">Use a <a href="/tables/">data table</a> when people need to compare the same fields across many items. A list works well for short names and links.</p>
  </section>
  <section class="doc-section" id="build-with-cards">
    <h2>Build with cards</h2>
    <p>Load <a href="/tokens.css">tokens.css</a>, <a href="/components.css">components.css</a>, then <a href="/cards.css" download>download and load cards.css</a>. Expand an example above to copy its markup.</p>
    ${code(`<link rel="stylesheet" href="/tokens.css">
<link rel="stylesheet" href="/components.css">
<link rel="stylesheet" href="/cards.css">`)}
    <div class="card-guidance">
      <div>
        <h3>Structure and layout</h3>
        <p>Put the title and decision details before the action. Use a consistent field order across comparable cards. Let <code>sk-card-grid</code> reflow with the available width and keep important labels and prices visible in narrow layouts.</p>
      </div>
      <div>
        <h3>Links and actions</h3>
        <p>Use one anchor for a navigation card. For a card with several actions, use separate links and buttons with distinct names. Keep focus visible on the exact element someone can activate.</p>
      </div>
      <div>
        <h3>States and feedback</h3>
        <p>Use readable status text and a concrete next step. Keep checked or pressed states in native controls or ARIA. Announce a meaningful asynchronous change once, and give people a retry or recovery path where appropriate.</p>
      </div>
      <div>
        <h3>Images and publishing</h3>
        <p>Use media when it helps identify or understand the item. Keep dimensions and crops consistent. Give informative images concise alternative text and use empty alt text for decorative images. Distinguish sample prices and metrics from your live offers and data.</p>
      </div>
    </div>
    <p class="caption">Use unique IDs for each copy of a card. The status and save demos use <a href="/cards/preview.js" download>preview JavaScript</a> that you can adapt to your application's data and actions.</p>
  </section>`;
}
