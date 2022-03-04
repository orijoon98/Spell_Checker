const checker = require('../checker');

exports.check = async (req) => {
  try {
    const result = await checker(req.body['sentence']);
    return { status: 1, result: result };
  } catch (err) {
    return { status: 0, result: err };
  }
};
