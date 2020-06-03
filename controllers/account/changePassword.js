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
  const { oldpass, newpass } = req.body;
  const { id } = req.decoded;
  if(!oldpass || !newpass) return BadRequest(res, "invalid data");
  try {
    const { hash_password , salt_password} = await getAccountById(id);
    if (hash_password !== getHashString(oldpass, salt_password))
      return BadRequest(res, "Old password is not correct");
    await changePassword(id, getHashString(newpass, salt_password));
    Ok(res, "Password was changed");
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = change;
