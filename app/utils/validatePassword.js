const MINIMUM_LENGTH = 8;
const lowerAlphabet = /[a-z]+/;
const upperAlphabet = /[A-Z]+/;
const digit = /[0-9]+/;
const symbol = /[!@#$%^&*()]+/;

/**
 *
 * @param {string} password
 */
function isValidPassword(password) {
  return (
    password.length >= MINIMUM_LENGTH &&
    password.match(digit) &&
    password.toLowerCase().match(lowerAlphabet)
  );
}

/**
 *
 * @param {string} password
 */
function checkPasswordStrength(password) {
  let strength = 0;
  if (isValidPassword(password)) strength++;
  if (password.match(upperAlphabet)) strength++;
  if (password.match(symbol)) strength++;
  if (password.length > 12) strength++;
  return strength;
}

export { checkPasswordStrength };
