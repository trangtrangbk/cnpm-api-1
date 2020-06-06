const Permission = require("../models/permission");

const getListPermission = async () => {
    return await Permission.find();
  };

  const getPermissionById = async id => {
    return await Permission.findOne({ id_per: id });
  };
module.exports ={
    getPermissionById,
    getListPermission
};
