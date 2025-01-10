import React, { useState } from "react";
import InputField from "./Components/InputField";
import Button from "./Components/Button";
import Task from "./Components/Task";
import { appStyle, inputStyle } from "./Styles/style";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [page, setPage] = useState(0); // Track the current page

  const itemsPerPage = 5; // Number of tasks per page

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((_, i) => i !== index);
      const totalPages = Math.ceil(updatedTasks.length / itemsPerPage);
      if (page >= totalPages && totalPages > 0) {
        setPage(totalPages - 1); // Adjust page if necessary
      }
      return updatedTasks;
    });
  };

  // Pagination logic
  const startIndex = page * itemsPerPage;
  const currentItems = tasks.slice(startIndex, startIndex + itemsPerPage);

  const handleShowMore = () => {
    if (startIndex + itemsPerPage < tasks.length) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div style={appStyle}>
      <h3>Todo List</h3>
      <div>
        <InputField
          type="text"
          style={inputStyle}
          placeholder="Add a new task"
          handleOnChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
        <Button text="+" handleOnClick={addTask} />
      </div>
      <div style={{ gap: "1em" }}>
        {tasks.length === 0 ? (
          <p>No tasks added yet</p>
        ) : (
          currentItems.map((task, index) => (
            <Task
              key={startIndex + index}
              index={startIndex + index}
              task={task}
              completeTask={completeTask}
              removeTask={removeTask}
            />
          ))
        )}
      </div>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
        {page > 0 && (
          <button
            onClick={handlePrevious}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Previous
          </button>
        )}
        {startIndex + itemsPerPage < tasks.length && (
          <button
            onClick={handleShowMore}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#28A745",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
