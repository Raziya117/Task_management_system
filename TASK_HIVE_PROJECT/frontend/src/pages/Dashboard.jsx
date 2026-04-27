import React, { useEffect, useState } from "react";
import axios from "axios";
import Board from "../components/Board";

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [tasks, setTasks] = useState({});
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    board: "",
    startDate: "",
    deadline: ""
  });

  const [API_URL] = useState("http://localhost:5000/api"); // backend URL

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const res = await axios.get(`${API_URL}/boards`);
      setBoards(res.data);

      const tasksObj = {};
      for (let board of res.data) {
        const taskRes = await axios.get(`${API_URL}/tasks/${board._id}`);
        tasksObj[board._id] = taskRes.data;
      }
      setTasks(tasksObj);
    } catch (err) {
      console.error(err);
    }
  };

  // Add new board
  const addBoard = async () => {
    if (!newBoardTitle) return;
    await axios.post(`${API_URL}/boards`, { title: newBoardTitle });
    setNewBoardTitle("");
    fetchBoards();
  };

  // Delete board
  const deleteBoard = async (boardId) => {
    if (window.confirm("Delete this board?")) {
      await axios.delete(`${API_URL}/boards/${boardId}`);
      fetchBoards();
    }
  };

  // Add new task
  const addTask = async () => {
    if (!newTask.title || !newTask.board) return;
    await axios.post(`${API_URL}/tasks`, newTask);
    setNewTask({ title: "", board: "", startDate: "", deadline: "" }); // reset including startDate
    fetchBoards();
  };

  // Delete task
  const deleteTask = async (taskId) => {
    if (window.confirm("Delete this task?")) {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      fetchBoards();
    }
  };

  // Update task
  const updateTask = async (taskId, updatedTask) => {
    await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask);
    fetchBoards();
  };

  return (
    <div className="dashboard">
      <h1 >TaskHive Dashboard</h1>

      <div className="top-section">
        {/* Add Board */}
        <div className="create-board">
          <input
            type="text"
            placeholder="New Board Title"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
          />
          <button onClick={addBoard}>Add Board</button>
        </div>

        {/* Add Task */}
        <div className="create-task">
          <select
            value={newTask.board}
            onChange={(e) => setNewTask({ ...newTask, board: e.target.value })}
          >
            <option value="">Select Board</option>
            {boards.map((b) => (
              <option key={b._id} value={b._id}>
                {b.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />

          {/* Start Date */}
          <input
            type="date"
            value={newTask.startDate}
            onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
          />

          {/* Deadline */}
          <input
            type="date"
            value={newTask.deadline}
            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
          />

          <button onClick={addTask}>Add Task</button>
        </div>
      </div>

      {/* Boards */}
      <div className="boards-container">
        {boards.map((board) => (
          <Board
            key={board._id}
            board={board}
            tasks={tasks[board._id] || []}
            onDeleteTask={deleteTask}
            onUpdateTask={updateTask}
            onDeleteBoard={deleteBoard}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
