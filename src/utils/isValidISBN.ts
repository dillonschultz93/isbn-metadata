// https://github.com/kfbfarley/luhn-validation/blob/master/src/lib/isbn.ts
// https://en.wikipedia.org/wiki/ISBN#ISBN-10_check_digit_calculation
// https://en.wikipedia.org/wiki/ISBN#ISBN-13_check_digit_calculation

const VALID_ARGS = ['string', 'number'];

/**
 * Check if the given ISBN is valid.
 * @param {string | number} isbn - The ISBN to check.
 * @returns {boolean} - True if the ISBN is valid, false otherwise.
 */
export const isValidISBN = (isbn: string | number): boolean | TypeError => {
  if (!VALID_ARGS.includes(typeof isbn))
    return new TypeError('The argument must be a string or a number');

  const isbnAsString = String(isbn).replace(/-/g, '');
  const length = isbnAsString.length;
  let sum = 0;
  const list = isbnAsString.split('');
  const checksum = Number(list[length - 1]);

  if (length === 10) {
    for (let i = length + 1; i >= 1; i--) {
      const number = Number(list[length - i]);
      sum += number * i;
    }
    return sum % 11 === 0;
  } else if (length === 13) {
    for (let i = 0; i < length - 1; i++) {
      const number = Number(list[i]);
      if (i % 2 !== 0) {
        sum += number * 3;
      } else {
        sum += number * 1;
      }
    }
    return (sum % 10 !== 0 ? 10 : 0) - (sum % 10) === checksum;
  }
  return false;
};
