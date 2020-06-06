const { getAccountByStatus } = require("../../services/accountService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  let { page, pageSize, status } = req.query;
  if (!page ) page = 1;
  pageSize = parseInt(pageSize);
  try {
    const result = await getAccountByStatus(status, page, pageSize);
    res.send(result);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
