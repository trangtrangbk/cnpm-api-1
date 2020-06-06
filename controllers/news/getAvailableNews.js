const { getNewsByStatus } = require("../../services/newsService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");
const { NEWS_STATUS } = require("../../utils/constant");

const get = async (req, res) => {
  let { page, pageSize } = req.query;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 5;
  try {
    const result = await getNewsByStatus(NEWS_STATUS.AVAILABLE, page, pageSize);
    res.send(result);
  } catch (error) {
    console.log(error)
    InternalServerError(res);
  }
};

module.exports = get;