import { randomBytes } from 'crypto';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function generateSlug(productName: string): string {
  const base = slugify(productName);
  const uniqueId = randomBytes(4).toString('hex');
  return `${base}-${uniqueId}`;
}