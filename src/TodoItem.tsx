import React from "react";

// Определяем тип для элемента списка дел
// Мы экспортируем его, чтобы App.tsx мог его использовать
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Определяем типы для пропсов нашего компонента
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        opacity: todo.completed ? 0.5 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 0",
      }}
    >
      <span
        onClick={() => onToggle(todo.id)}
        style={{ cursor: "pointer", flexGrow: 1 }}
      >
        {todo.text}
      </span>
      <div>
        <button
          onClick={() => onToggle(todo.id)}
          style={{ marginRight: "5px" }}
        >
          {todo.completed ? "Отменить" : "Выполнить"}
        </button>
        <button onClick={() => onDelete(todo.id)}>Удалить</button>
      </div>
    </li>
  );
};

export default TodoItem;
