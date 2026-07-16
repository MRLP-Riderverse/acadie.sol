#!/usr/bin/env node
/* Compile-check every executable inline script in the static site. */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const skipped = new Set(['.git', '.hermes', 'node_modules']);
const files = [];
function walk(directory) {
  for (const name of readdirSync(directory)) {
    if (skipped.has(name)) continue;
    const path = join(directory, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (name.endsWith('.html')) files.push(path);
  }
}
walk(root);

const failures = [];
const pattern = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
for (const file of files) {
  const source = readFileSync(file, 'utf8');
  let match;
  let index = 0;
  while ((match = pattern.exec(source))) {
    index += 1;
    const attributes = match[1] || '';
    if (/\bsrc\s*=/.test(attributes) || /application\/(?:ld\+)?json/i.test(attributes)) continue;
    try { new Function(match[2]); }
    catch (error) { failures.push(`${relative(root, file)} script ${index}: ${error.message}`); }
  }
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Inline script check passed: ${files.length} HTML file(s)`);
