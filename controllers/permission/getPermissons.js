const {getPermissions} = require("../../services/permissionService");
const {
    InternalServerError,
    BadRequest
  } = require("../../utils/ResponseHelper");

const get = async (req, res) => {
    try {
        const result= await getPermissions();
        res.send(result);
    }catch(error){
        console.log(error)
        InternalServerError(res);        
        
    }
    
    
};
module.exports=get;