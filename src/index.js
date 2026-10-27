// tiny-slug: turn titles into URL- and file-friendly slugs.

const DEFAULTS = {
  separator: '-',
  lowercase: true,
  transliterate: false, // "Crème" -> "creme" instead of "cr-me"
  maxLength: Infinity,
  fallback: undefined,  // used when nothing slug-worthy is left
};

export function slugify(input, options = {}) {
  const { separator, lowercase, transliterate, maxLength, fallback } = { ...DEFAULTS, ...options };
  let slug = String(input ?? '');

  if (transliterate) slug = slug.normalize('NFKD').replace(/[̀-ͯ]/g, '');
  if (lowercase) slug = slug.toLowerCase();

  slug = slug.replace(/[^a-zA-Z0-9]+/g, separator);
  slug = slug.replace(/^-+|-+$/g, '');

  if (slug.length > maxLength) slug = truncate(slug, maxLength, separator);
  if (!slug) slug = fallback.toLowerCase();

  return slug;
}

// Cut at the last separator that fits, so words aren't chopped in half.
function truncate(slug, maxLength, separator) {
  const cut = slug.slice(0, maxLength);
  if (slug.startsWith(separator, maxLength)) return cut; // already ends on a whole word
  const last = cut.lastIndexOf(separator);
  return last > 0 ? cut.slice(0, last) : cut;
}

// Slug for a file from its path: "posts/Hello World.md" -> "hello-world".
export function fileSlug(filePath, options) {
  const name = filePath.split('/').pop();
  return slugify(name.replace(/\.[^.]+$/, ''), options);
}

// Adds -2, -3, ... until the slug isn't in `taken` (a Set or array).
export function uniqueSlug(input, taken, options) {
  const used = taken instanceof Set ? taken : new Set(taken);
  const base = slugify(input, options);
  const separator = options?.separator ?? DEFAULTS.separator;
  let slug = base;
  for (let n = 2; used.has(slug); n++) slug = `${base}${separator}${n}`;
  return slug;
}
