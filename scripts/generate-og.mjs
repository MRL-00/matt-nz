#!/usr/bin/env node
// Generates public/og.png — 1200x630, warm-dark bg, mono URL, no logo.
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '..', 'public', 'og.png');

const W = 1200, H = 630;
const bg     = '#0c0c0d';
const text   = '#e8e6e1';
const dim    = '#b4b1a9';
const muted  = '#6c6961';
const accent = '#9caa6a';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${bg}"/>

  <!-- top hairline -->
  <line x1="64" y1="120" x2="${W - 64}" y2="120" stroke="#1a191d" stroke-width="1"/>

  <!-- top labels -->
  <text x="64"  y="98" fill="${muted}" font-family="JetBrains Mono, ui-monospace, monospace" font-size="20" letter-spacing="2.4">~/ MATT-NZ.COM</text>
  <text x="${W - 64}" y="98" fill="${muted}" font-family="JetBrains Mono, ui-monospace, monospace" font-size="20" letter-spacing="2" text-anchor="end">42.4°S</text>

  <!-- name -->
  <text x="64" y="240" fill="${text}" font-family="JetBrains Mono, ui-monospace, monospace" font-weight="600" font-size="80" letter-spacing="-2">matt list</text>

  <!-- role -->
  <text x="64" y="320" fill="${dim}" font-family="JetBrains Mono, ui-monospace, monospace" font-size="34">solution architect &amp; engineering lead</text>

  <!-- description -->
  <text x="64" y="430" fill="${dim}" font-family="JetBrains Mono, ui-monospace, monospace" font-size="26">notes on ai, backends, websites, mobile and the bits between teams</text>

  <!-- bottom hairline -->
  <line x1="64" y1="540" x2="${W - 64}" y2="540" stroke="#1a191d" stroke-width="1"/>

  <!-- bottom row -->
  <text x="64"  y="580" fill="${muted}" font-family="JetBrains Mono, ui-monospace, monospace" font-size="22">matt-nz.com</text>
  <text x="${W / 2}" y="580" fill="${muted}" font-family="JetBrains Mono, ui-monospace, monospace" font-size="22" text-anchor="middle">christchurch · new zealand</text>
  <text x="${W - 64}" y="580" fill="${accent}" font-family="JetBrains Mono, ui-monospace, monospace" font-size="22" text-anchor="end">● writing &amp; shipping</text>
</svg>`;

const resvg = new Resvg(svg, { background: bg, fitTo: { mode: 'width', value: W } });
const png = resvg.render().asPng();

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, png);
console.log(`wrote ${out} (${png.length} bytes)`);
