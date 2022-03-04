const hanspell = require('hanspell');
const logger = require('../config/logger');

const checker = (sentence) => {
  return new Promise((resolve, reject) => {
    const end = function () {};
    const error = function (err) {
      logger.error(err);
      reject(err);
    };
    const response = function (res) {
      logger.info('spell checked');
      resolve(res);
    };
    hanspell.spellCheckByPNU(sentence, 10000, response, end, error);
  });
};

module.exports = checker;
