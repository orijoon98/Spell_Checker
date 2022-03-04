const hanspell = require('hanspell');
const logger = require('../config/logger');

const checker = (sentence) => {
  return new Promise((resolve, reject) => {
    var result = [];
    const end = function () {
      logger.info('spell checked');
      resolve(result);
    };
    const error = function (err) {
      logger.error(err);
      reject(err);
    };
    const response = function (res) {
      result = result.concat(res);
    };
    hanspell.spellCheckByPNU(sentence, 10000, response, end, error);
  });
};

module.exports = checker;
