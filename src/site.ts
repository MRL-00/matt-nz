// Site-wide constants and identity-card data. Edit here, not in templates.
import { execSync } from 'node:child_process';

function lastCommitDate(): string {
  try {
    return execSync('git log -1 --format=%cs', { encoding: 'utf8' }).trim();
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

export const site = {
  url: 'https://matt-nz.com',
  title: 'Matt List',
  shortTitle: 'matt list',
  initials: 'ml',
  description:
    'Matt List — Solution Architect & Engineering Lead based in Christchurch, NZ. Notes on backends, mobile, and shipping software.',
  author: 'Matt List',
  ogImage: '/og.png',
  coordinate: '43.53°S',
  version: 'v0.4.1',
  lastDeploy: lastCommitDate(),
};

export const identity = {
  name: 'Matt List',
  role: 'Solution Architect<br/>& Engineering Lead',
  based: 'Ōtautahi · Christchurch, New Zealand',
  since: '2011 — shipping software',
  stack: '.NET · Go · Swift · Flutter · TS',
  status: 'Waiting for AI to respond',
};

export const links = [
  { k: 'github',   v: '@MRL-00',         href: 'https://github.com/MRL-00' },
  { k: 'x',        v: '@nzmrldev',           href: 'https://x.com/nzmrldev' },
  { k: 'linkedin', v: 'in/mrlist',       href: 'https://www.linkedin.com/in/mrlist/' },
  { k: 'rss',      v: '/feed.xml',         href: '/feed.xml' },
];

export const navItems = [
  { href: '/',         label: 'about',    key: 'about' },
  { href: '/projects', label: 'projects', key: 'projects' },
  { href: '/writing',  label: 'writing',  key: 'writing' },
  { href: '/#contact', label: 'contact',  key: 'contact' },
];

export type NavKey = (typeof navItems)[number]['key'];

export function statusGlyph(status: 'active' | 'stable' | 'archived') {
  if (status === 'active') return '●';
  if (status === 'stable') return '○';
  return '×';
}
