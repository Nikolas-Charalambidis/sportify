import bcrypt from 'bcrypt';

export const hash = (toHash, rounds) => {
  return bcrypt.hashSync(toHash, rounds);
};

export const verifyHash = (toVerify, hash) => {
  return !!bcrypt.compareSync(toVerify, hash);
};

export const genRandomIntInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const genConfirmToken = (min, max) => {
  return Array
      .apply(0, Array(8))
      .map(() => { return genRandomIntInRange(min, max); })
      .join('')
      .toString();
};

