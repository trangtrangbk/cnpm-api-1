const {} = require("../../utils/HashHelper");
const jwt = require("jsonwebtoken");
const {
  InternalServerError,
  Unauthorized,
  Ok
} = require("../../utils/ResponseHelper");
const config = require("../../config");
const { getAccountById } = require("../../services/accountService");
const LockedUser = "you are blocked, please contact admin for more detail!";

const auth = async (req, res) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token && token.startsWith("JWT ")) {
      token = token.split(" ")[1];
    }
    if (token) {
      jwt.verify(token, config.SECRECT_WORD, async (err, decoded) => {
        if (err) {
          return Unauthorized(res, "Invalid Token!");
        }
        const {status} = await getAccountById(decoded.id);
        if (!status) return Unauthorized(res, LockedUser);
        Ok(res, "you logined");
      });
    } else Forbidden(res, "Not found Token !");
  } catch (e) {
    console.log("REQUIRED LOGIN ERROR", e);
    InternalServerError(res);
  }
};

module.exports = auth;
