const {
  changeRoleToAdmin,
  getAccountById
} = require("../../services/accountService");
const {
  InternalServerError,
  BadRequest,
  Ok
} = require("../../utils/ResponseHelper");

const change = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const account = await getAccountById(id);
    if (!account) {
        return BadRequest(res);
    }

    if(role === "admin"){
        if(account.role.indexOf("admin")>0)
            return Ok(res, "This account is already admin");
        await changeRoleToAdmin(id,true);
    }else{
        await changeRoleToAdmin(id,false);       
    }
    Ok(res, "role was changed");
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = change;
