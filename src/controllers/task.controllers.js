const Task = require("../models/task.model");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Error Server." });
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = req.body;
    console.log(newTask);
    const task = await Task.create(newTask);
    res.status(201).json({ ok: true, task });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Error Server." });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const newTask = req.body;

    const existTask = await Task.findOne({ _id });
    if (!existTask) {
      return res.status(404).json({ ok: false, message: "not found!" });
    }

    await Task.findOneAndUpdate({ _id }, newTask);
    res.status(200).json({ ok: true, message: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error Server." });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const existTask = await Task.findOne({ _id });
    if (!existTask) {
      return res.status(404).json({ ok: false, message: "not found!" });
    }

    await Task.deleteOne({ _id });
    res.status(200).json({ ok: true, message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error Server." });
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
