import {test,expect} from '@playwright/test';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
async function requiredOnly(page){await page.getByRole('button',{name:'Required only',exact:true}).first().click();}
test('search finds components, handles no results and opens direct links',async({page})=>{
 await page.goto('/');await requiredOnly(page);await page.getByRole('button',{name:'Search the design system'}).click();await page.getByRole('searchbox',{name:'Search documentation'}).fill('buttons');await expect(page.locator('.search-result').first()).toContainText('Buttons');await page.getByRole('searchbox',{name:'Search documentation'}).fill('zzzznomatches');await expect(page.locator('#search-count')).toContainText('No matching');await page.getByRole('searchbox',{name:'Search documentation'}).fill('design tokens');await page.locator('.search-result').first().click();await expect(page).toHaveURL(/tokens/);
});
test('navigation filter and legacy bookmarks work',async({page})=>{
 await page.goto('/');await requiredOnly(page);await page.locator('#desktop-find').fill('accordion');await expect(page.locator('.sidebar .nav-group a:visible')).toHaveCount(1);await page.locator('.sidebar').getByRole('link',{name:'Accordion',exact:true}).click();await expect(page.getByRole('heading',{level:1})).toContainText('Reveal');await page.goto('/#logos');await expect(page).toHaveURL(/\/logos\//);
});
test('theme persists and swaps the approved logo',async({page})=>{
 await page.emulateMedia({colorScheme:'light'});await page.goto('/');await requiredOnly(page);await page.getByRole('button',{name:'Switch to dark theme'}).click();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');await expect(page.locator('.mark-dark')).toBeVisible();await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');await page.getByRole('button',{name:'Switch to light theme'}).click();await expect(page.locator('.mark-light')).toBeVisible();
});
test('consent is persisted, editable and can be revoked',async({page})=>{
 await page.goto('/');await requiredOnly(page);await expect(page.locator('#consent-banner')).toBeHidden();expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('skw-design-consent')).analytics)).toBe(false);await page.getByRole('button',{name:'Cookie preferences'}).click();await page.locator('#analytics-choice').check();await page.getByRole('button',{name:'Save preferences'}).click();await page.reload();expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('skw-design-consent')).analytics)).toBe(true);await page.getByRole('button',{name:'Cookie preferences'}).click();await page.locator('#preferences-required').click();expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('skw-design-consent')).analytics)).toBe(false);
});
test('tabs use arrow, Home and End keys',async({page})=>{
 await page.goto('/tabs/');await requiredOnly(page);await page.getByRole('tab',{name:'Usage',exact:true}).focus();await page.keyboard.press('ArrowRight');await expect(page.getByRole('tab',{name:'Implementation'})).toHaveAttribute('aria-selected','true');await expect(page.locator('#code-panel')).toBeVisible();await page.keyboard.press('End');await expect(page.getByRole('tab',{name:'Accessibility',exact:true})).toBeFocused();await page.keyboard.press('Home');await expect(page.getByRole('tab',{name:'Usage',exact:true})).toBeFocused();
});
test('dialog closes with Escape and returns focus',async({page})=>{
 await page.goto('/dialogs/');await requiredOnly(page);const trigger=page.getByRole('button',{name:'Open example dialog'});await trigger.click();await expect(page.locator('#example-dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('#example-dialog')).toBeHidden();await expect(trigger).toBeFocused();
});
test('form validation and table empty state are useful',async({page})=>{
 await page.goto('/forms/');await requiredOnly(page);await page.getByRole('button',{name:'Validate example'}).click();await expect(page.locator('#example-name')).toHaveAttribute('aria-invalid','true');await page.locator('#example-name').fill('Example Learner');await page.getByRole('button',{name:'Validate example'}).click();await expect(page.locator('#form-result')).toContainText('No data was sent');await page.goto('/tables/');await page.locator('#table-filter').fill('nothingmatches');await expect(page.locator('#table-status')).toContainText('No resources match');await page.locator('#table-filter').fill('');await page.locator('#table-sort').click();await expect(page.locator('th[aria-sort]')).toHaveAttribute('aria-sort','ascending');
});
test('account menu uses real external destinations',async({page})=>{
 await page.goto('/');await requiredOnly(page);await page.getByLabel('Account and employee login').click();await expect(page.getByRole('link',{name:'Employee / Microsoft 365'})).toHaveAttribute('href','https://myapps.microsoft.com/');await page.keyboard.press('Escape');await expect(page.locator('.account')).not.toHaveAttribute('open','');
});
for(const width of [320,390,768,1280,1920])test(`responsive layout and mobile navigation at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/');await requiredOnly(page);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if(width<1000){await page.getByRole('button',{name:'Open navigation'}).click();await expect(page.locator('#mobile-navigation')).toBeVisible();await page.locator('#mobile-navigation').getByRole('link',{name:'Buttons',exact:true}).click();await expect(page).toHaveURL(/buttons/);}else{await expect(page.locator('.sidebar')).toBeVisible();}await page.screenshot({path:`test-results/home-${width}.png`,fullPage:true});
});
for(const theme of ['light','dark'])test(`automated accessibility checks in ${theme} theme`,async({page})=>{
 await page.emulateMedia({colorScheme:theme});for(const route of ['/','/forms/','/tabs/','/tables/','/colour/','/tokens/']){await page.goto(route);if(await page.locator('#consent-banner').isVisible())await requiredOnly(page);await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});const issues=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}));});expect(issues,route).toEqual([]);}
});
