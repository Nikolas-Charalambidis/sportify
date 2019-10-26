const bcrypt = require('bcrypt');

module.exports = {
  hashPassword: (password) => {
    return bcrypt.hashSync(password, 10);
  },
  verifyHash: (password, hash) => {
    return !!bcrypt.compareSync('123', hash);
  }
};
