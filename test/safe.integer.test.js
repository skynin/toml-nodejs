import assert from 'node:assert/strict'
import test from 'node:test'
import { decode } from '../src/decoder.js';

test('test 42', (t) => {
  const tstStr = `
  [a]
  b = 42
  `

  const obj = decode(tstStr);

  assert.strictEqual(typeof obj.a.b, 'number')
  assert.strictEqual(obj.a.b, 42)
});

test('test 0x42', (t) => {
  const tstStr = `
  [a]
  b = 0x42
  `

  const obj = decode(tstStr);

  assert.strictEqual(typeof obj.a.b, 'number')
  assert.strictEqual(obj.a.b, 0x42)
});


test('test BigInt', (t) => {
  const tstStr = `
  [a]
  b = 9007199254740992
  `

  const obj = decode(tstStr);

  assert.strictEqual(typeof obj.a.b, 'bigint')
  assert.strictEqual(obj.a.b, 9007199254740992n)
});

test('test 0xBigInt', async (t) => {

  await t.test('OK', () => {
    const tstStr = `
    [a]
    b = 0x7007199254740992
    `

    const obj = decode(tstStr);
    assert.strictEqual(typeof obj.a.b, 'bigint')
  })

  await t.test('Error', () => {
    const tstStr = `
    [a]
    b = 0x9007199254740992
    `
    assert.throws(
      () => {
        const obj = decode(tstStr);
        console.log(obj)
      },
      {
        message: 'Integer out of range: 10378291982571407762 > 9223372036854775807'
      }
    )
  })
});