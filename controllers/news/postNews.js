const { insertNews } = require("../../services/newsService");
const {
  isEmptyBody,
  hasAnyFieldEmpty
} = require("../../utils/validatorRequest");
const {
  BadRequest,
  InternalServerError
} = require("../../utils/ResponseHelper");

const postNews = async (req, res) => {
  console.log("dsdsd",req.body)
  try {
    if (isEmptyBody(req) || hasAnyFieldEmpty(req.body)) return BadRequest(res);
    let data = req.body;
    data.id_account = req.decoded.id;
    const result = await insertNews(data);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    if(error.name == "ValidationError"){
      return BadRequest(res,error.message)
    }
    InternalServerError(res);
  }
};

module.exports = postNews;
