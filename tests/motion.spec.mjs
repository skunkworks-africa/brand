import {expect, test} from '@playwright/test';

test('motion comparison honours the selected timing and both sources of reduced motion', async ({page}) => {
  await page.setViewportSize({width: 320, height: 900});
  await page.emulateMedia({reducedMotion: 'no-preference'});
  await page.goto('/motion/');
  await page.getByRole('button', {name: 'Required only', exact: true}).first().click();

  const selectedTrack = page.locator('#motion-selected-track');
  const selectedMarker = selectedTrack.locator('.motion-marker');
  const standardMarker = page.locator('.motion-lane').filter({hasText: 'Standard settings'}).locator('.motion-marker');
  const reduce = page.getByRole('checkbox', {name: 'Reduce motion in the examples'});
  const play = page.getByRole('button', {name: 'Play comparison'});
  await page.getByLabel('Duration').selectOption('expressive');
  await page.getByLabel('Easing').selectOption('linear');
  await expect(selectedMarker).toHaveCSS('transition-duration', '0.24s');
  await expect(selectedMarker).toHaveCSS('transition-timing-function', 'linear');
  await expect(standardMarker).toHaveCSS('transition-duration', '0.16s');
  await play.press('Enter');
  await expect(selectedTrack).toHaveAttribute('data-motion-end', '');

  await reduce.check();
  await expect(selectedMarker).toHaveCSS('transition-duration', '0s');
  await expect(standardMarker).toHaveCSS('transition-duration', '0s');
  await play.press('Enter');
  await expect(selectedTrack).not.toHaveAttribute('data-motion-end');
  await reduce.uncheck();
  await expect(selectedMarker).toHaveCSS('transition-duration', '0.24s');

  await page.emulateMedia({reducedMotion: 'reduce'});
  await expect(reduce).toBeChecked();
  await expect(reduce).toBeDisabled();
  await expect(selectedMarker).toHaveCSS('transition-duration', '0s');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

test('disclosure, dialog, pin and retry remain usable with reduced motion', async ({page}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.goto('/motion/');
  await page.getByRole('button', {name: 'Required only', exact: true}).first().click();

  const pin = page.getByRole('button', {name: 'Pin resource'});
  await pin.press('Enter');
  await expect(pin).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#motion-pin-status')).toHaveText('Resource is pinned.');

  await page.getByText('Assessment details', {exact: true}).first().press('Enter');
  await expect(page.getByText('Review costs, resilience and access controls for your cloud environment.')).toBeVisible();

  const trigger = page.getByRole('button', {name: 'Open preview dialog'});
  await trigger.press('Enter');
  await expect(page.getByRole('dialog', {name: 'Assessment scope'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Close preview'})).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();

  const failure = page.getByRole('button', {name: 'Simulate failure'});
  const status = page.locator('#motion-operation-text');
  await failure.press('Enter');
  await expect(status).toHaveText('Checking availability…');
  await expect(page.locator('#motion-spinner')).toBeHidden();
  await expect(failure).toBeFocused();
  await expect(status).toHaveText('The check could not finish. Try again.');
  await page.getByRole('button', {name: 'Retry check'}).press('Enter');
  await expect(status).toHaveText('Availability check complete.');
});
