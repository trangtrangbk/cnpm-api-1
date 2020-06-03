const { getNewsById } = require("../../services/newsService");
const {
  InternalServerError,
  BadRequest
} = require("../../utils/ResponseHelper");

const getById = async (req, res) => {
  try {
    const result = await getNewsById(req.params.id);
    res.send(result);
  } catch (error) {
    if ((error.name = "CastError")) return BadRequest(res, "Invalid id");
    InternalServerError(res);
  }
};

module.exports = getById;