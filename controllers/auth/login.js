const jwt = require("jsonwebtoken");
const config = require("../../config");
const { getHashString } = require("../../utils/HashHelper");
const {
  BadRequest,
  InternalServerError,
  Unauthorized
} = require("../../utils/ResponseHelper");
const { getAccountByUsername } = require("../../services/accountService");

const DefNoRememberTime = config.DEF_EXP_SHORT;
const DefRememberTime = config.DEF_EXP_LONG;
const WrongAccountMsg = "Wrong username or password";
const LockedUser = "you are blocked, please contact admin for more detail!";

const login = async (req, res) => {
  let { username, password, remember } = req.body;
  if (!username || !password) return BadRequest(res);
  username = username.trim().toLowerCase();
  try {
    const account = await getAccountByUsername(username);
    if (account && isMatchPassword(account, password)) {
      if(!account.status) return Unauthorized(res, LockedUser);
      responseUserSession(res, account, remember);
    } else {
      Unauthorized(res, WrongAccountMsg);
    }
  } catch (err) {
    console.log(err)
    InternalServerError(res);
  }
};

//Support function
const createToken = (user, expireTime = DefNoRememberTime) => {
  return jwt.sign(
    { username: user.username, id: user._id },
    config.SECRECT_WORD,
    {
      expiresIn: expireTime
    }
  );
};

const isMatchPassword = (user, password) => {
  const hashPassword = getHashString(password, user.salt_password);
  if (hashPassword === user.hash_password) {
    return true;
  }
  return false;
};

const responseUserSession = (res, user, remember) => {
  const { username , _id:id} = user;
  const expireTime = remember ? DefRememberTime : DefNoRememberTime;
  res.json({ token: createToken(user, expireTime), username, id});
};

module.exports = login;
