import {expect, test} from '@playwright/test';

test('card previews show status, accept keyboard selection and keep actions separate at 320px', async ({page}) => {
  await page.setViewportSize({width: 320, height: 900});
  await page.goto('/cards/');
  await page.getByRole('button', {name: 'Required only', exact: true}).first().click();

  const photo = page.locator('.sk-card-media img');
  await expect.poll(() => photo.evaluate(img => img.naturalWidth)).toBe(960);

  const status = page.locator('#card-status');
  await status.getByLabel('Preview status').selectOption('needs-attention');
  await expect(status.locator('#card-state-badge')).toHaveText('Needs attention');
  await expect(status.getByRole('progressbar')).toHaveAttribute('value', '3');
  await expect(status.getByText('Ask the team for the workload inventory to resume the review.', {exact: true})).toBeVisible();
  await expect(status.getByRole('status')).toContainText('Needs attention. 3 of 5 checks complete.');
  await status.getByLabel('Preview status').selectOption('complete');
  await expect(status.getByRole('progressbar')).toHaveAttribute('value', '5');
  await expect(status.getByText('5 of 5 checks complete', {exact: true})).toBeVisible();

  const task = page.locator('#card-task');
  const save = task.getByRole('button', {name: 'Save task'});
  await save.press('Enter');
  await expect(save).toBeFocused();
  await expect(save).toHaveAttribute('aria-pressed', 'true');
  await expect(task.getByRole('status')).toHaveText('Saved for this preview.');
  await expect(task.getByRole('link', {name: 'View enquiry workflow'})).toHaveAttribute('href', '/lead-capture/');
  await save.press('Space');
  await expect(save).toHaveAttribute('aria-pressed', 'false');

  await page.getByRole('radio', {name: 'Email update'}).press('ArrowDown');
  await expect(page.getByRole('radio', {name: 'Phone call'})).toBeFocused();
  await expect(page.getByRole('radio', {name: 'Phone call'})).toBeChecked();
  await page.getByText('View HTML for the selectable cards', {exact: true}).press('Enter');
  await expect(page.locator('#card-selection pre')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);

  await page.locator('#card-destination').getByRole('link', {name: 'Form controls', exact: true}).press('Enter');
  await expect(page).toHaveURL(/\/forms\/$/);
});
