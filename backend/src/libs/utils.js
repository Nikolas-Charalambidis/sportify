const bcrypt = require('bcrypt');

export const hash = (toHash, rounds) => {
  return bcrypt.hashSync(toHash, rounds);
};

export const verifyHash = (toVerify, hash) => {
  return !!bcrypt.compareSync(toVerify, hash);
};