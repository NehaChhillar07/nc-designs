const puppeteer = require('puppeteer');

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, isMobile: false, deviceScaleFactor: 1 },
  mobile: { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2, hasTouch: true },
};

async function run(name, vp) {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport(vp);
  if (vp.isMobile) {
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
  }

  const resources = [];
  page.on('response', async (res) => {
    try {
      const h = res.headers();
      const len = parseInt(h['content-length'] || '0', 10);
      resources.push({
        url: res.url(),
        status: res.status(),
        type: res.request().resourceType(),
        bytes: len,
        ct: h['content-type'] || '',
      });
    } catch (e) {}
  });

  const client = await page.target().createCDPSession();
  await client.send('Performance.enable');

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 });

  // Web vitals
  const vitals = await page.evaluate(() => new Promise((resolve) => {
    const out = { lcp: 0, lcpUrl: '', cls: 0, longTasks: 0, longTaskTime: 0, fcp: 0 };
    try {
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) { out.lcp = e.startTime; out.lcpUrl = e.url || e.element?.tagName || ''; }
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (!e.hadRecentInput) out.cls += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) { out.longTasks++; out.longTaskTime += e.duration; }
      }).observe({ type: 'longtask', buffered: true });
      const fcpE = performance.getEntriesByName('first-contentful-paint')[0];
      if (fcpE) out.fcp = fcpE.startTime;
    } catch (e) {}
    setTimeout(() => resolve(out), 2500);
  }));

  const domStats = await page.evaluate(() => ({
    nodes: document.getElementsByTagName('*').length,
    imgs: document.images.length,
    videos: document.querySelectorAll('video').length,
    canvases: document.querySelectorAll('canvas').length,
    styleRules: (() => { let n = 0; for (const s of document.styleSheets) { try { n += s.cssRules.length; } catch (e) {} } return n; })(),
  }));

  const byType = {};
  let total = 0;
  for (const r of resources) {
    byType[r.type] = (byType[r.type] || 0) + r.bytes;
    total += r.bytes;
  }

  const images = resources.filter((r) => r.type === 'image' || r.ct.startsWith('image/'))
    .sort((a, b) => b.bytes - a.bytes).slice(0, 15);
  const scripts = resources.filter((r) => r.type === 'script').sort((a, b) => b.bytes - a.bytes).slice(0, 12);
  const media = resources.filter((r) => r.type === 'media' || r.ct.startsWith('video/'));

  console.log('\n########## ' + name + ' ' + vp.width + 'x' + vp.height + ' ##########');
  console.log('TOTAL BYTES (content-length sum):', (total / 1024).toFixed(1), 'KB');
  console.log('BY TYPE:', Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, (v / 1024).toFixed(1) + 'KB'])));
  console.log('VITALS:', JSON.stringify(vitals));
  console.log('DOM:', JSON.stringify(domStats));
  console.log('REQUESTS:', resources.length);
  console.log('\nTOP IMAGES:');
  for (const i of images) console.log('  ', (i.bytes / 1024).toFixed(1) + 'KB', i.ct, decodeURIComponent(i.url).replace('http://localhost:3000', '').slice(0, 150));
  console.log('\nMEDIA (video):');
  for (const i of media) console.log('  ', (i.bytes / 1024).toFixed(1) + 'KB', decodeURIComponent(i.url).replace('http://localhost:3000', ''));
  console.log('\nTOP SCRIPTS:');
  for (const i of scripts) console.log('  ', (i.bytes / 1024).toFixed(1) + 'KB', i.url.replace('http://localhost:3000', ''));

  // ---- scroll cost measurement ----
  const scrollPerf = await page.evaluate(async () => {
    const frames = [];
    let last = performance.now();
    let running = true;
    const tick = () => {
      const now = performance.now();
      frames.push(now - last);
      last = now;
      if (running) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const height = document.body.scrollHeight;
    const steps = 120;
    for (let i = 0; i <= steps; i++) {
      window.scrollTo(0, (height * i) / steps);
      await new Promise((r) => setTimeout(r, 25));
    }
    running = false;
    frames.sort((a, b) => a - b);
    const p = (q) => frames[Math.floor(frames.length * q)] || 0;
    const longFrames = frames.filter((f) => f > 33).length;
    return {
      pageHeight: height,
      frameCount: frames.length,
      medianFrameMs: +p(0.5).toFixed(2),
      p95FrameMs: +p(0.95).toFixed(2),
      maxFrameMs: +frames[frames.length - 1].toFixed(2),
      framesOver33ms: longFrames,
    };
  });
  console.log('\nSCROLL:', JSON.stringify(scrollPerf));

  await browser.close();
}

(async () => {
  await run('DESKTOP', VIEWPORTS.desktop);
  await run('MOBILE', VIEWPORTS.mobile);
})();
