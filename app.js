// app.js
const readline = require('readline');
const todo = require('./todo');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayTasks() {
  const tasks = todo.getTasks();
  console.log('Todo List:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
}

function startApp() {
  console.log('Welcome to the Todo List App!\n');

  rl.question('Enter a command (add/update/delete/display/quit): ', (command) => {
    if (command === 'add') {
      rl.question('Enter the task to add: ', (task) => {
        todo.addTask(task);
        console.log('Task added.');
        displayTasks();
        startApp();
      });
    } else if (command === 'update') {
      displayTasks();
      rl.question('Enter the task number to update: ', (index) => {
        rl.question('Enter the new task: ', (newTask) => {
          todo.updateTask(index - 1, newTask);
          console.log('Task updated.');
          displayTasks();
          startApp();
        });
      });
    } else if (command === 'delete') {
      displayTasks();
      rl.question('Enter the task number to delete: ', (index) => {
        todo.deleteTask(index - 1);
        console.log('Task deleted.');
        displayTasks();
        startApp();
      });
    } else if (command === 'display') {
      displayTasks();
      startApp();
    } else if (command === 'quit') {
      rl.close();
    } else {
      console.log('Invalid command. Please try again.');
      startApp();
    }
  });
}

startApp();
