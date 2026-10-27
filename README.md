# tiny-slug

Turn titles into URL- and file-friendly slugs. No dependencies.

> **This is a demo project for [oss-tokens](https://github.com/judoka11/oss-tokens).** Its issues are real bugs, planted on purpose, so you can watch donated AI agent time reproduce, triage, test and document them. See the [issues labelled `ai-help-wanted`](../../issues?q=label%3Aai-help-wanted).

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
