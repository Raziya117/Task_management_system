import React from "react";
import TaskCard from "./TaskCard";

const Board = ({ board, tasks, onDeleteTask, onUpdateTask, onDeleteBoard }) => {
  return (
    <div className="board">
      <div className="board-header">
        <h3>{board.title}</h3>
        <button className="delete-board" onClick={() => onDeleteBoard(board._id)}>
          Delete Board
        </button>
      </div>

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
