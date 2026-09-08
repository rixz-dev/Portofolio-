import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
process.loadEnvFile('.env');
const { default: portfolio } = await import('../api/portfolio.js');
const { default: inquiries } = await import('../api/inquiries.js');
const { default: supabase } = await import('../api/db-client.js');
const errors = [];
const email = `portfolio-test-${Date.now()}@example.com`;
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  res.status = code => { res.statusCode = code; return res; };
  res.json = body => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)); };
  if (url.pathname.startsWith('/api/')) {
    req.query = Object.fromEntries(url.searchParams);
    let body = ''; for await (const chunk of req) body += chunk;
    req.body = body ? JSON.parse(body) : {};
    if (url.pathname === '/api/portfolio') return portfolio(req, res);
    if (url.pathname === '/api/inquiries') return inquiries(req, res);
    return res.status(404).json({ error: 'Not found' });
  }
  try {
    let file = path.join(process.cwd(), 'dist', url.pathname === '/' ? 'index.html' : url.pathname);
    try { await stat(file); } catch { file = path.join(process.cwd(), 'dist/index.html'); }
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    res.end(await readFile(file));
  } catch { res.statusCode = 500; res.end('File error'); }
});
await new Promise(resolve => server.listen(4179, '127.0.0.1', resolve));
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  await mkdir('artifacts', { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:4179/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.hero', { timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'artifacts/desktop.png', fullPage: false });
  assert.equal(await page.locator('.project-card').count(), 6);
  assert.equal(await page.locator('a[href*="wa.me"]').count(), 0);
  assert.equal(await page.locator('a[href="mailto:rixzorangbiasa@gmail.com"]').count(), 1);
  assert.equal(await page.locator('a[href="https://t.me/Frzy_Reiz"]').count(), 1);
  assert.equal(await page.locator('.android-service strong').innerText(), 'Sesuai permintaan');
  await page.getByRole('button', { name: 'Web', exact: true }).click();
  assert.equal(await page.locator('.project-card').count(), 1);
  assert.equal(await page.locator('.timeline-label').innerText(), 'Catatan 02');
  await page.getByRole('button', { name: 'Android', exact: true }).click();
  assert.equal(await page.locator('.project-card').count(), 1);
  assert.equal(await page.locator('.timeline-label').innerText(), 'Paling baru');
  await page.getByRole('button', { name: 'Lihat detail Lyreon' }).click();
  await page.waitForSelector('dialog[open]');
  assert.equal(await page.locator('dialog h2').innerText(), 'Lyreon.');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog[open]').count(), 0);
  await page.getByRole('button', { name: /^Semua/ }).click();
  await page.getByRole('button', { name: 'Lihat semua 7 proyek' }).click();
  assert.equal(await page.locator('.project-card').count(), 7);
  await page.getByRole('button', { name: /Urutan terbaru/ }).click();
  assert.equal(await page.locator('.project-title h3').first().innerText(), 'OFFLAB');
  assert.equal(await page.locator('.timeline-label').first().innerText(), 'Paling lama');
  assert.equal(await page.locator('.timeline-label').last().innerText(), 'Paling baru');
  await page.getByRole('button', { name: /Urutan terlama/ }).click();
  await page.getByRole('button', { name: 'Diskusikan Aplikasi Android' }).click();
  assert.equal(await page.locator('.contact-form select').inputValue(), 'android');
  await page.locator('input[name="name"]').fill('Portfolio QA Test');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('textarea[name="message"]').fill('Pengujian formulir otomatis untuk layanan aplikasi Android. Data ini akan dihapus setelah pengujian.');
  await page.getByRole('button', { name: 'Kirim brief', exact: true }).click();
  await page.waitForSelector('.brief-success', { timeout: 30000 });
  const saved = await supabase.from('farizy_inquiries').select('name, service_id').eq('email', email).single();
  assert.equal(saved.data?.service_id, 'android');
  const invalid = await page.request.post('http://127.0.0.1:4179/api/inquiries', { data: { name: 'x', email: 'invalid', message: 'x' } });
  assert.equal(invalid.status(), 400);
  for (let y = 0; y < 4700; y += 500) { await page.evaluate(value => window.scrollTo(0, value), y); await page.waitForTimeout(100); }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'artifacts/desktop-full.png', fullPage: true });
  await page.getByRole('button', { name: 'Animasi: aktif' }).click();
  assert.equal(await page.evaluate(() => document.documentElement.classList.contains('motion-off')), true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.hero');
  assert.equal(await page.evaluate(() => document.documentElement.classList.contains('motion-off')), true);
  const mobile = await browser.newPage({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 1, isMobile: true, reducedMotion: 'reduce' });
  mobile.on('pageerror', e => errors.push(e.message));
  await mobile.goto('http://127.0.0.1:4179/', { waitUntil: 'domcontentloaded' });
  await mobile.waitForSelector('.hero');
  await mobile.waitForTimeout(400);
  await mobile.screenshot({ path: 'artifacts/mobile.png', fullPage: false });
  assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, 'Mobile has horizontal overflow');
  const clipped = await mobile.locator('.hero-copy h1, .hero-description, .contact-form-wrap').evaluateAll(elements => elements.filter(element => { const r = element.getBoundingClientRect(); return r.left < 0 || r.right > window.innerWidth; }).map(element => element.className));
  assert.deepEqual(clipped, [], 'Mobile content is clipped');
  await mobile.getByRole('button', { name: 'Buka navigasi' }).click();
  assert.equal(await mobile.locator('.main-nav').isVisible(), true);
  await mobile.locator('.main-nav').getByRole('link', { name: 'Jasa', exact: true }).click();
  assert.equal(await mobile.locator('.main-nav').isVisible(), false);
  for (let y = 0; y < 7600; y += 600) { await mobile.evaluate(value => window.scrollTo(0, value), y); await mobile.waitForTimeout(70); }
  await mobile.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await mobile.screenshot({ path: 'artifacts/mobile-full.png', fullPage: true });
  const broken = await page.locator('img').evaluateAll(images => images.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src));
  assert.deepEqual(broken, []);
  assert.deepEqual(errors, []);
  console.log('PASS: desktop/mobile layout, project filters, sorting, modal, archive, form persistence, validation, motion preference, mobile navigation, images, and runtime errors.');
} finally {
  await supabase.from('farizy_inquiries').delete().eq('email', email);
  await browser.close();
  server.close();
}
