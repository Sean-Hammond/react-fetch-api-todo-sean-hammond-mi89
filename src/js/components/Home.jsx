import React, { useState, useEffect } from "react";

const url = "https://playground.4geeks.com/todo";

const createUser = () => {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      body: JSON.stringify({
        name: "sean-hammond",
        id: 0,
      }),
    },
  };
  fetch(url + "/users/sean-hammond", options)
    .then((r) => r.json())
    .then((d) => console.log("created user data:", d));
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

const getAllUsers = () => {
  fetch(url + "/users") // URL for get/post/etc. request goes here
    // Initial response to the fetch. If it goes good, it goes to the next .then. NOTE: You can leave this blank for GET requests.
    .then(
      // The response goes here
      (resp) => {
        // console.log("get all users - response:", resp.json());
        return resp.json();
      },
    )
    // Final result of the request
    .then((data) => {
      console.log("Get all users - data:", resp);
    });
};

// let copyOfTasksInAPI = [{ label: "", is_done: false, id: 999 }];

const Home = () => {
  // New task is empty string until user types and submits it to the tasks array
  const [newTask, setNewTask] = useState("");

  const [tasks, setTasks] = useState(["Example task"]);

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

  // Delete a specific task
  const deleteTask = (taskToDelete) => {
    const filteredTasks = tasks.filter((taskData) => taskData != taskToDelete);
    setTasks(filteredTasks);
  };

  // User can input text in a field and click button or press enter to add typed task to tasks array
  return (
    <div className="container">
      <h1>Today's Task List</h1>
      <p>
        Click "Save task" to save your tasks even after the page is reloaded or
        closed. TASK LIST MAY RESET OVERNIGHT. The list should support up to{" "}
        {maxIdNumberOfTasks} tasks.
      </p>
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
        {
          // Print each task as a li
          tasks.map((item, index) => {
            return (
              <li key={index + "task"}>
                {item.label}
                <button
                  onClick={() => {
                    // Delete a selected task
                    deleteTask(item);
                    deleteTaskWithAPI(item.id);
                  }}
                >
                  X
                </button>
              </li>
            );
          })
        }
        {
          // Message if there are no tasks
          tasks.length == 0 && <li className="text-success">All clear!</li>
        }
        {
          // Button to clear all tasks appears unless there are no tasks
          tasks.length > 0 && (
            <button
              onClick={() => {
                // Delete all tasks by clearing tasks array
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
          <strong>Created by Sean Hammond</strong>
        </p>
        <p>Mentors: Alex Ayala and Thomas Brito</p>
        <p>
          This and many other projects are built by students as part of the
          4Geeks Academy Coding Bootcamp by Alejandro Sanchez and many other
          contributors.
        </p>
      </footer>
    </div>
  );
};

export default Home;

// Integrity statement: I added my own comments/code and did not rely on copy-and-paste from a.i.
