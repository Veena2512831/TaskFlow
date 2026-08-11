import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// GET - only logged-in user's tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.userId,
    }).sort({ date: 1, time: 1 });

    res.json(tasks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

// POST - add task for logged-in user
router.post("/", async (req, res) => {
  try {
    const { title, date, time } = req.body;

    if (!title || !date || !time) {
      return res.status(400).json({
        message: "Title, date and time are required",
      });
    }

    const task = await Task.create({
      title,
      date,
      time,
      completed: false,
      userId: req.user.userId,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add task",
    });
  }
});

// PUT - update only logged-in user's task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

// DELETE - delete only logged-in user's task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

export default router;