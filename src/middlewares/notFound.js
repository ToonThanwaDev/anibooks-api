module.exports = (req, res, next) => {
  //   throw new Error("text error middlewares");
  res.status(404).json({ message: "Page not found" });
};
