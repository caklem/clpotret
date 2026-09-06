import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile = await mkdtemp(join(tmpdir(), 'cl-potret-responsive-'));
const chrome = spawn(chromePath, [
  '--headless=new', '--no-first-run', '--disable-gpu', '--remote-debugging-port=9333',
  `--user-data-dir=${profile}`, 'about:blank'
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
try {
  let target;
  for (let attempt = 0; attempt < 30; attempt++) {
    try { const targets = await fetch('http://127.0.0.1:9333/json').then((r) => r.json()); target = targets.find((entry) => entry.type === 'page'); if (target) break; } catch {}
    await sleep(100);
  }
  if (!target) throw new Error('Chrome DevTools endpoint was unavailable');
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let id = 0;
  const pending = new Map();
  socket.onmessage = ({ data }) => { const message = JSON.parse(data); if (message.id && pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id); } };
  const send = (method, params = {}) => new Promise((resolve) => { const callId = ++id; pending.set(callId, resolve); socket.send(JSON.stringify({ id: callId, method, params })); });
  const widths = [1024, 1280, 1440, 1920];
  const pages = ['/', '/portfolio', '/services', '/pricing', '/booking', '/links'];
  const failures = [];
  for (const width of widths) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'about:blank' });
    await sleep(100);
    for (let attempt = 0; attempt < 20; attempt++) {
      const measured = await send('Runtime.evaluate', { returnByValue: true, expression: 'innerWidth' });
      if (measured.result.result.value === width) break;
      await sleep(50);
    }
    for (const page of pages) {
      await send('Page.navigate', { url: `http://localhost:4321${page}` });
      for (let attempt = 0; attempt < 50; attempt++) {
        const locationCheck = page === '/' ? `location.pathname === '/'` : `location.pathname.startsWith('${page}')`;
        const ready = await send('Runtime.evaluate', { returnByValue: true, expression: `document.readyState !== 'loading' && Boolean(document.querySelector('main')) && document.title.length > 0 && ${locationCheck}` });
        if (ready.result.result.value) break;
        await sleep(100);
      }
      const result = await send('Runtime.evaluate', { returnByValue: true, expression: `(() => {
        const viewport = innerWidth;
        const offenders = [...document.querySelectorAll('body *')].filter((el) => {
          const r = el.getBoundingClientRect(); const style = getComputedStyle(el);
          return style.position !== 'fixed' && r.width > 1 && (r.right > viewport + 2 || r.left < -2);
        }).slice(0, 8).map((el) => ({ tag: el.tagName, class: el.className, left: Math.round(el.getBoundingClientRect().left), right: Math.round(el.getBoundingClientRect().right) }));
        const compactIssues = [];
        const categoryGrid = document.querySelector('.category-grid');
        if (viewport <= 1100 && categoryGrid) {
          const categoryColumns = getComputedStyle(categoryGrid).gridTemplateColumns.split(' ').length;
          if (categoryColumns > 2) compactIssues.push('homepage category grid is denser than two columns');
          if (getComputedStyle(document.querySelector('.vertical')).display !== 'none') compactIssues.push('decorative vertical label consumes laptop-width space');
        }
        const serviceRow = document.querySelector('.services article');
        if (viewport <= 1100 && serviceRow) {
          const gap = parseFloat(getComputedStyle(serviceRow).columnGap);
          if (gap > 64) compactIssues.push('service columns have more than 64px gap');
        }
        return { viewport, scrollWidth: document.documentElement.scrollWidth, offenders, compactIssues };
      })()` });
      const metrics = result.result.result.value;
      if (metrics.scrollWidth > metrics.viewport + 2 || metrics.offenders.length || metrics.compactIssues.length) failures.push({ width, page, ...metrics });
    }
  }
  if (process.env.CAPTURE === '1') {
    await send('Emulation.setDeviceMetricsOverride', { width: 1024, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'http://localhost:4321/' }); await sleep(1200);
    const shot = await send('Page.captureScreenshot', { format: 'png', fromSurface: true });
    await writeFile('qa-responsive-1024.png', Buffer.from(shot.result.data, 'base64'));
  }
  if (failures.length) { console.error(JSON.stringify(failures, null, 2)); process.exitCode = 1; }
  else console.log('Responsive bounds passed at 1024, 1280, 1440, and 1920px across 6 pages.');
} finally {
  socket?.close(); chrome.kill();
  for (let attempt = 0; attempt < 10; attempt++) {
    try { await rm(profile, { recursive: true, force: true }); break; } catch { await sleep(150); }
  }
}
