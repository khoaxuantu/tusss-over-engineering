/**
 * fix-istanbul-decorators.js
 *
 * @see https://github.com/kulshekhar/ts-jest/issues/1166
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const { default: tsJest } = require('ts-jest');

module.exports = fixIstanbulDecoratorCoverageTransformer();

function fixIstanbulDecoratorCoverageTransformer() {
  const transformer = tsJest.createTransformer({
    tsconfig: './tsconfig.test.json',
  });

  return transformer;
}
