const spellService = require('../services/spellService');

exports.check = async (req, res) => {
  const result = await spellService.check(req);
  if (result.status == 1) return res.status(200).send(result.result);
  else return res.status(500).send(result.result);
};
