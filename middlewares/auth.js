const jwt = require("jsonwebtoken");
const config = require("../config");
const {
  Forbidden,
  InternalServerError,
  Unauthorized
} = require("../utils/ResponseHelper");
const { getUserRoleById } = require("../services/accountService");
const LockedUser = "you are blocked, please contact admin for more detail!";
const { getAccountById } = require("../services/accountService");

const requiredLogin = (req, res, next) => {
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
        req.decoded = decoded;
        const {status} = await getAccountById(decoded.id);
        if (!status) return Unauthorized(res, LockedUser);
        next();
      });
    } else Forbidden(res, "Not found Token !");
  } catch (e) {
    console.log("REQUIRED LOGIN ERROR", e);
    InternalServerError(res);
  }
};

const requiredAdmin = async (req, res, next) => {
  requiredLogin(req, res, async () => {
    try {
      const { role } = await getUserRoleById(req.decoded.id);
      if (role.includes("admin")) {
        next();
      } else {
        return Forbidden(res, "This action requires admin role!");
      }
    } catch (e) {
      console.log("REQUIRED ADMIN ERROR", e);
      InternalServerError(res);
    }
  });
};

module.exports = { requiredLogin, requiredAdmin };
