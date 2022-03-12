import { useState } from "react";

import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface Task {
  key: number;
  title: string;
  completed: boolean;
  date: Date;
}
export function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Criando uma nova taks
  function hadleRegisterNewTask(valueTitle: string) {
    let task: Task;

    task = {
      key: Math.random() * 1,
      title: valueTitle,
      date: new Date(),
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, task]);
  }
  // Removendo uma task
  function hadleDeleteTask(key: number) {
    const task = tasks.filter((task) => task.key !== key);
    setTasks(task);
  }
  // Mudando status da task
  function handleChangeStatus(key: number) {
    for (var i = 0; i <= tasks.length; i++) {
      if (tasks[i].key === key) {
        const tempTasks = [...tasks];

        tempTasks[i].completed = !tempTasks[i].completed;

        setTasks(tempTasks);
      }
    }
  }

  return (
    <div
      className="container"
      style={{
        margin: "2rem auto",
        padding: "4rem",
        backgroundColor: "#a5d8fa5f",
      }}
    >
      <h2 style={{ fontWeight: 700, marginBottom: "2rem" }}>TO.DO | LIST</h2>
      <div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Cadastrar tarefa"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: ".8rem" }}
          />
          <button
            type="button"
            className="btn btn-success"
            onClick={() => hadleRegisterNewTask(title)}
          >
            Cadastrar
          </button>
        </div>

        <ul className="list-group">
          {tasks.map((t) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={t.key}
              style={
                t.completed === true
                  ? {
                      textDecoration: "line-through",
                      fontStyle: "italic",
                      fontWeight: 500,
                      backgroundColor: "#198754",
                    }
                  : { textDecoration: "none", fontWeight: 500 }
              }
            >
              {t.title}
              <div className="input-group-prepend">
                <input
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  style={{}}
                  onChange={() => handleChangeStatus(t.key)}
                />
                <img
                  src="/trash.svg"
                  alt="trash"
                  onClick={() => hadleDeleteTask(t.key)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
