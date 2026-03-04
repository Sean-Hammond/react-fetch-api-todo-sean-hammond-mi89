import React, { useState, useEffect } from "react";

const url = "https://playground.4geeks.com/todo";

const createUser = async () => {
  const response = await fetch(url + "/users/sean-hammond", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "sean-hammond",
      id: 0,
    }),
  });
  if (!response.ok) {
    console.log(
      "Creating user - response is not ok:",
      response.status,
      response.statusText,
    );
    return;
  }
  const data = await response.json();
  return data;
};

const deleteTaskWithAPI = (taskId) => {
  const options = {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  };
  fetch(url + "/todos/" + taskId, options)
    .then((response) => response.json())
    .then((data) => console.log("Deleted tasks: ", data));
};

const maxIdNumberOfTasks = 200;

const deleteAllTasksWithAPI = () => {
  for (let i = 0; i < maxIdNumberOfTasks; i++) {
    const options = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    };
    fetch(url + "/todos/" + i, options)
      .then((response) => response.json())
      .then((data) => console.log("Deleted tasks: ", data));
  }
};

const Home = () => {
  // New task is empty string until user types and submits it to the tasks array
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(["Example task"]);
  const [user, setUser] = useState({ name: "Sean", username: "sean-hammond" });

  // Adds the user's typed task to the array of tasks
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
    }
    setNewTask("");
  }

  const getTasks = async () => {
    const response = await fetch(url + "/users/sean-hammond");
    if (!response.ok) {
      console.log("Repsonse is not ok", response.status, response.statusText);
      return;
    }
    const data = await response.json();
    console.log(data.todos);
    setTasks(data.todos);
    return;
  };

  const addTaskWithAPI = async (label) => {
    if (newTask.trim() == "") {
      return;
    }
    const response = await fetch(url + "/todos/sean-hammond", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: label,
        is_done: false,
      }),
    });
    if (!response.ok) {
      console.log("Response is not ok", response.status, response.statusText);
      return;
    }
    const data = await response.json();
    getTasks();
    return data;
  };

  useEffect(
    // Whatever is in the arrow function is what going to happen when the page loads.
    () => {
      createUser();
      getTasks();
    },
    [],
  );

  function whenSaveBtnClicked() {
    addTask();
    addTaskWithAPI(newTask);
  }

  const deleteTask = (taskToDelete) => {
    const filteredTasks = tasks.filter((taskData) => taskData != taskToDelete);
    setTasks(filteredTasks);
  };

  return (
    <div className="container">
      <h1>Today's Task List</h1>
      <p>
        Click "Save task" to save your tasks even after the page is reloaded or
        closed. TASK LIST MAY RESET OVERNIGHT. The list should support up to{" "}
        {maxIdNumberOfTasks} tasks.
      </p>
      <label for="select-user">Change user:</label>
      <select name="users" id="select-user">
        <option value={user.username}>{user.name}</option>
        <option value="random-user-123">User123</option>
      </select>
      <br />
      <input
        value={newTask}
        type="text"
        placeholder="Type new task here"
        onChange={
          // Whatever is typed becomes newTask
          (event) => {
            const typedTask = event.target.value;
            setNewTask(typedTask);
          }
        }
        onKeyDown={(event) => {
          if (event.key == "Enter") {
            addTask();
            addTaskWithAPI(newTask);
          }
        }}
      />
      <button onClick={() => whenSaveBtnClicked()}>Save task</button>
      <ul>
        {tasks.map((item, index) => {
          return (
            <li key={item.id}>
              {item.label}
              <button
                onClick={() => {
                  deleteTask(item);
                  deleteTaskWithAPI(item.id);
                }}
              >
                X
              </button>
            </li>
          );
        })}
        {
          // Message if there are no tasks
          tasks.length == 0 && <li className="text-success">All clear!</li>
        }
        {
          // Button to clear all tasks appears unless there are no tasks
          tasks.length > 0 && (
            <button
              onClick={() => {
                setTasks([]);
                deleteAllTasksWithAPI();
              }}
            >
              Clear {tasks.length} task{tasks.length > 1 && "s"}
            </button>
          )
        }
      </ul>
      <footer>
        <p>
          <strong>Created by Sean Hammond</strong> |{" "}
          <a href="https://github.com/Sean-Hammond">GitHub</a>
        </p>
        <p>
          Mentors: Ryan Castanier, Alex Ayala-Palacin, Thomas Brito-Bronfield
        </p>
        <p>
          This application's code uses a template and API created by Alejandro
          Sanchez and 4Geeks Academy
        </p>
      </footer>
    </div>
  );
};

export default Home;

// Integrity statement: I added my own comments/code and did not rely on copy-and-paste from a.i.
