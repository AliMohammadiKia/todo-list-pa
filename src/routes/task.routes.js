const router = require("express").Router();
const controllers = require("../controllers/task.controllers");

// prefix => /tasks

// tasks/
router.get("/", controllers.getAllTasks);

// tasks/new
router.post("/new", controllers.createTask);

// tasks/update
router.patch("/update/:id", controllers.updateTask);

router.delete("/delete/:id", controllers.deleteTask);

module.exports = router;
