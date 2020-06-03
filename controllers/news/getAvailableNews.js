const { getNewsByStatus } = require("../../services/newsService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");
const { NEWS_STATUS } = require("../../utils/constant");

const get = async (req, res) => {
  
  try {
    const result = await getNewsByStatus(NEWS_STATUS.AVAILABLE);
    res.send(result);
  } catch (error) {
    console.log(error)
    InternalServerError(res);
  }
};

module.exports = get;