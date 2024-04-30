const getAllTasks = (req, res) => {
  console.log(tasks);
  res.json(tasks);
};

const createTask = (req, res) => {
  const task = req.body;
  tasks.push(task);
  console.log(tasks);

  res.send("task created!");
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { newTask } = req.body;

  const task = tasks.find((task) => task.id === +id);

  if (task) {
    const updateTask = { ...task, ...newTask };
    const updateList = tasks.map((task) => {
      if (task.id === id) return updateTask;
      return task;
    });
    tasks = updateList;

    return res.send("update successfully");
  }

  res.status(404).send(`task with id ${id} not found!`);
};

const deleteTask = (req, res) => {
  const { id } = req.params;

  const isExist = tasks.findIndex((task) => task.id === +id);

  if (isExist !== -1) {
    tasks.splice(isExist, 1);

    return res.send("deleted successfully");
  }

  res.status(404).send("not found task!");
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
