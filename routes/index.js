const userApiRoutes = require("./userApi");

const constructorMethod = (app) => {
  app.use("/", userApiRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not Found" });
  });
};

module.exports = constructorMethod;