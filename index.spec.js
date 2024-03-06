import { describe, expect, it } from 'vitest';

import { Fetta } from '.';

import examples from './examples/example.test.json';
import slices from './examples/example.slices.json';

describe('example', async () => {
  it('should have imported the example data correctly', () => {
    expect(examples).toBeInstanceOf(Array);
    expect(slices).toBeInstanceOf(Array);
  });

  examples.forEach(
    ({ $comment = '', $env, data = {}, input = {}, output = {} }) => {
      it(`should resolve each example: "${$comment}"`, () => {
        const fetta = new Fetta(slices, $env);
        expect(fetta.resolve(data, input)).toEqual(output);
      });
    },
  );
});
