const {
  insertAccount,
  getAccountByEmail,
  getAccountByUserName,
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
    const account = await getAccountByEmail(bodyData.email);
    const account1=await getAccountByUserName(bodyData.username);
    if (account) return BadRequest(res, EXISTED_ACCOUNT);
    if(account1)return BadRequest(res, EXISTED_ACCOUNT);
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
    email:account.email,
    join_date: account.createdDay
  };
};

const hashPasswordOfAccount = account => {
  const saltPassword = getRandomString();
  const hashPassword = getHashString(account.password, saltPassword);
  const accountData = {
    email:account.email,
    username: account.username,
    hash_password: hashPassword,
    salt_password: saltPassword,
    status: true
  };
  return accountData;
};

const getAccountFromBodyRequest = req => {
  if (!req.body) return null;
  let { email,username, password, displayName } = req.body;
  if (email && username && password) {
    email=email.trim();
    username = username.trim();
    password = password.trim();
    if (email==""|| username == "" || password == "") {
      return null;
    }
    return { email, username, password, displayName };
  } else {
    return null;
  }
};

module.exports = register;
