const router = require("express").Router();

// tasks router
router.use("/tasks", require("./task.routes"));

router.get("/", (req, res) => {
  res.send("hello world");
});

router.use("*", (req, res) => {
  res.send("not found!");
});

module.exports = router;
