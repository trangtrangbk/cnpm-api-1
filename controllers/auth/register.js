const {
  insertAccount,
  getAccountByUsername
} = require("../../services/accountService");
const { insertUserInfo } = require("../../services/userInforService");
const {
  BadRequest,
  InternalServerError 
} = require("../../utils/ResponseHelper"); 
const { getHashString, getRandomString } = require("../../utils/HashHelper");

const EXISTED_ACCOUNT = "This account existed";

const register = async (req, res) => {
  const bodyData = getAccountFromBodyRequest(req);
  if (!bodyData) return BadRequest(res, "invalid data");
  try {
    const account = await getAccountByUsername(bodyData.username);
    if (account) return BadRequest(res, EXISTED_ACCOUNT);
    const accountData = hashPasswordOfAccount(bodyData);
    const savingAccountResult = await insertAccount(accountData);
    console.log(bodyData.displayName)  
    const userInfoData = {
      id_account: savingAccountResult._id,
      displayName: bodyData.displayName || savingAccountResult.username
    };
    const savingUserInfoResult = await insertUserInfo(userInfoData);
    const result = getResponseObject(savingAccountResult, savingUserInfoResult);
    res.status(201).json(result);
  } catch (error) {
    InternalServerError(res);
    console.log(error);
  }
};

const getResponseObject = (account, userInfo) => {
  return {
    username: account.username,
    displayName: userInfo.displayName,
    join_date: account.createdDay
  };
};

const hashPasswordOfAccount = account => {
  const saltPassword = getRandomString();
  const hashPassword = getHashString(account.password, saltPassword);
  const accountData = {
    username: account.username,
    hash_password: hashPassword,
    salt_password: saltPassword,
    status: true
  };
  return accountData;
};

const getAccountFromBodyRequest = req => {
  if (!req.body) return null;
  let { username, password, displayName } = req.body;
  if (username && password) {
    username = username.trim();
    password = password.trim();
    if (username == "" || password == "") {
      return null;
    }
    return { username, password, displayName };
  } else {
    return null;
  }
};

module.exports = register;
