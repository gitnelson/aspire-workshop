import { test, expect } from '@playwright/test';

test('resident demo validates, matches, resets and does not persist', async ({ page }) => {
  await page.goto('/#help');
  await page.getByRole('button', { name: 'Fill with sample information' }).click();
  await page.getByRole('button', { name: 'Preview my request' }).click();
  await expect(page).toHaveURL(/#help$/);
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Preview my request' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Your sample request is ready.');
  await page.getByRole('button', { name: 'Demo: show a representation match' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Meet your sample legal team.');
  await page.getByRole('button', { name: 'Reset resident demo' }).click();
  await expect(page.getByLabel('First name')).toHaveValue('');
  await page.goto('/#status');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Try the resident journey.');
  expect(await page.evaluate(() => localStorage.length + sessionStorage.length)).toBe(0);
});

for (const route of ['firms','schools']) {
  test(`${route} partner form preserves choice and escapes user text`, async ({ page }) => {
    await page.goto(`/#${route}`);
    await page.locator('[name=organization]').fill('<img src=x onerror=alert(1)>');
    await page.getByLabel('Contact name').fill('Alex Example');
    await page.getByLabel('Email', { exact: true }).fill('alex@example.com');
    if (route === 'firms') await page.getByLabel('Participation interest').selectOption('Paid commitments');
    else await page.getByLabel('Partnership interest').selectOption('Faculty mentorship');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Preview partner signup' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('A starting point for your partnership.');
    await expect(page.locator('main img')).toHaveCount(0);
    await expect(page.locator('dd').nth(1)).toHaveText(route === 'firms' ? 'Paid commitments' : 'Faculty mentorship');
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Start with a partner interest form.');
  });
}

test('mobile navigation works with touch and Escape; skip link keeps the current route', async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu', exact:true });
  await menu.click();
  await expect(page.locator('#main-nav')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(page.locator('#main-nav')).toBeHidden();
  await menu.click();
  await page.getByRole('navigation').getByRole('link', {name:'Law schools',exact:true}).click();
  await expect(page).toHaveURL(/#schools$/);
  await expect(page.locator('#main-nav')).toBeHidden();
  await page.locator('.skip').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#schools$/);
  await expect(page.locator('main')).toBeFocused();
});

test('pages render assets and fonts without errors or horizontal overflow at all target sizes', async ({ page }) => {
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  for (const width of [320,390,768,1024,1469]) {
    await page.setViewportSize({width,height:900});
    for (const route of ['home','partners','firms','schools','help','mission']) {
      await page.goto(`/#${route}`);
      await page.evaluate(()=>document.fonts.ready);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth), `${route} at ${width}px`).toBe(true);
      expect(await page.locator('img').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0))).toBe(true);
      expect(await page.evaluate(()=>document.fonts.check('400 16px Inter'))).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});
