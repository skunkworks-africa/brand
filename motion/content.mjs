const motionTokenRoles = [
  ['duration-instant', 'Apply an immediate change, for example when showing an error or reducing motion.'],
  ['duration-quick', 'Use for button presses and other small changes that follow an action.'],
  ['duration-standard', 'Use for a disclosure or short piece of feedback.'],
  ['duration-expressive', 'Use for the entrance of a dialog or similarly substantial surface.'],
  ['duration-indicator', 'Set the length of one activity indicator rotation.'],
  ['ease-standard', 'Move smoothly between two visible states.'],
  ['ease-enter', 'Bring a new surface into view and let it settle quickly.'],
  ['ease-exit', 'Let a departing surface move away quickly when an exit effect helps.'],
  ['ease-linear', 'Keep a steady pace for an activity indicator.'],
  ['distance-overlay', 'Limit the vertical travel of a dialog on entry.']
];

export function renderMotionTokens(tokens) {
  const rows = motionTokenRoles.map(([key, use]) => {
    const name = `motion-${key}`;
    if (!tokens[name]) throw new Error(`Missing motion token --sk-${name}`);
    return `<tr><th scope="row"><code>--sk-${name}</code></th><td><code>${tokens[name]}</code></td><td>${use}</td></tr>`;
  }).join('');
  return `<div class="sk-table-wrap" tabindex="0" role="region" aria-label="Scrollable motion tokens">
    <table class="sk-table">
      <caption>Motion values generated from tokens.css</caption>
      <thead><tr><th scope="col">Token</th><th scope="col">Value</th><th scope="col">When to use it</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

const disclosureExample = `<details class="sk-accordion motion-example-disclosure">
  <summary>Assessment details</summary>
  <div class="sk-motion-enter"><p>Review costs, resilience and access controls for your cloud environment.</p></div>
</details>`;

export function renderMotionPage(code) {
  return `
  <nav class="motion-index" aria-label="On this page">
    <a href="#motion-playground">Interactive examples</a>
    <a href="#motion-tokens">Motion tokens</a>
    <a href="#motion-patterns">Component guidance</a>
    <a href="#reduced-motion">Reduced motion</a>
  </nav>
  <section class="doc-section motion-section" id="motion-playground">
    <h2>Try the motion patterns</h2>
    <p>Use motion to show what changed and where it happened. Try the same actions with and without motion to check that the result is clear in both cases.</p>
    <div class="motion-playground" data-motion-preview>
      <div class="motion-preferences">
        <label class="sk-check"><input type="checkbox" id="motion-reduce" aria-describedby="motion-preference-hint" disabled> Reduce motion in the examples</label>
        <p class="sk-hint" id="motion-preference-hint">This control applies to the examples on this page. Your system preference takes priority.</p>
      </div>
      <div class="motion-comparison">
        <h3>Compare duration and easing</h3>
        <p>Choose how long the sample moves and how its speed changes. Play the comparison to see it alongside the standard settings.</p>
        <div class="motion-selectors">
          <div class="sk-field">
            <label for="motion-duration">Duration</label>
            <select class="sk-input" id="motion-duration" data-motion-control disabled>
              <option value="instant">Instant</option>
              <option value="quick">Quick</option>
              <option value="standard" selected>Standard</option>
              <option value="expressive">Expressive</option>
            </select>
          </div>
          <div class="sk-field">
            <label for="motion-easing">Easing</label>
            <select class="sk-input" id="motion-easing" data-motion-control disabled>
              <option value="standard" selected>Standard</option>
              <option value="enter">Enter</option>
              <option value="exit">Exit</option>
              <option value="linear">Linear</option>
            </select>
          </div>
        </div>
        <div class="motion-tracks">
          <div class="motion-lane">
            <span>Selected settings</span>
            <div class="motion-track" id="motion-selected-track" aria-hidden="true"><span class="motion-marker"></span></div>
          </div>
          <div class="motion-lane">
            <span>Standard settings</span>
            <div class="motion-track" aria-hidden="true"><span class="motion-marker"></span></div>
          </div>
        </div>
        <button class="sk-button secondary" id="motion-play" type="button" data-motion-control disabled>Play comparison</button>
      </div>
      <div class="motion-demos">
        <article class="motion-demo">
          <h3>Button feedback</h3>
          <p>A short press effect confirms the interaction. The button state and message confirm the result.</p>
          <button class="sk-button secondary sk-motion-press" id="motion-pin" type="button" aria-pressed="false" data-motion-control disabled>Pin resource</button>
          <p class="motion-pin-status" id="motion-pin-status" role="status">Resource is unpinned.</p>
        </article>
        <article class="motion-demo">
          <h3>Disclosure</h3>
          <p>Fade in content as it opens. Keep the native summary and its keyboard behaviour.</p>
          ${disclosureExample}
        </article>
        <article class="motion-demo">
          <h3>Dialog entrance</h3>
          <p>Use a small movement to distinguish the dialog from the page behind it. Press Escape to close and return to the trigger.</p>
          <button class="sk-button secondary" type="button" data-open-dialog="motion-dialog" data-motion-control disabled>Open preview dialog</button>
          <dialog class="sk-dialog sk-motion-dialog" id="motion-dialog" aria-labelledby="motion-dialog-title">
            <h4 id="motion-dialog-title">Assessment scope</h4>
            <p>Use a dialog for a focused decision or a short task.</p>
            <button class="sk-button" type="button" data-close-dialog>Close preview</button>
          </dialog>
        </article>
        <article class="motion-demo">
          <h3>Loading and retry</h3>
          <p>Simulate an availability check. Follow the status as it changes and retry after a failure.</p>
          <div class="motion-demo-actions">
            <button class="sk-button secondary" id="motion-check" type="button" data-motion-control disabled>Run check</button>
            <button class="sk-button secondary" id="motion-fail" type="button" data-motion-control disabled>Simulate failure</button>
          </div>
          <div class="sk-notice motion-operation-status">
            <span class="sk-motion-spinner" id="motion-spinner" aria-hidden="true" hidden></span>
            <span id="motion-operation-text" role="status">Ready to check availability.</span>
          </div>
        </article>
      </div>
    </div>
    <script src="/motion/preview.js" defer></script>
  </section>
  <section class="doc-section motion-section" id="motion-tokens">
    <h2>Motion tokens</h2>
    <p>Choose a duration based on the size of the change. Use easing to control how the motion starts and stops. The standard values are a good starting point for most controls.</p>
    <div id="motion-token-reference"></div>
    <p class="caption">These values are shared by the light and dark themes. See the <a href="/tokens/">full design token reference</a>.</p>
  </section>
  <section class="doc-section motion-section" id="motion-patterns">
    <h2>Choose motion for the component</h2>
    <dl class="motion-guidance">
      <div><dt>Buttons and switches</dt><dd>Show focus immediately. Use quick press feedback on the control and show whether it is selected, busy or complete with text or a persistent state.</dd></div>
      <div><dt>Accordions, menus and tabs</dt><dd>Keep the trigger stable and reveal related content nearby. Use a short fade and preserve keyboard behaviour, reading order and focus.</dd></div>
      <div><dt>Dialogs and drawers</dt><dd>Use a short entrance from the edge where the surface appears. Set focus as soon as the surface opens and return it to the trigger when it closes.</dd></div>
      <div><dt>Form errors and notifications</dt><dd>Show the message immediately. Keep it readable until users can act. Pair visual emphasis with actionable text, especially in <a href="/forms/">form validation</a> and <a href="/lead-capture/">lead capture</a>.</dd></div>
      <div><dt>Loading, progress and skeletons</dt><dd>Show a status message for work with unknown duration. Use a labelled progress bar when you can measure progress. Reserve the space the result will occupy and keep decorative placeholders still.</dd></div>
      <div><dt>Page changes and scrolling</dt><dd>Prioritise orientation with headings, focus and navigation. Use a static layout when motion adds no information. Avoid parallax, sudden zooms and effects that take over scrolling.</dd></div>
    </dl>
  </section>
  <section class="doc-section motion-section" id="reduced-motion">
    <h2>Respect reduced motion</h2>
    <p>Apply nonessential effects inside <code>@media (prefers-reduced-motion: no-preference)</code>. Use the final state, focus and status text immediately when motion is reduced. The preview control on this page lets you check those states without changing your device settings.</p>
    <ul>
      <li>Keep open, closed, pending, error and complete states clear when animations are off. Keep an accessible name or message for every status.</li>
      <li>Provide a way to pause, stop or hide nonessential motion that starts automatically, lasts more than five seconds and appears alongside other content. Avoid flashing and check auto-updating content separately.</li>
      <li>Keep navigation, dismissal and retry responsive during an effect. Avoid using an animation event to unlock the next step.</li>
    </ul>
    <p>See W3C guidance on <a href="https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html">animation from interactions</a> and <a href="https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html">pause, stop and hide</a>.</p>
  </section>
  <section class="doc-section motion-section" id="motion-implementation">
    <h2>Use motion in your project</h2>
    <p>Load <a href="/tokens.css">tokens.css</a>, <a href="/components.css">components.css</a> and the <a href="/motion.css" download>reusable motion styles</a>. Add <code>sk-motion-press</code> to a button, <code>sk-motion-enter</code> to content that appears, or <code>sk-motion-dialog</code> to a native dialog. A <code>sk-motion-spinner</code> can accompany visible status text while work is pending.</p>
    ${code(`<link rel="stylesheet" href="/tokens.css">
<link rel="stylesheet" href="/components.css">
<link rel="stylesheet" href="/motion.css">

<details class="sk-accordion">
  <summary>Assessment details</summary>
  <div class="sk-motion-enter"><p>Review the assessment scope.</p></div>
</details>`)}
    <p class="caption">Set <code>data-sk-motion="reduced"</code> on a containing element if your product provides a separate motion preference. The system preference still applies.</p>
    <h3>Review before release</h3>
    <ul>
      <li>Check keyboard and touch interactions, reversed actions, repeated use and focus after dismissal.</li>
      <li>Check both themes and reduced motion, including loading, error, retry and success.</li>
      <li>Animate specific properties like opacity and transform. Profile on a lower-powered device and remove effects that make the task feel slower.</li>
    </ul>
  </section>`;
}
