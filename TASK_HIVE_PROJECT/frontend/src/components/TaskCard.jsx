import React, { useState } from "react";

const TaskCard = ({ task, onDeleteTask, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const saveChanges = () => {
    onUpdateTask(task._id, editedTask);
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <input
            type="date"
            value={editedTask.startDate ? editedTask.startDate.split("T")[0] : ""}
            onChange={(e) => setEditedTask({ ...editedTask, startDate: e.target.value })}
          />
          <input
            type="date"
            value={editedTask.deadline ? editedTask.deadline.split("T")[0] : ""}
            onChange={(e) => setEditedTask({ ...editedTask, deadline: e.target.value })}
          />
          <select
            value={editedTask.status}
            onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <div className="task-buttons">
            <button onClick={saveChanges}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p>Start: {task.startDate ? new Date(task.startDate).toLocaleDateString() : "N/A"}</p>
          <p>Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : "N/A"}</p>
          <p>Status: {task.status}</p>
          <div className="task-buttons">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete-task" onClick={() => onDeleteTask(task._id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
