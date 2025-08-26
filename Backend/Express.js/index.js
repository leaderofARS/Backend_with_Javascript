const express = require("express");
const fs = require("fs"); // for reading/writing local file
const app = express();
const PORT = 3000;

// Middleware: Parse JSON body
app.use(express.json());

// Load tasks (simulate DB with local file)
const loadTasks = () => {
  try {
    const data = fs.readFileSync("tasks.json");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

// Save tasks back to file
const saveTasks = (tasks) => {
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
};

// Routes

// Home
app.get("/", (req, res) => {
  res.send("🚀 Task Manager API is running!");
});

// GET all tasks
app.get("/tasks", (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});

// GET one task by id
app.get("/tasks/:id", (req, res) => {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
});

// POST create a task
app.post("/tasks", (req, res) => {
  const tasks = loadTasks();
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

// PUT update a task
app.put("/tasks/:id", (req, res) => {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: req.body.title || tasks[taskIndex].title,
    completed:
      req.body.completed !== undefined
        ? req.body.completed
        : tasks[taskIndex].completed,
  };
  saveTasks(tasks);
  res.json(tasks[taskIndex]);
});

// DELETE a task
app.delete("/tasks/:id", (req, res) => {
  let tasks = loadTasks();
  const newTasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  if (tasks.length === newTasks.length) {
    return res.status(404).json({ message: "Task not found" });
  }
  saveTasks(newTasks);
  res.json({ message: "Task deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
