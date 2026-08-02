const puppeteer = require('puppeteer');
const fs = require('fs');

const OUT = '/private/tmp/claude-501/-Users-neha-nc-portfolio/1aeb7f53-f2ab-4d2d-949f-a1735849de23/scratchpad';

const ROUTES = [
  ['/', 'home'],
  ['/resume', 'resume'],
  ['/case-study/human-firewall', 'cs-human-firewall'],
  ['/case-study/ecrime-hub', 'cs-ecrime-hub'],
  ['/case-study/flashcard-training', 'cs-flashcard'],
  ['/case-study/unsaid', 'cs-unsaid'],
  ['/writing/first-designer', 'w-first-designer'],
];

const VIEWPORTS = [
  { w: 375, h: 667, name: 'iphone-se', mobile: true },
  { w: 390, h: 844, name: 'iphone-14', mobile: true },
  { w: 768, h: 1024, name: 'ipad-p', mobile: true },
  { w: 1024, h: 768, name: 'ipad-l', mobile: false },
  { w: 1440, h: 900, name: 'laptop', mobile: false },
  { w: 1920, h: 1080, name: 'desktop', mobile: false },
];

const probe = () => {
  const de = document.documentElement;
  const vw = window.innerWidth;
  const res = {
    scrollWidth: de.scrollWidth,
    clientWidth: de.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerWidth: vw,
    overflow: de.scrollWidth > de.clientWidth + 1,
    offenders: [],
    clipped: [],
    smallTargets: [],
    fixed: [],
    vhUsers: [],
    nowrap: [],
    imgs: [],
  };

  const desc = (el) => {
    let cls = (typeof el.className === 'string' ? el.className : (el.className && el.className.baseVal) || '');
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      cls: cls.slice(0, 220),
      text: (el.textContent || '').trim().slice(0, 70),
    };
  };

  const all = Array.from(document.querySelectorAll('body *'));

  // 1. horizontal overflow offenders
  for (const el of all) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const overRight = r.right - vw;
    const overLeft = -r.left;
    if (overRight > 1 || overLeft > 1) {
      // is it clipped by an ancestor with overflow hidden/clip?
      let clippedByAncestor = false;
      let p = el.parentElement;
      while (p && p !== document.body) {
        const pcs = getComputedStyle(p);
        if (/hidden|clip|auto|scroll/.test(pcs.overflowX)) { clippedByAncestor = true; break; }
        p = p.parentElement;
      }
      res.offenders.push({
        ...desc(el),
        left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width),
        overRight: Math.round(overRight), overLeft: Math.round(overLeft),
        position: cs.position, transform: cs.transform !== 'none' ? cs.transform.slice(0, 60) : null,
        clippedByAncestor,
        depth: (() => { let d = 0, q = el; while (q.parentElement) { d++; q = q.parentElement; } return d; })(),
      });
    }
  }
  // keep only the most severe + shallowest
  res.offenders.sort((a, b) => (b.overRight + b.overLeft) - (a.overRight + a.overLeft));
  res.offenders = res.offenders.slice(0, 25);

  // 2. text clipping: scrollWidth > clientWidth with overflow hidden
  for (const el of all) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none') continue;
    if (el.children.length > 0 && !['BUTTON', 'A', 'H1', 'H2', 'H3', 'P', 'SPAN'].includes(el.tagName)) continue;
    if (el.scrollWidth > el.clientWidth + 1 && /hidden|clip/.test(cs.overflowX) && el.clientWidth > 0) {
      res.clipped.push({ ...desc(el), scrollW: el.scrollWidth, clientW: el.clientWidth, overflowX: cs.overflowX });
    }
  }
  res.clipped = res.clipped.slice(0, 20);

  // whitespace-nowrap elements wider than viewport
  for (const el of all) {
    const cs = getComputedStyle(el);
    if (cs.whiteSpace === 'nowrap' || cs.whiteSpace === 'pre') {
      const r = el.getBoundingClientRect();
      if (r.width > vw - 8 && (el.textContent || '').trim().length > 0) {
        res.nowrap.push({ ...desc(el), width: Math.round(r.width), ws: cs.whiteSpace });
      }
    }
  }
  res.nowrap = res.nowrap.slice(0, 15);

  // 3. small touch targets
  const interactive = Array.from(document.querySelectorAll('a, button, [role="button"], input, select, textarea, [onclick]'));
  for (const el of interactive) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.pointerEvents === 'none') continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (r.top > window.innerHeight * 8) continue;
    if (r.width < 44 || r.height < 44) {
      res.smallTargets.push({ ...desc(el), w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top + window.scrollY) });
    }
  }
  res.smallTargets = res.smallTargets.slice(0, 40);

  // 4. fixed/sticky
  for (const el of all) {
    const cs = getComputedStyle(el);
    if (cs.position === 'fixed' || cs.position === 'sticky') {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      res.fixed.push({ ...desc(el), position: cs.position, top: Math.round(r.top), height: Math.round(r.height), width: Math.round(r.width), zIndex: cs.zIndex });
    }
  }
  res.fixed = res.fixed.slice(0, 25);

  // 5. images with fixed px width in style attr or width attr
  for (const el of Array.from(document.querySelectorAll('img, video, svg, iframe, canvas'))) {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (r.width > vw + 1) {
      res.imgs.push({ ...desc(el), w: Math.round(r.width), maxWidth: cs.maxWidth, src: (el.currentSrc || el.src || '').slice(-60) });
    }
  }
  res.imgs = res.imgs.slice(0, 15);

  return res;
};

async function collectVh() {
  return Array.from(document.querySelectorAll('body *')).filter(el => {
    const s = el.getAttribute('style') || '';
    return /\d+vh/.test(s);
  }).map(el => ({ tag: el.tagName.toLowerCase(), cls: (typeof el.className === 'string' ? el.className : '').slice(0, 150), style: (el.getAttribute('style') || '').slice(0, 120) })).slice(0, 10);
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const results = {};

  for (const [route, slug] of ROUTES) {
    results[route] = {};
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: 1, isMobile: vp.mobile, hasTouch: vp.mobile });
      if (vp.mobile) {
        await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
      }
      const consoleErrs = [];
      page.on('pageerror', e => consoleErrs.push(String(e).slice(0, 150)));
      try {
        await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle2', timeout: 60000 });
      } catch (e) {
        try { await page.goto('http://localhost:3000' + route, { waitUntil: 'domcontentloaded', timeout: 60000 }); } catch (e2) {}
      }
      await new Promise(r => setTimeout(r, 2500));

      const top = await page.evaluate(probe);
      const vhList = await page.evaluate(collectVh);

      // scroll through page and re-check overflow at several scroll depths (animations reveal content)
      const scrollProbe = await page.evaluate(async () => {
        const de = document.documentElement;
        const total = de.scrollHeight;
        const step = window.innerHeight * 0.75;
        const found = [];
        let maxScrollW = de.scrollWidth;
        for (let y = 0; y < total; y += step) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 400));
          const vw = window.innerWidth;
          if (de.scrollWidth > maxScrollW) maxScrollW = de.scrollWidth;
          if (de.scrollWidth > de.clientWidth + 1) {
            for (const el of Array.from(document.querySelectorAll('body *'))) {
              const cs = getComputedStyle(el);
              if (cs.display === 'none' || cs.visibility === 'hidden') continue;
              const r = el.getBoundingClientRect();
              if (r.width === 0 && r.height === 0) continue;
              if (r.right - vw > 1 || -r.left > 1) {
                let clippedByAncestor = false;
                let p = el.parentElement;
                while (p && p !== document.body) {
                  const pcs = getComputedStyle(p);
                  if (/hidden|clip|auto|scroll/.test(pcs.overflowX)) { clippedByAncestor = true; break; }
                  p = p.parentElement;
                }
                found.push({
                  scrollY: Math.round(y),
                  tag: el.tagName.toLowerCase(),
                  cls: (typeof el.className === 'string' ? el.className : (el.className && el.className.baseVal) || '').slice(0, 200),
                  text: (el.textContent || '').trim().slice(0, 60),
                  left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width),
                  over: Math.round(Math.max(r.right - vw, -r.left)),
                  position: cs.position,
                  clippedByAncestor,
                });
              }
            }
          }
        }
        window.scrollTo(0, 0);
        return { maxScrollW, docScrollW: de.scrollWidth, clientW: de.clientWidth, scrollHeight: total, found: found.slice(0, 60) };
      });

      results[route][vp.name] = { vp, top, vhList, scrollProbe, consoleErrs: consoleErrs.slice(0, 5) };

      await page.screenshot({ path: `${OUT}/${slug}__${vp.name}.png`, fullPage: false });
      await page.close();
      console.log(`done ${route} @ ${vp.name} | overflow=${top.overflow} sw=${top.scrollWidth}/${top.clientWidth} maxSW=${scrollProbe.maxScrollW} offenders=${top.offenders.length} small=${top.smallTargets.length}`);
    }
  }

  fs.writeFileSync(`${OUT}/results.json`, JSON.stringify(results, null, 2));
  await browser.close();
})();
