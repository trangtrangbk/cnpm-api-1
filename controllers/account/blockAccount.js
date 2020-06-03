const { ManageAccountById } = require("../../services/accountService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");

const block = async (req, res) => {
  const { id, status } = req.body;
  const {id:adminId} = req.decoded;
  if (!id || adminId === id) return BadRequest(res, "Invalid params");
  try {
    const result = await ManageAccountById(id, status);
    res.send(result);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = block;
