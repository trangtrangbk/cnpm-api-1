const Account = require("../models/account");
const { ACCOUNT_STATUS } = require("../utils/constant");

const insertAccount = async account => {
  const acc = new Account(account);
  const result = await acc.save();
  return result;
};

const getAccountByEmail= async email => {
  return await Account.findOne({ email });
};
const getAccountByUserName = async username => {
  return await Account.findOne({ username });
};

const getAccountById = async id => {
  return await Account.findById(id);
};

const getUserRoleById = async id => {
  return await Account.findById(id).select("role");
};

const changePassword = async (id, newPass) => {
  return await Account.findByIdAndUpdate(id, { hash_password: newPass });
};

const ManageAccountById = async (id, status) => {
  return await Account.findByIdAndUpdate(id, { status }, { new: true });
};

const getTotalPage = async (pageSize, query) => {
  const count = await Account.countDocuments(query);
  return Math.ceil(count / pageSize);
};

const getPageAccount = async (query, page, pageSize) => {
  page = page > 0 ? page : 1;
  const totalPage = await getTotalPage(pageSize, query);
  const data = await query
    .sort({ _id: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  return { page, pageSize, totalPage, data };
};

const getAccountByStatus = async (status, page = 1, pageSize = 10) => {
  let query;
  switch (status) {
    case ACCOUNT_STATUS.ACTIVE:
      query = Account.find({ status: ACCOUNT_STATUS.ACTIVE });
      break;
    case ACCOUNT_STATUS.BLOCKED:
      query = Account.find({ status: ACCOUNT_STATUS.BLOCKED });
      break;
    default:
      query = Account.find();
  }
  return await getPageAccount(query, page, pageSize);
};

const changeRoleToAdmin = async (id, toAdmin) => {
  if (toAdmin) {
    return Account.findOneAndUpdate({ _id: id }, { $push: { role: "admin" } });
  } else {
    return Account.findOneAndUpdate({ _id: id }, { $pull: { role: "admin" } });;
  }
};

const countTotalAccount =async ()=>{
  return await Account.countDocuments();
}

module.exports = {
  insertAccount,
  getAccountByEmail,
  getAccountByUserName,
  getUserRoleById,
  ManageAccountById,
  getAccountById,
  getAccountByStatus,
  changePassword,
  changeRoleToAdmin,
  countTotalAccount
};
