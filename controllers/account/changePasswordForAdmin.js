const {
  changePassword,
  getAccountById
} = require("../../services/accountService");
const { getHashString } = require("../../utils/HashHelper");
const {
  InternalServerError,
  BadRequest,
  Ok
} = require("../../utils/ResponseHelper");

const change = async (req, res) => {
  const { id, newpass } = req.body;
  if(!id || !newpass) return BadRequest(res, "invalid data");
  try {
    await changePassword(id, getHashString(newpass, salt_password));
    Ok(res, "Password was changed");
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = change;
