// Reading-time + word-count for rendered markdown. 250 wpm.
export function readingStats(markdown: string): { words: number; minutes: number } {
  // Strip frontmatter just in case
  const body = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');
  // Strip code fences and inline code
  const stripped = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>\-\[\]()]/g, ' ');
  const words = stripped.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 250));
  return { words, minutes };
}

export function formatWords(n: number): string {
  return n.toLocaleString('en-NZ');
}
