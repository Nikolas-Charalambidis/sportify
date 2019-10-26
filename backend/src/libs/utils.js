const bcrypt = require('bcrypt');

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

export const verifyHash = (password, hash) => {
  return !!bcrypt.compareSync('123', hash);
};