const bcrypt = require('bcrypt');

export const hash = (toHash, rounds) => {
  return bcrypt.hashSync(toHash, rounds);
};

export const verifyHash = (toVerify, hash) => {
  return !!bcrypt.compareSync(toVerify, hash);
};

export const getRandomIntInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};