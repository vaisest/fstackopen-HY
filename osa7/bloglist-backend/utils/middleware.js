const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return next();
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  req.user = await User.findById(decodedToken.id);
  next();
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).json({
      error: "malformatted id",
    });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message,
    });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "token expired",
    });
  }

  logger.error(error.message);

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
