import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify, fileSlug, uniqueSlug } from '../src/index.js';

test('basic titles', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
  assert.equal(slugify('  Spaces   everywhere  '), 'spaces-everywhere');
  assert.equal(slugify('Rock & Roll! (Live)'), 'rock-roll-live');
});

test('keeps case when asked', () => {
  assert.equal(slugify('Hello World', { lowercase: false }), 'Hello-World');
});

test('transliterate keeps accented letters readable', () => {
  assert.equal(slugify('Crème Brûlée', { transliterate: true }), 'creme-brulee');
  assert.equal(slugify('Ñandú', { transliterate: true }), 'nandu');
});

test('maxLength cuts at a word boundary', () => {
  assert.equal(slugify('The quick brown fox jumps', { maxLength: 15 }), 'the-quick-brown');
  assert.equal(slugify('Supercalifragilistic', { maxLength: 5 }), 'super');
});

test('fallback when nothing is left', () => {
  assert.equal(slugify('!!!', { fallback: 'Untitled' }), 'untitled');
});

test('fileSlug strips folders and extension', () => {
  assert.equal(fileSlug('posts/Hello World.md'), 'hello-world');
  assert.equal(fileSlug('My Notes.txt'), 'my-notes');
});

test('uniqueSlug counts up', () => {
  assert.equal(uniqueSlug('Hello', ['hello', 'hello-2']), 'hello-3');
  assert.equal(uniqueSlug('Hello', new Set()), 'hello');
});
