// todo.js

const fs = require('fs');
const tasks = require ('./tasks.json');

function addTask(task) {
  tasks.push(task);
  saveTasksToFile(); // Save tasks to the file after adding.
}

function updateTask(index, newTask) {
  if (index >= 0 && index < tasks.length) {
    tasks[index] = newTask;
    saveTasksToFile(); // Save tasks to the file after updating.
  } else {
    console.log('Invalid task index.');
  }
}

function deleteTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    saveTasksToFile(); // Save tasks to the file after deleting.
  } else {
    console.log('Invalid task index.');
  }
}

function getTasks() {
  return tasks;
}

function saveTasksToFile() {
  fs.writeFileSync('tasks.json', JSON.stringify(tasks));
}

function loadTasksFromFile() {
  try {
    const data = fs.readFileSync('tasks.json', 'utf8');
    const tasks = JSON.parse(data);
    setTasks(tasks);
  } catch (err) {
    // Handle file not found or other errors
  }
}

function setTasks(newTasks) {
  tasks.length = 0;
  tasks.push(...newTasks);
}

// Load tasks from the file when this module is imported.
loadTasksFromFile();

module.exports = {
  addTask,
  updateTask,
  deleteTask,
  getTasks,
};
