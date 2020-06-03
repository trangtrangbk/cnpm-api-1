const UserInfo = require("../models/userInfo");

const insertUserInfo = async userInfoData => {
  const userInfo = new UserInfo(userInfoData);
  return await userInfo.save();
};

const getUserInfoByEmail = async email => {
  return await UserInfo.findOne({ email });
};

const updateAvatar = async (id, avatar) => {
  return await UserInfo.findOneAndUpdate({ id_account: id }, { avatar });
};

const getUserInfoById = async id => {
  return await UserInfo.findOne({ id_account: id });
};

const updateUserInfoByIdAccount = async (id, userInfoData) => {
  return await UserInfo.findOneAndUpdate({ id_account: id }, userInfoData, {
    new: true
  });
};

const addFavourite = async (id_account, id_news) => {
  let { favourite } = await getAccountById(id_account);
  if (favourite.indexOf(id_news) < 0) {
    favourite.push(id_news);
    return await UserInfo.findOneAndUpdate(
      { id_account },
      { favourite },
      { new: true }
    );
  }
};

const removeFavourite = async (id_account, id_news) => {
  let { favourite } = await getAccountById(id_account);
  const index = favourite.indexOf(id_news);
  if (index > 0) {
    favourite.splice(index, 1);
    return await UserInfo.findOneAndUpdate(
      { id_account },
      { favourite },
      { new: true }
    );
  }
};

module.exports = {
  insertUserInfo,
  getUserInfoById,
  updateUserInfoByIdAccount,
  getUserInfoByEmail,
  addFavourite,
  removeFavourite,
  updateAvatar
};
