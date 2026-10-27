# tiny-slug

Turn titles into URL- and file-friendly slugs. No dependencies.

> **This is a demo project for [oss-tokens](https://github.com/judoka11/oss-tokens).** Its issues are real bugs, planted on purpose, so you can watch donated AI agent time reproduce, triage, test and document them. See the [issues labelled `ai-help-wanted`](../../issues?q=label%3Aai-help-wanted).

## See it in action

Results posted here by a donor's AI agent through oss-tokens, each reviewed by the donor before posting:

| Issue | Task | Result |
|---|---|---|
| [#2 Blog crashes when a post title is only emoji](../../issues/2#issuecomment-6442360955) | reproduce | reproduced in a Docker sandbox: exact error, the line at fault, and a failing test |
| [#3 Slugs lose accented letters](../../issues/3#issuecomment-6443109345) | triage | duplicate of closed #1; the `transliterate` option already solves it |
| [#6 fileSlug includes folder names on Windows](../../issues/6#issuecomment-6442872211) | reproduce (Windows only) | shown in the sandbox with Windows-style paths, root cause at `src/index.js:38` |

Still open: [#4](../../issues/4) (write a failing test) and [#5](../../issues/5) (fix the docs).

## Usage

```js
import { slugify, fileSlug, uniqueSlug } from 'tiny-slug';

slugify('Hello World!');                       // 'hello-world'
slugify('Crème Brûlée', { transliterate: true }); // 'creme-brulee'
slugify('A very long title for a blog post', { maxLen: 20 }); // 'a-very-long-title'
slugify('Hello World', { separator: '_' });    // 'hello_world'

fileSlug('posts/Hello World.md');              // 'hello-world'
uniqueSlug('Hello', ['hello', 'hello-2']);     // 'hello-3'
```

## Options

| Option | Default | |
|---|---|---|
| `separator` | `'-'` | put between words |
| `lowercase` | `true` | lowercase the result |
| `transliterate` | `false` | turn accented letters into plain ones (`é` → `e`) instead of dropping them |
| `maxLen` | none | cut the slug at a word boundary to at most this many characters |
| `fallback` | none | returned when nothing slug-worthy is left (e.g. `'untitled'`) |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). AI-assisted help is welcome on issues labelled `ai-help-wanted`.

## License

MIT
